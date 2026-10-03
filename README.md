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

Set Razorpay test credentials in `backend/.env` to exercise online checkout. Never commit real credentials.
