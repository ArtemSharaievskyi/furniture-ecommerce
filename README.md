# North Atelier

Modern full-stack furniture e-commerce starter built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, Framer Motion, Auth.js, TanStack Query, Meilisearch, and Prisma ORM.

## Database Layer

The project now targets a local PostgreSQL database with Prisma ORM.

### Core models

- `User`
- `Category`
- `Product`
- `ProductImage`
- `ProductVariant`
- `CartItem`
- `Order`
- `OrderItem`

The schema is structured for realistic furniture commerce:

- products belong to categories
- products support material, color, size, pricing, stock, images, and variants
- cart items always reference a concrete purchasable variant/SKU
- order items snapshot product and variant details for historical accuracy
- all core tables include timestamps
- Auth.js-compatible models remain included for future authentication wiring

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
copy .env.example .env
```

3. Create a local PostgreSQL database, for example:

```sql
CREATE DATABASE north_atelier;
```

4. Update `DATABASE_URL` in `.env` if your local credentials differ.

5. Generate the Prisma client:

```bash
npm run db:generate
```

6. Start Meilisearch locally:

```bash
docker compose -f docker-compose.meilisearch.yml up -d
```

## Migration and Seeding

Create and apply your first development migration:

```bash
npm run db:migrate -- --name init_commerce_schema
```

If you want to sync schema changes without creating a migration:

```bash
npm run db:push
```

Seed the database with example furniture categories and products:

```bash
npm run db:seed
```

Index the active products into Meilisearch:

```bash
npm run search:index
```

Open Prisma Studio:

```bash
npm run db:studio
```

## Seed Contents

The seed includes:

- example admin and customer users
- nested furniture categories
- furniture products with realistic descriptions
- product image records
- multiple purchasable variants per product
- a searchable Meilisearch-ready product catalog

## Product Search

The catalog now includes a Meilisearch-backed search experience with:

- instant search suggestions
- live result previews
- search across product name, category, material, and description
- URL-driven catalog search via the `q` query parameter

Meilisearch defaults:

- host: `http://127.0.0.1:7700`
- master key: `local-master-key`

If Meilisearch is temporarily unavailable, the catalog falls back to a Prisma text query so the page remains usable while local search is offline.

## Useful Commands

```bash
npm run dev
npm run lint
npm run typecheck
npm run db:generate
npm run db:migrate -- --name init_commerce_schema
npm run db:push
npm run db:seed
npm run db:studio
npm run search:index
```
