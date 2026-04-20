# Furniture E-Commerce

A modern full-stack furniture store built with Next.js, React, TypeScript, Tailwind CSS, Prisma, PostgreSQL, and Auth.js.

The project includes a polished storefront, authentication, cart and mock checkout flow, customer account area, and a protected admin panel for catalog management.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Prisma
- PostgreSQL
- Auth.js

Additional tooling used in the project includes TanStack Query, Zod, React Hook Form, Framer Motion, and Meilisearch for local search indexing.

## Features

- Product catalog with filters and search
- Product detail pages
- Cart with guest and authenticated flows
- Mock checkout with order creation
- Authentication with protected account routes
- Admin panel for products, categories, and orders

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`.

## Database Setup

Generate the Prisma client:

```bash
npx prisma generate
```

Create and apply your local database migration:

```bash
npx prisma migrate dev
```

Seed the database:

```bash
npx prisma db seed
```

Optional local search indexing:

```bash
npm run search:index
```

## Environment Variables

Create a local `.env` file based on `.env.example`.

Required variables:

```env
DATABASE_URL=
AUTH_SECRET=
NEXTAUTH_URL=http://localhost:3000
```

Optional local search variables:

```env
MEILISEARCH_HOST=http://127.0.0.1:7700
MEILISEARCH_MASTER_KEY=local-master-key
```

## Project Structure

The repository is organized around the Next.js App Router and feature-focused modules:

```text
app/
components/
features/
lib/
prisma/
public/
```

## Screenshots

Screenshots can be added here for:

- Homepage
- Product page
- Cart and checkout
- Account dashboard
- Admin panel

## Future Improvements

- Add automated integration and end-to-end test coverage
- Add real payment integration
- Improve inventory validation during cart and checkout
- Add image upload support in the admin panel
- Add CI/CD and deployment workflows

## Development Notes

- Authentication uses Auth.js with credentials-based login.
- Checkout uses a local mock payment confirmation flow and does not connect to a real payment gateway.
- Search indexing expects a local Meilisearch instance when `npm run search:index` is used.
