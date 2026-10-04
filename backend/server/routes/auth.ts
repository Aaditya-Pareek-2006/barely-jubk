import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createHash, randomBytes } from 'node:crypto';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();
const credentials = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(128) });
const safeUser = (row: any) => ({ id: row.id, name: row.name, email: row.email, phone: row.phone, role: row.role, joinedDate: row.created_at, addresses: [], junkieTier: 'TRASH ROOKIE', junkPoints: 0 });
const issueToken = (user: any) => jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d', issuer: 'barely-junk' });

authRouter.post('/forgot-password',async(req,res,next)=>{
  const client=await pool.connect();
  try{
    const {email}=z.object({email:z.string().email().max(254)}).parse(req.body);
    if(process.env.NODE_ENV==='production'&&(!process.env.RESEND_API_KEY||!process.env.EMAIL_FROM))return res.status(503).json({error:'Password reset email is not configured on this server.'});
    const {rows}=await client.query('SELECT id,email FROM users WHERE email=lower($1)',[email]);
    if(rows[0]){
      const token=randomBytes(32).toString('base64url');
      const tokenHash=createHash('sha256').update(token).digest('hex');
      await client.query('BEGIN');
      await client.query('UPDATE password_reset_tokens SET used_at=now() WHERE user_id=$1 AND used_at IS NULL',[rows[0].id]);
      await client.query('INSERT INTO password_reset_tokens(user_id,token_hash,expires_at) VALUES($1,$2,now()+interval \'30 minutes\')',[rows[0].id,tokenHash]);
      await client.query('COMMIT');
      const origin=(process.env.APP_ORIGIN||'http://localhost:5173').replace(/\/$/,'');
      const resetUrl=`${origin}/reset-password?token=${encodeURIComponent(token)}`;
      if(process.env.RESEND_API_KEY&&process.env.EMAIL_FROM){
        const mail=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.EMAIL_FROM,to:[rows[0].email],subject:'Reset your Barely Junk password',text:`Use this link within 30 minutes to reset your password: ${resetUrl}`,html:`<p>We received a request to reset your Barely Junk password.</p><p><a href="${resetUrl}">Reset password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`})});
        if(!mail.ok)throw new Error(`Password reset email provider returned ${mail.status}.`);
      }else if(process.env.NODE_ENV==='development'){
        console.info(`Development password reset link for ${rows[0].email}: ${resetUrl}`);
      }else{
        console.error('Password reset email is unavailable: configure RESEND_API_KEY and EMAIL_FROM.');
      }
    }
    res.status(202).json({message:'If an account exists for that email, password reset instructions have been sent.'});
  }catch(err){await client.query('ROLLBACK').catch(()=>{});next(err);}finally{client.release();}
});

authRouter.post('/reset-password',async(req,res,next)=>{
  const client=await pool.connect();
  try{
    const {token,password}=z.object({token:z.string().min(40).max(100),password:z.string().min(8).max(128)}).parse(req.body);
    const tokenHash=createHash('sha256').update(token).digest('hex');
    const passwordHash=await bcrypt.hash(password,12);
    await client.query('BEGIN');
    const {rows}=await client.query('SELECT id,user_id FROM password_reset_tokens WHERE token_hash=$1 AND used_at IS NULL AND expires_at>now() FOR UPDATE',[tokenHash]);
    if(!rows[0]){await client.query('ROLLBACK');return res.status(400).json({error:'This password reset link is invalid or expired. Request a new one.'});}
    await client.query('UPDATE users SET password_hash=$2 WHERE id=$1',[rows[0].user_id,passwordHash]);
    await client.query('UPDATE password_reset_tokens SET used_at=now() WHERE user_id=$1 AND used_at IS NULL',[rows[0].user_id]);
    await client.query('COMMIT');
    res.json({message:'Password updated. You can now sign in with your new password.'});
  }catch(err){await client.query('ROLLBACK').catch(()=>{});next(err);}finally{client.release();}
});

authRouter.post('/register', async (req, res, next) => {
  try {
    const body = credentials.extend({ name: z.string().trim().min(2).max(100) }).parse(req.body);
    const hash = await bcrypt.hash(body.password, 12);
    const { rows } = await pool.query('INSERT INTO users(name,email,password_hash) VALUES($1,lower($2),$3) RETURNING *', [body.name,body.email,hash]);
    res.status(201).json({ user: safeUser(rows[0]), token: issueToken(rows[0]) });
  } catch (err: any) {
    if (err.code === '23505') return res.status(409).json({ error: 'An account with this email already exists.' });
    next(err);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const body = credentials.parse(req.body);
    const { rows } = await pool.query('SELECT * FROM users WHERE email=lower($1)', [body.email]);
    if (!rows[0] || !(await bcrypt.compare(body.password, rows[0].password_hash))) return res.status(401).json({ error: 'Email or password is incorrect.' });
    res.json({ user: safeUser(rows[0]), token: issueToken(rows[0]) });
  } catch (err) { next(err); }
});

authRouter.get('/me', requireAuth, async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT id,name,email,phone,role,created_at FROM users WHERE id=$1', [req.auth!.id]);
    if (!rows[0]) return res.status(404).json({ error: 'Account not found.' });
    res.json({ user: safeUser(rows[0]) });
  } catch (err) { next(err); }
});

authRouter.patch('/me', requireAuth, async (req, res, next) => {
  try {
    const data = z.object({ name: z.string().trim().min(2).max(100).optional(), phone: z.string().max(30).optional() }).parse(req.body);
    const { rows } = await pool.query('UPDATE users SET name=COALESCE($2,name),phone=COALESCE($3,phone) WHERE id=$1 RETURNING id,name,email,phone,role,created_at', [req.auth!.id,data.name,data.phone]);
    res.json({ user: safeUser(rows[0]) });
  } catch (err) { next(err); }
});

