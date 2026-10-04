import { Router } from 'express';
import { createHmac, timingSafeEqual } from 'node:crypto';
import Razorpay from 'razorpay';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

export const ordersRouter = Router();
const addressSchema = z.object({ fullName:z.string().min(2).max(100),email:z.string().email(),phone:z.string().min(8).max(30),street:z.string().min(3).max(200),city:z.string().min(2).max(100),state:z.string().min(2).max(100),pincode:z.string().min(4).max(12),landmark:z.string().max(200).optional() });
const createSchema = z.object({ items:z.array(z.object({ productId:z.string().min(1),quantity:z.number().int().min(1).max(50) })).min(1).max(50),shippingAddress:addressSchema,paymentMethod:z.enum(['UPI','Card','NetBanking','Cash on Delivery','Mock UPI (Test)']),deliveryMethod:z.enum(['express','standard']),couponCode:z.string().max(30).optional() });
const razorpay = () => {
  if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) throw new Error('Razorpay is not configured.');
  return new Razorpay({ key_id:process.env.RAZORPAY_KEY_ID,key_secret:process.env.RAZORPAY_KEY_SECRET });
};
const toOrder = (row:any) => ({ id:row.display_id,createdAt:row.created_at,items:row.items,subtotal:row.subtotal,discount:row.discount,shippingFee:row.shipping_fee,total:row.total,status:row.status,paymentMethod:row.payment_method,paymentStatus:row.payment_status,shippingAddress:row.shipping_address,estimatedDelivery:row.delivery_method==='express'?'1–2 Business Days':'3–5 Business Days',trackingNumber:'',timeline:[{status:row.status,date:new Date(row.created_at).toLocaleString(),completed:true,notes:'Order received.'}] });

ordersRouter.use(requireAuth);
ordersRouter.get('/', async (req,res,next) => {
  try { const { rows }=await pool.query('SELECT * FROM orders WHERE user_id=$1 ORDER BY created_at DESC LIMIT 100',[req.auth!.id]);res.json(rows.map(toOrder)); } catch(err){next(err);}
});
ordersRouter.get('/:id', async (req,res,next) => {
  try { const { rows }=await pool.query('SELECT * FROM orders WHERE user_id=$1 AND (id::text=$2 OR display_id=$2)',[req.auth!.id,req.params.id]);if(!rows[0])return res.status(404).json({error:'Order not found.'});res.json(toOrder(rows[0])); } catch(err){next(err);}
});

ordersRouter.post('/', async (req,res,next) => {
  const client=await pool.connect();
  try {
    const body=createSchema.parse(req.body);
    await client.query('BEGIN');
    const products=[];
    for(const item of body.items){
      const {rows}=await client.query('SELECT id,slug,name,price,weight,images,stock,category,category_name AS "categoryName" FROM products WHERE id=$1 FOR UPDATE',[item.productId]);
      if(!rows[0]){await client.query('ROLLBACK');return res.status(400).json({error:'A product in your cart is no longer available.'});}
      if(rows[0].stock<item.quantity){await client.query('ROLLBACK');return res.status(409).json({error:`${rows[0].name} does not have enough stock.`});}
      products.push({...rows[0],quantity:item.quantity});
    }
    const subtotal=products.reduce((sum,p)=>sum+p.price*p.quantity,0);
    let discount=0;
    const coupon=(body.couponCode||'').toUpperCase();
    if(coupon==='TRASH10') discount=Math.round(subtotal*.1);
    if(coupon==='JUNKIE20'&&subtotal>=999) discount=Math.round(subtotal*.2);
    if(coupon&&!['TRASH10','JUNKIE20','FREESHIP'].includes(coupon)) { await client.query('ROLLBACK');return res.status(400).json({error:'Invalid coupon.'}); }
    if(coupon==='JUNKIE20'&&subtotal<999){await client.query('ROLLBACK');return res.status(400).json({error:'Coupon requires an order of ₹999 or more.'});}
    const shippingFee=body.deliveryMethod==='express'&&coupon!=='FREESHIP'?49:0;
    const tax=Math.round((subtotal-discount)*.05);
    const total=Math.max(0,subtotal-discount+shippingFee+tax);
    const displayId=`BJ-${new Date().getFullYear()}-${Date.now().toString().slice(-8)}`;
    const itemSnapshots=products.map(p=>({id:`${p.id}-${p.weight}`,quantity:p.quantity,selectedWeight:p.weight,product:{id:p.id,slug:p.slug,name:p.name,price:p.price,weight:p.weight,images:p.images,category:p.category,categoryName:p.categoryName}}));
    const pending=body.paymentMethod!=='Cash on Delivery';
    const orderResult=await client.query(`INSERT INTO orders(display_id,user_id,payment_method,delivery_method,payment_status,subtotal,discount,shipping_fee,total,shipping_address,items)
      VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) RETURNING *`,[displayId,req.auth!.id,body.paymentMethod,body.deliveryMethod,'Pending',subtotal,discount,shippingFee,total,body.shippingAddress,JSON.stringify(itemSnapshots)]);
    for(const p of products) await client.query('UPDATE products SET stock=stock-$2 WHERE id=$1',[p.id,p.quantity]);
    if(pending){
      await client.query('COMMIT');
      if(body.paymentMethod==='Mock UPI (Test)')return res.status(201).json({order:toOrder(orderResult.rows[0]),payment:null});
      let rpOrder;
      try{rpOrder=await razorpay().orders.create({amount:total*100,currency:'INR',receipt:displayId,notes:{displayId,userId:req.auth!.id}});}
      catch(error){
        await client.query('BEGIN');
        for(const p of products)await client.query('UPDATE products SET stock=stock+$2 WHERE id=$1',[p.id,p.quantity]);
        await client.query("UPDATE orders SET status='CANCELLED',payment_status='Failed' WHERE id=$1",[orderResult.rows[0].id]);
        await client.query('COMMIT');throw error;
      }
      const updated=await client.query('UPDATE orders SET razorpay_order_id=$2 WHERE id=$1 RETURNING *',[orderResult.rows[0].id,rpOrder.id]);
      return res.status(201).json({order:toOrder(updated.rows[0]),payment:{keyId:process.env.RAZORPAY_KEY_ID,orderId:rpOrder.id,amount:rpOrder.amount,currency:rpOrder.currency}});
    }
    await client.query('COMMIT');
    res.status(201).json({order:toOrder(orderResult.rows[0]),payment:null});
  } catch(err){await client.query('ROLLBACK').catch(()=>{});next(err);} finally{client.release();}
});

