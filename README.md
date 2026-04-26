# Furniture E-Commerce

<!-- <img width="3424" height="1170" alt="image" src="https://github.com/user-attachments/assets/225d1342-66c3-4c6a-a93d-f8a63b04349e" />


<img width="3416" height="1268" alt="image" src="https://github.com/user-attachments/assets/0b498a85-bb9b-4bfd-bfb1-5a1b70c9b6fe" />
<img width="1748" height="1273" alt="image" src="https://github.com/user-attachments/assets/b02b9c53-d2df-4f4f-88ae-a406a642a269" />
<img width="1510" height="1209" alt="image" src="https://github.com/user-attachments/assets/cf3a2500-e777-47d1-8408-0eea9bed1b86" />
<img width="1353" height="1272" alt="image" src="https://github.com/user-attachments/assets/a1f3dd56-92d0-4156-8143-8eb56e95b0d6" />
<img width="1474" height="1276" alt="image" src="https://github.com/user-attachments/assets/0bfda695-2d87-48fd-8a32-b403fd3202fd" />
<img width="1333" height="1272" alt="image" src="https://github.com/user-attachments/assets/6a0056ff-7345-476e-ac63-95e679a37a4f" /> -->

### 📱 Adaptive Design Preview
<p align="center">
  <img src="https://github.com/user-attachments/assets/225d1342-66c3-4c6a-a93d-f8a63b04349e" width="95%" />
</p>

---

### 🖥️ Main Pages
<p align="center">
  <img src="https://github.com/user-attachments/assets/07fdc0fa-358e-49f9-b4a1-1ad6116a7b26" width="95%" />
</p>

---

### 🛒 Catalog

<p align="center">
  <img  src="https://github.com/user-attachments/assets/a4588713-7af2-451a-83f1-4aaca8db137b" width="95%" />
</p>

---

### 📦 Product Page

<p align="center">
  <img src="https://github.com/user-attachments/assets/10adb2d2-211d-42ca-85da-c4e6d2ebcc3b"  width="95%" />

</p>

---

### 🛒 Cart
<p align="center">
  <img src="https://github.com/user-attachments/assets/89cd2677-547b-45bd-bbe6-c6f3c68eb48b" width="80%" />
</p>
<p align="center">
  <img src="https://github.com/user-attachments/assets/1b9f1d7d-8ba2-460b-8e8e-f5f1193b0b47" width="80%" />
</p>

---

### 🔐 Login
<p align="center">
  <img src="https://github.com/user-attachments/assets/d0604bac-c6c6-442c-ba84-05bb47849433" width="80%" />
</p>

---

### 📝 Registration
<p align="center">
  <img src="https://github.com/user-attachments/assets/c9daf05a-6e7b-4e72-ab6e-fc53518adcf1"  width="80%" />
</p>

---

### 👤 Personal Account
<p align="center">
  <img src="https://github.com/user-attachments/assets/49a1d4ef-18a2-48e5-aa43-54ebcdffff6e" width="80%" />
</p>

---


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
