import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const adminRouter=Router();
adminRouter.use(requireAuth,requireAdmin);
const productFields='id,slug,name,category,category_name AS "categoryName",short_description AS "shortDescription",description,price,compare_at_price AS "compareAtPrice",discount,rating,review_count AS "reviewCount",images,weight,ingredients,nutrition,allergens,stock,tags,bestseller,new_arrival AS "newArrival",featured,flavor,badge,spiciness_level AS "spicinessLevel"';
const productInput=z.object({slug:z.string().trim().toLowerCase().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(120),name:z.string().trim().min(2).max(160),category:z.string().min(1).max(80),shortDescription:z.string().trim().min(2).max(300),description:z.string().trim().min(2).max(3000),price:z.number().int().min(0).max(1_000_000),compareAtPrice:z.number().int().min(0).max(1_000_000).nullable().optional(),images:z.array(z.string().min(1).max(1000)).min(1).max(8),weight:z.string().trim().min(1).max(40),stock:z.number().int().min(0).max(1_000_000),flavor:z.string().max(100).default(''),badge:z.string().max(60).nullable().optional(),tags:z.array(z.string().max(60)).default([])});
adminRouter.get('/products',async(_req,res,next)=>{try{const {rows}=await pool.query(`SELECT ${productFields} FROM products ORDER BY name`);res.json(rows);}catch(e){next(e);}});
adminRouter.post('/products',async(req,res,next)=>{try{
  const p=productInput.parse(req.body);
  const category=await pool.query('SELECT name FROM categories WHERE slug=$1',[p.category]);
  if(!category.rowCount)return res.status(400).json({error:'Select a valid category.'});
  const id=`prod-${p.slug}`;
  const {rows}=await pool.query(`INSERT INTO products(id,slug,name,category,category_name,short_description,description,price,compare_at_price,images,weight,stock,flavor,badge,tags,ingredients,nutrition,allergens)
    VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,'[]','{}','[]') RETURNING ${productFields}`,
    [id,p.slug,p.name,p.category,category.rows[0].name,p.shortDescription,p.description,p.price,p.compareAtPrice??null,JSON.stringify(p.images),p.weight,p.stock,p.flavor,p.badge??null,JSON.stringify(p.tags)]);
  res.status(201).json(rows[0]);
}catch(e){if((e as {code?:string}).code==='23505')return res.status(409).json({error:'A product with that slug or ID already exists.'});next(e);}});
adminRouter.patch('/products/:id',async(req,res,next)=>{try{
  const p=productInput.parse(req.body);
  const category=await pool.query('SELECT name FROM categories WHERE slug=$1',[p.category]);
  if(!category.rowCount)return res.status(400).json({error:'Select a valid category.'});
  const {rows}=await pool.query(`UPDATE products SET slug=$2,name=$3,category=$4,category_name=$5,short_description=$6,description=$7,price=$8,compare_at_price=$9,images=$10,weight=$11,stock=$12,flavor=$13,badge=$14,tags=$15 WHERE id=$1 RETURNING ${productFields}`,
    [req.params.id,p.slug,p.name,p.category,category.rows[0].name,p.shortDescription,p.description,p.price,p.compareAtPrice??null,JSON.stringify(p.images),p.weight,p.stock,p.flavor,p.badge??null,JSON.stringify(p.tags)]);
  if(!rows[0])return res.status(404).json({error:'Product not found.'});
  res.json(rows[0]);
}catch(e){if((e as {code?:string}).code==='23505')return res.status(409).json({error:'A product with that slug or ID already exists.'});next(e);}});
adminRouter.delete('/products/:id',async(req,res,next)=>{try{const {rows}=await pool.query('DELETE FROM products WHERE id=$1 RETURNING id',[req.params.id]);if(!rows[0])return res.status(404).json({error:'Product not found.'});res.sendStatus(204);}catch(e){next(e);}});
adminRouter.patch('/products/:id/stock',async(req,res,next)=>{try{const {stock}=z.object({stock:z.number().int().min(0).max(1_000_000)}).parse(req.body);const {rows}=await pool.query('UPDATE products SET stock=$2 WHERE id=$1 RETURNING id,slug,name,stock',[req.params.id,stock]);if(!rows[0])return res.status(404).json({error:'Product not found.'});res.json(rows[0]);}catch(e){next(e);}});
adminRouter.get('/customers',async(_req,res,next)=>{try{const {rows}=await pool.query(`SELECT u.id,u.name,u.email,u.phone,u.created_at AS "joinedAt",COUNT(o.id)::int AS "ordersCount",COALESCE(SUM(o.total) FILTER(WHERE (o.payment_status='Paid' OR o.payment_method='Cash on Delivery') AND o.status<>'CANCELLED'),0)::int AS "totalSpent" FROM users u LEFT JOIN orders o ON o.user_id=u.id WHERE u.role='customer' GROUP BY u.id ORDER BY u.created_at DESC LIMIT 500`);res.json(rows);}catch(e){next(e);}});
adminRouter.get('/users',async(_req,res,next)=>{try{const {rows}=await pool.query(`SELECT id,name,email,role,created_at AS "createdAt" FROM users ORDER BY role DESC,created_at ASC`);res.json(rows);}catch(e){next(e);}});
adminRouter.patch('/users/:id/role',async(req,res,next)=>{
  const client=await pool.connect();
  try{
    const {role}=z.object({role:z.enum(['admin','customer'])}).parse(req.body);
    if(req.params.id===req.auth!.id&&role!=='admin')return res.status(400).json({error:'You cannot remove your own administrator access here.'});
    await client.query('BEGIN');
    await client.query('SELECT pg_advisory_xact_lock(74120817)');
    const target=await client.query('SELECT id,role FROM users WHERE id=$1 FOR UPDATE',[req.params.id]);
    if(!target.rowCount){await client.query('ROLLBACK');return res.status(404).json({error:'User not found.'});}
    if(target.rows[0].role==='admin'&&role==='customer'){
      const count=await client.query("SELECT COUNT(*)::int AS count FROM users WHERE role='admin'");
      if(count.rows[0].count<=1){await client.query('ROLLBACK');return res.status(409).json({error:'At least one administrator account must remain.'});}
    }
    const {rows}=await client.query('UPDATE users SET role=$2 WHERE id=$1 RETURNING id,name,email,role,created_at AS "createdAt"',[req.params.id,role]);
    await client.query('COMMIT');
    res.json(rows[0]);
  }catch(e){await client.query('ROLLBACK').catch(()=>{});next(e);}finally{client.release();}
});
adminRouter.get('/summary',async(_req,res,next)=>{try{
  const [metrics,revenue,recentOrders,products]=await Promise.all([
    pool.query(`SELECT COALESCE(SUM(total) FILTER(WHERE (payment_status='Paid' OR payment_method='Cash on Delivery') AND status<>'CANCELLED'),0)::int AS revenue,COUNT(*)::int AS "orderCount",(SELECT COUNT(*)::int FROM users WHERE role='customer') AS "customerCount",(SELECT COUNT(*)::int FROM products WHERE stock<25) AS "lowStockCount" FROM orders WHERE created_at>=now()-interval '30 days'`),
    pool.query(`SELECT to_char(days.day,'Dy') AS day,COALESCE(SUM(o.total) FILTER(WHERE (o.payment_status='Paid' OR o.payment_method='Cash on Delivery') AND o.status<>'CANCELLED'),0)::int AS revenue FROM generate_series(current_date-6,current_date,interval '1 day') days(day) LEFT JOIN orders o ON o.created_at>=days.day AND o.created_at<days.day+interval '1 day' GROUP BY days.day ORDER BY days.day`),
    pool.query(`SELECT display_id AS id,status,payment_status AS "paymentStatus",payment_method AS "paymentMethod",total,shipping_address AS "shippingAddress",items,created_at AS "createdAt" FROM orders ORDER BY created_at DESC LIMIT 8`),
    pool.query(`SELECT id,name,stock FROM products WHERE stock<25 ORDER BY stock ASC LIMIT 5`)
  ]);
  res.json({metrics:metrics.rows[0],revenue:revenue.rows,recentOrders:recentOrders.rows,lowStockProducts:products.rows});
}catch(e){next(e);}});

