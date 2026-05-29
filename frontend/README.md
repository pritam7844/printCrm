# PrintCRM

Full-stack PrintCRM SaaS prototype for print-on-demand businesses.

## Run Frontend

```bash
pnpm install
npm run dev
```

Open `http://localhost:5173/`.

## Run Backend

Create `.env` from `.env.example`, then set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/printcrm
JWT_SECRET=replace_with_a_long_random_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start a local MongoDB server, then run:

```bash
npm run seed
npm run dev:api
```

API health check:

```bash
curl http://localhost:8080/api/health
```

Seed login:

```text
owner@printcrm.test / printcrm123
```

## Backend Modules

- Auth: `/api/auth/register`, `/api/auth/login`, `/api/auth/me`
- Dashboard: `/api/dashboard`
- Leads: `/api/leads`
- Orders: `/api/orders`, `/api/orders/from-lead/:leadId`, `/api/orders/:id/stage`
- Payments: `/api/payments`
- Team: `/api/team`
- Uploads: `/api/uploads`, `/api/uploads/orders/:orderId/assets`
- WhatsApp integrations: `/api/integrations/:tenantId`
- WhatsApp webhook: `/webhook/whatsapp/:tenantId`

Cloudinary upload endpoints return `503` until Cloudinary credentials are configured.