ordersRouter.post('/:id/mock-payment',async(req,res,next)=>{
  if(process.env.NODE_ENV==='production')return res.status(404).json({error:'Mock payments are disabled.'});
  const outcomeSchema=z.object({outcome:z.enum(['success','failure'])});
  const client=await pool.connect();
  try{
    const {outcome}=outcomeSchema.parse(req.body);
    await client.query('BEGIN');
    const {rows}=await client.query('SELECT * FROM orders WHERE user_id=$1 AND display_id=$2 FOR UPDATE',[req.auth!.id,req.params.id]);
    const order=rows[0];
    if(!order){await client.query('ROLLBACK');return res.status(404).json({error:'Order not found.'});}
    if(order.payment_method!=='Mock UPI (Test)'){await client.query('ROLLBACK');return res.status(400).json({error:'This order is not a mock UPI payment.'});}
    if(order.payment_status!=='Pending'){await client.query('ROLLBACK');return res.status(409).json({error:'This mock payment has already been completed.'});}
    if(outcome==='success'){
      const updated=await client.query("UPDATE orders SET payment_status='Paid' WHERE id=$1 RETURNING *",[order.id]);
      await client.query('COMMIT');
      return res.json({order:toOrder(updated.rows[0])});
    }
    for(const item of order.items){
      const productId=item.product?.id;
      if(productId)await client.query('UPDATE products SET stock=stock+$2 WHERE id=$1',[productId,item.quantity]);
    }
    const updated=await client.query("UPDATE orders SET payment_status='Failed',status='CANCELLED' WHERE id=$1 RETURNING *",[order.id]);
    await client.query('COMMIT');
    res.json({order:toOrder(updated.rows[0])});
  }catch(err){await client.query('ROLLBACK').catch(()=>{});next(err);}finally{client.release();}
});

ordersRouter.post('/:id/verify-payment',async(req,res,next)=>{
  try{
    const body=z.object({razorpay_order_id:z.string(),razorpay_payment_id:z.string(),razorpay_signature:z.string()}).parse(req.body);
    const {rows}=await pool.query('SELECT * FROM orders WHERE user_id=$1 AND display_id=$2',[req.auth!.id,req.params.id]);
    if(!rows[0]||rows[0].razorpay_order_id!==body.razorpay_order_id)return res.status(404).json({error:'Payment order not found.'});
    const expected=createHmac('sha256',process.env.RAZORPAY_KEY_SECRET!).update(`${body.razorpay_order_id}|${body.razorpay_payment_id}`).digest();
    const received=Buffer.from(body.razorpay_signature,'hex');
    if(received.length!==expected.length||!timingSafeEqual(received,expected))return res.status(400).json({error:'Payment signature is invalid.'});
    const updated=await pool.query("UPDATE orders SET payment_status='Paid' WHERE id=$1 AND payment_status='Pending' RETURNING *",[rows[0].id]);
    res.json({order:toOrder(updated.rows[0]||rows[0])});
  }catch(err){next(err);}
});

export async function razorpayWebhook(rawBody:Buffer,signature:string|undefined,eventId:string|undefined,eventType:string|undefined){
  if(!process.env.RAZORPAY_WEBHOOK_SECRET||!signature||!eventId)throw new Error('Invalid webhook configuration or headers.');
  const expected=createHmac('sha256',process.env.RAZORPAY_WEBHOOK_SECRET).update(rawBody).digest();
  const received=Buffer.from(signature,'hex');
  if(received.length!==expected.length||!timingSafeEqual(received,expected))throw new Error('Invalid webhook signature.');
  const event=JSON.parse(rawBody.toString('utf8'));
  const payment=event.payload?.payment?.entity;
  const rOrder=event.payload?.order?.entity?.id||payment?.order_id;
  const client=await pool.connect();
  try{
    await client.query('BEGIN');
    const inserted=await client.query('INSERT INTO payment_events(event_id,event_type) VALUES($1,$2) ON CONFLICT DO NOTHING RETURNING event_id',[eventId,eventType||'unknown']);
    if(!inserted.rowCount){await client.query('COMMIT');return;}
    if(rOrder&&(eventType==='payment.captured'||eventType==='order.paid')) await client.query("UPDATE orders SET payment_status='Paid' WHERE razorpay_order_id=$1",[rOrder]);
    if(rOrder&&eventType==='payment.failed') await client.query("UPDATE orders SET payment_status='Failed' WHERE razorpay_order_id=$1 AND payment_status='Pending'",[rOrder]);
    await client.query('COMMIT');
  }catch(e){await client.query('ROLLBACK');throw e;}finally{client.release();}
}

