# Barely Junk

The frontend and API live in separate folders so they can be developed and deployed independently.

## Run locally

1. Start PostgreSQL and follow [backend/README.md](backend/README.md) to install and configure the backend, initialize its schema, and seed the catalog.
2. In one terminal, from `backend/`, run `npm run dev`.
3. In another terminal, from the project root, run `npm install` once and then `npm run dev`.

The frontend proxies `/api` requests to `http://localhost:4000`. Verify the API at `http://localhost:4000/api/health`. The catalog requires the backend and database to be running.

## Project layout

- `src/` — React + Vite storefront.
- `backend/server/` — Express routes, middleware, and PostgreSQL schema/seeding.
- `backend/.env.example` — backend configuration template.

For local checkout without a gateway account, select **Mock UPI (Test)** to simulate successful or failed payments. This is only a development aid; it does not transfer money and is disabled when the backend runs with `NODE_ENV=production`. Razorpay test credentials are another option. Never commit payment credentials.

The login page includes a password reset flow. During local development, use the reset link printed in the backend terminal; for email delivery, configure `APP_ORIGIN`, `RESEND_API_KEY`, and `EMAIL_FROM` in `backend/.env`, then run `npm run db:init`. See [backend setup](backend/README.md) for details.
