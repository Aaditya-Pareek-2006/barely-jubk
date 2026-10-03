# Order module

This folder contains customer order creation, payment verification/webhooks, and seller order management routes. Order records themselves live in PostgreSQL in the `orders` table, defined in `../db/schema.sql`; this folder stores only the backend code.

- Customer API: mounted at `/api/orders` from `routes.ts`.
- Admin/seller API: mounted at `/api/admin/orders` from `admin.ts`. Requests require a valid JWT for a user whose database role is `admin`.
- Order items, shipping address, amounts, payment state, delivery choice, and fulfillment status are persisted in PostgreSQL.

Use pgAdmin's Query Tool to inspect recent orders:

```sql
SELECT display_id, created_at, status, payment_status, payment_method, total,
       shipping_address->>'fullName' AS customer
FROM orders
ORDER BY created_at DESC;
```
