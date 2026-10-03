import { Router } from 'express';
import { z } from 'zod';
import { pool } from '../db/pool.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';

export const adminRouter=Router();
adminRouter.use(requireAuth,requireAdmin);
adminRouter.get('/products',async(_req,res,next)=>{try{const {rows}=await pool.query('SELECT id,slug,name,category,price,stock,featured,bestseller,new_arrival AS "newArrival" FROM products ORDER BY name');res.json(rows);}catch(e){next(e);}});
adminRouter.patch('/products/:id/stock',async(req,res,next)=>{try{const {stock}=z.object({stock:z.number().int().min(0).max(1_000_000)}).parse(req.body);const {rows}=await pool.query('UPDATE products SET stock=$2 WHERE id=$1 RETURNING id,slug,name,stock',[req.params.id,stock]);if(!rows[0])return res.status(404).json({error:'Product not found.'});res.json(rows[0]);}catch(e){next(e);}});

