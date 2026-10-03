import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const ordersAdminRouter=Router();
ordersAdminRouter.use(requireAuth,requireAdmin);

ordersAdminRouter.get('/',async(_req,res,next)=>{
  try{
    const {rows}=await pool.query('SELECT display_id AS id,user_id AS "userId",status,payment_status AS "paymentStatus",payment_method AS "paymentMethod",delivery_method AS "deliveryMethod",subtotal,discount,shipping_fee AS "shippingFee",total,shipping_address AS "shippingAddress",items,created_at AS "createdAt" FROM orders ORDER BY created_at DESC LIMIT 500');
    res.json(rows);
  }catch(error){next(error);}
});

ordersAdminRouter.patch('/:id/status',async(req,res,next)=>{
  try{
    const {status}=z.object({status:z.enum(['ORDER PLACED','PACKED','SHIPPED','OUT FOR DELIVERY','DELIVERED','CANCELLED'])}).parse(req.body);
    const {rows}=await pool.query('UPDATE orders SET status=$2 WHERE display_id=$1 RETURNING display_id AS id,status,payment_status AS "paymentStatus"',[req.params.id,status]);
    if(!rows[0])return res.status(404).json({error:'Order not found.'});
    res.json(rows[0]);
  }catch(error){next(error);}
});
