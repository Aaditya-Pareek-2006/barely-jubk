import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { pool } from './pool.js';

const PRODUCTS=JSON.parse(await readFile(fileURLToPath(new URL('./products.seed.json',import.meta.url)),'utf8'));
const CATEGORIES=JSON.parse(await readFile(fileURLToPath(new URL('./categories.seed.json',import.meta.url)),'utf8'));

try {
  for (const c of CATEGORIES) await pool.query(
    `INSERT INTO categories(id,slug,name,tagline,description,image,item_count,bg_accent)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT(id) DO UPDATE SET slug=EXCLUDED.slug,name=EXCLUDED.name,
     tagline=EXCLUDED.tagline,description=EXCLUDED.description,image=EXCLUDED.image,item_count=EXCLUDED.item_count,bg_accent=EXCLUDED.bg_accent`,
    [c.id,c.slug,c.name,c.tagline,c.description,c.image,c.itemCount,c.bgAccent],
  );
  for (const p of PRODUCTS) await pool.query(
    `INSERT INTO products(id,slug,name,category,category_name,short_description,description,price,compare_at_price,discount,rating,review_count,images,weight,ingredients,nutrition,allergens,stock,tags,bestseller,new_arrival,featured,flavor,badge,spiciness_level)
     VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)
     ON CONFLICT(id) DO UPDATE SET slug=EXCLUDED.slug,name=EXCLUDED.name,category=EXCLUDED.category,category_name=EXCLUDED.category_name,
     short_description=EXCLUDED.short_description,description=EXCLUDED.description,price=EXCLUDED.price,compare_at_price=EXCLUDED.compare_at_price,
     discount=EXCLUDED.discount,rating=EXCLUDED.rating,review_count=EXCLUDED.review_count,images=EXCLUDED.images,weight=EXCLUDED.weight,
     ingredients=EXCLUDED.ingredients,nutrition=EXCLUDED.nutrition,allergens=EXCLUDED.allergens,stock=EXCLUDED.stock,tags=EXCLUDED.tags,
     bestseller=EXCLUDED.bestseller,new_arrival=EXCLUDED.new_arrival,featured=EXCLUDED.featured,flavor=EXCLUDED.flavor,badge=EXCLUDED.badge,spiciness_level=EXCLUDED.spiciness_level`,
    [p.id,p.slug,p.name,p.category,p.categoryName,p.shortDescription,p.description,p.price,p.compareAtPrice??null,p.discount??null,p.rating,p.reviewCount,JSON.stringify(p.images),p.weight,JSON.stringify(p.ingredients),JSON.stringify(p.nutrition),JSON.stringify(p.allergens),p.stock,JSON.stringify(p.tags),p.bestseller??false,p.newArrival??false,p.featured??false,p.flavor,p.badge??null,p.spicinessLevel??null],
  );
  console.log(`Seeded ${PRODUCTS.length} products and ${CATEGORIES.length} categories.`);
} finally {
  await pool.end();
}

