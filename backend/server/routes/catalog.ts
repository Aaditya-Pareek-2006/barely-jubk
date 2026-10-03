import { Router } from 'express';
import { pool } from '../db/pool.js';

export const catalogRouter = Router();
const productFields = `id,slug,name,category,category_name AS "categoryName",short_description AS "shortDescription",description,price,compare_at_price AS "compareAtPrice",discount,rating,review_count AS "reviewCount",images,weight,ingredients,nutrition,allergens,stock,tags,bestseller,"new_arrival" AS "newArrival",featured,flavor,badge,spiciness_level AS "spicinessLevel"`;

catalogRouter.get('/categories', async (_req,res,next) => {
  try { const { rows } = await pool.query('SELECT id,slug,name,tagline,description,image,item_count AS "itemCount",bg_accent AS "bgAccent" FROM categories ORDER BY name'); res.json(rows); } catch(err) { next(err); }
});

catalogRouter.get('/products', async (req,res,next) => {
  try {
    const q = String(req.query.q || '').trim();
    const category = req.query.category && req.query.category !== 'all' ? String(req.query.category) : null;
    const min = req.query.minPrice ? Number(req.query.minPrice) : null;
    const max = req.query.maxPrice ? Number(req.query.maxPrice) : null;
    const inStock = req.query.inStock === 'true';
    const sortMap: Record<string,string> = { featured:'featured DESC,review_count DESC', newest:'new_arrival DESC,created_at DESC', 'price-asc':'price ASC', 'price-desc':'price DESC', rating:'rating DESC', popular:'review_count DESC' };
    const sort = sortMap[String(req.query.sort || 'featured')] || sortMap.featured;
    const { rows } = await pool.query(`SELECT ${productFields} FROM products WHERE ($1::text IS NULL OR category=$1) AND ($2::text='' OR name ILIKE '%'||$2||'%' OR flavor ILIKE '%'||$2||'%' OR category_name ILIKE '%'||$2||'%' OR short_description ILIKE '%'||$2||'%' OR tags::text ILIKE '%'||$2||'%') AND ($3::int IS NULL OR price >= $3) AND ($4::int IS NULL OR price <= $4) AND (NOT $5 OR stock > 0) ORDER BY ${sort} LIMIT 100`, [category,q,min,max,inStock]);
    res.json(rows);
  } catch(err) { next(err); }
});

catalogRouter.get('/products/:slug', async (req,res,next) => {
  try { const { rows } = await pool.query(`SELECT ${productFields} FROM products WHERE slug=$1 OR id=$1`, [req.params.slug]); if (!rows[0]) return res.status(404).json({error:'Product not found.'}); res.json(rows[0]); } catch(err) { next(err); }
});

