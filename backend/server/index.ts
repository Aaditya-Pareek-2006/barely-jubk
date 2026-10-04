import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ZodError } from 'zod';
import { authRouter } from './routes/auth.js';
import { catalogRouter } from './routes/catalog.js';
import { ordersRouter, razorpayWebhook } from './orders/routes.js';
import { adminRouter } from './routes/admin.js';
import { ordersAdminRouter } from './orders/admin.js';
import { pool } from './db/pool.js';

if (!process.env.JWT_SECRET || process.env.JWT_SECRET.length < 32) throw new Error('Set JWT_SECRET to a random value of at least 32 characters.');
const app=express();
app.disable('x-powered-by');
app.set('trust proxy',process.env.TRUST_PROXY==='true' ? 1 : false);
app.use(helmet({crossOriginResourcePolicy:{policy:'cross-origin'}}));
app.use(cors({origin:(process.env.FRONTEND_ORIGIN||'http://localhost:5173').split(',').map(s=>s.trim()),credentials:true,methods:['GET','POST','PATCH','DELETE','OPTIONS'],allowedHeaders:['Content-Type','Authorization']}));
app.use('/api/payments/webhook',express.raw({type:'application/json',limit:'1mb'}),async(req,res)=>{
  try{await razorpayWebhook(req.body,req.header('x-razorpay-signature'),req.header('x-razorpay-event-id'),req.header('x-razorpay-event'));res.sendStatus(200);}
  catch(err){console.error('Razorpay webhook rejected:',err);res.sendStatus(400);}
});
app.use(express.json({limit:'32kb'}));
app.use('/api',rateLimit({windowMs:60_000,limit:300,standardHeaders:'draft-8',legacyHeaders:false}));
app.use('/api/auth/login',rateLimit({windowMs:15*60_000,limit:10,standardHeaders:'draft-8',legacyHeaders:false,message:{error:'Too many login attempts. Try again later.'}}));
app.use('/api/auth/register',rateLimit({windowMs:60*60_000,limit:8,standardHeaders:'draft-8',legacyHeaders:false}));
app.get('/api/health',async(_req,res)=>{try{await pool.query('SELECT 1');res.json({status:'ok',database:'connected'});}catch(error){console.error('Database health check failed:',error);res.status(503).json({status:'unavailable',database:'unavailable',error:'PostgreSQL is unreachable. Start PostgreSQL and check backend/.env DATABASE_URL.'});}});
app.use('/api/auth',authRouter);
app.use('/api',catalogRouter);
app.use('/api/orders',ordersRouter);
app.use('/api/admin',adminRouter);
app.use('/api/admin/orders',ordersAdminRouter);
app.use((err:unknown,_req:express.Request,res:express.Response,_next:express.NextFunction)=>{
  if(err instanceof ZodError)return res.status(400).json({error:'Invalid request.',details:err.issues.map(i=>({field:i.path.join('.'),message:i.message}))});
  if(err instanceof Error&&err.message==='Razorpay is not configured.'){
    return res.status(503).json({error:'Online payments are not configured. Add Razorpay test keys to backend/.env and restart the backend, or choose Cash on Delivery.'});
  }
  const databaseError=err as {code?:string};
  if(['ECONNREFUSED','ETIMEDOUT','3D000','28P01'].includes(databaseError.code||'')){
    console.error('Database request failed:',err);
    return res.status(503).json({error:'Database unavailable. Start PostgreSQL and check backend/.env DATABASE_URL.'});
  }
  console.error('API request failed:',err);
  res.status(500).json({error:process.env.NODE_ENV==='production'?'Request failed.':'Request failed. Check server logs.'});
});

const port=Number(process.env.PORT||4000);
const server=app.listen(port,'0.0.0.0',()=>console.log(`Barely Junk API listening on ${port}`));
const shutdown=()=>{server.close(()=>{void pool.end().finally(()=>process.exit(0));});setTimeout(()=>process.exit(1),10_000).unref();};
process.on('SIGTERM',shutdown);process.on('SIGINT',shutdown);

