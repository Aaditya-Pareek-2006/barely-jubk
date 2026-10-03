import { Router } from 'express';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool.js';
import { requireAuth } from '../middleware/auth.js';

export const authRouter = Router();
const credentials = z.object({ email: z.string().email().max(254), password: z.string().min(8).max(128) });
const safeUser = (row: any) => ({ id: row.id, name: row.name, email: row.email, phone: row.phone, role: row.role, joinedDate: row.created_at, addresses: [], junkieTier: 'TRASH ROOKIE', junkPoints: 0 });
const issueToken = (user: any) => jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '7d', issuer: 'barely-junk' });

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

