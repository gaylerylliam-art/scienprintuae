# ScienPrintUAE E-commerce Quote Website

Production-grade made-to-order e-commerce stack for ScienPrintUAE, a premium laser engraving and offset printing studio in Jumeirah Lake Towers, Dubai.

## Stack

- Next.js App Router + TypeScript + Tailwind CSS
- Prisma ORM + PostgreSQL
- Server-persisted quote cart tied to an HTTP-only session cookie
- Quote/contact API routes that store database records and optionally notify the studio through Resend
- Admin dashboard for quote status, manual price, notes, and a future payment link
- Upload-ready local images under `public/uploads`

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Set `DATABASE_URL` to a PostgreSQL database.

4. Configure admin access:

```env
ADMIN_EMAIL="admin@scienprintuae.com"
ADMIN_PASSWORD="change-this-password"
```

5. Optional email notification:

```env
RESEND_API_KEY="re_..."
STUDIO_NOTIFICATION_EMAIL="info@scienprintuae.com"
```

If `RESEND_API_KEY` is empty, quote and contact records still save to the database and the UI opens the WhatsApp fallback link.

## Database

Create tables and generate the Prisma client:

```bash
npx prisma migrate dev --name init
```

Seed the full catalog:

```bash
npm run seed
```

The seed includes all requested categories and products:

- Personalized Gifts & Decor
- Corporate & Office Items
- Everyday & Accessories
- Occasion-Based
- Offset Printing products with spec sheets

## Development

```bash
npm run dev
```

Open `http://localhost:3000`.

## Admin

Go to `/admin` and sign in with `ADMIN_EMAIL` and `ADMIN_PASSWORD`. Staff can view quote requests, mark them `pending`, `quoted`, `confirmed`, or `fulfilled`, attach a manual price, add notes, and store a `paymentLink` for a future Stripe, Telr, or PayTabs integration.

## Images

The current studio images are stored in:

```text
public/uploads/studio-01.jpeg ... public/uploads/studio-19.jpeg
```

Replace these files or add new upload records later when moving to S3-compatible object storage. Product seed data references image URLs as normal public paths.

## Production

For Vercel or a standard Node host:

1. Set all environment variables.
2. Run `npx prisma migrate deploy`.
3. Run `npm run seed` once for a fresh database.
4. Build with `npm run build`.
5. Start with `npm run start` or deploy through the platform's Next.js adapter.

Live payment is intentionally not implemented in v1. The bespoke ordering flow ends in a quote request, WhatsApp fallback, email notification, and admin-side manual pricing.
