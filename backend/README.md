# Barely Junk Backend API

Modular Express API for the storefront. PostgreSQL owns product inventory, accounts, and orders; payment amounts and discounts are calculated by the server. Razorpay secrets must stay server side.

## Local setup

1. From this `backend` directory run `npm install`.
2. Install and start PostgreSQL, then create a database named `barely_junk` (for example, run `createdb barely_junk` after PostgreSQL is installed).
3. Copy `.env.example` to `.env`. Replace the sample `DATABASE_URL` username/password with your PostgreSQL credentials and replace `JWT_SECRET` with a random secret of at least 32 characters. The example values are placeholders and will not connect by themselves.
4. Run `npm run db:init` then `npm run db:seed` here.
5. Run `npm run dev` here, then run `npm run dev` from the frontend project root in a second terminal.

The frontend Vite proxy forwards `/api` to `http://localhost:4000`. If the backend is stopped or the database is unavailable, catalog calls will fail. Check `http://localhost:4000/api/health` and the backend terminal output first.

For a no-gateway local checkout, choose **Mock UPI (Test)**. The review screen offers simulated success and failure; no bank or real payment is contacted. Mock payment is disabled when `NODE_ENV=production`. Cash on Delivery is also available. Razorpay checkout requires test credentials in `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET`. Put Razorpay test credentials in this folder's `.env`, then restart the API. Configure the provider webhook at `/api/payments/webhook` with the same `RAZORPAY_WEBHOOK_SECRET`; subscribe to `payment.captured`, `payment.failed`, and `order.paid`. The API verifies checkout signatures and webhook signatures.

## Endpoints

- `GET /api/health`
- `GET /api/products`, `GET /api/products/:slug`, `GET /api/categories`
- `POST /api/auth/register`, `POST /api/auth/login`, `GET/PATCH /api/auth/me`
- `POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`, `POST /api/orders/:id/verify-payment`, `POST /api/orders/:id/mock-payment` (development only)
- `GET/POST /api/admin/products`, `PATCH/DELETE /api/admin/products/:id`, `PATCH /api/admin/products/:id/stock`
- `GET /api/admin/users`, `PATCH /api/admin/users/:id/role`
- `GET /api/admin/orders`, `PATCH /api/admin/orders/:id/status`
- `POST /api/payments/webhook` (Razorpay)

Authenticated endpoints use `Authorization: Bearer <token>`. Order creation accepts product IDs and quantities; client-provided prices and totals are ignored. Inventory is checked and reserved inside a database transaction.

## Deployment and capacity

Run multiple stateless API instances behind a managed HTTPS load balancer/WAF. Use a managed PostgreSQL service with backups, TLS, connection limits, and a pooler; tune `DB_POOL_MAX` to the database connection budget divided by the maximum number of API instances. Restrict inbound network access to HTTPS at the load balancer and database access to API private-network security groups. Set `FRONTEND_ORIGIN` to the exact production origin, configure `TRUST_PROXY=true` only behind a trusted single proxy, and use a secret manager for production secrets. Add CDN caching for catalog responses and monitor p95 latency, DB pool saturation, error rates, and payment webhook retries before advertising a 1,000–5,000 concurrent-user capacity. Capacity must be confirmed with production-like load tests and the selected hosting/database plan; this code alone cannot guarantee it.

The first admin must be provisioned by an operator by setting `users.role='admin'` for that account through a controlled database process. Afterward, admins can promote or demote registered accounts in **Admin → Admin Access**. The API prevents self-demotion and keeps at least one admin. Never expose database credentials or promote accounts through a public API without existing admin authorization.

The admin panel uses protected `/api/admin/*` endpoints for overview metrics, products/stock, customers, orders, and administrator access. Fulfillment status updates are blocked for unpaid online orders. Coupon rules are currently fixed in checkout code; the panel lists the active rules but does not offer coupon editing.
