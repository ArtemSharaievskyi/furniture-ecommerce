export const siteConfig = {
  name: "North Atelier",
  description:
    "Modern full-stack furniture commerce scaffold built with Next.js, Auth.js, TanStack Query, Prisma, and local mock CMS data.",
  url: "http://localhost:3000",
  mainNav: [
    { href: "/", label: "Home" },
    { href: "/catalog", label: "Catalog" },
    { href: "/cart", label: "Cart" },
    { href: "/checkout", label: "Checkout" },
    { href: "/account", label: "Account" },
  ],
  footerNav: [
    { href: "/login", label: "Login" },
    { href: "/register", label: "Register" },
    { href: "/admin", label: "Admin" },
  ],
} as const;

export const homeHighlights = [
  {
    title: "App Router structure",
    description: "Route groups keep storefront, auth, and admin concerns separated.",
    supportingCopy:
      "Pages remain server-first while providers and forms sit behind explicit client boundaries.",
  },
  {
    title: "Shared UI system",
    description: "Tailwind v4 and shadcn/ui primitives are centralized for reuse.",
    supportingCopy:
      "Layout shells, cards, forms, and motion helpers are ready for future product work.",
  },
  {
    title: "Local services ready",
    description: "Prisma + SQLite, Meilisearch config, and mock CMS content are scaffolded.",
    supportingCopy:
      "You can build toward a production architecture while still working entirely locally.",
  },
  {
    title: "Frontend confidence",
    description: "Framer Motion is already introduced with restrained reveal animations.",
    supportingCopy:
      "The landing experience looks intentional without overcommitting to finished business flows.",
  },
] as const;

export const projectPillars = [
  {
    title: "Domain folders",
    summary: "Features are grouped by business surface.",
    description:
      "Catalog, auth, checkout, cart, account, and admin each have room for their own components, hooks, and data access later.",
  },
  {
    title: "Infrastructure seams",
    summary: "Search, auth, db, and validation live in dedicated library modules.",
    description:
      "This keeps framework wiring out of feature code and makes future replacement or testing easier.",
  },
  {
    title: "Mock-friendly content",
    summary: "Editorial and product content are local JSON files for now.",
    description:
      "That gives you deterministic local data while leaving a clear migration path toward a real CMS.",
  },
] as const;

export const homeEditorial = [
  {
    kicker: "Living",
    title: "Statement seating",
    description: "Space reserved for editorial storytelling and campaign-led merchandising blocks.",
  },
  {
    kicker: "Dining",
    title: "Quiet material palettes",
    description: "Prepared for future CMS-driven collections with layered imagery and metadata.",
  },
  {
    kicker: "Studio",
    title: "Objects and lighting",
    description: "Structured so promotional modules can sit beside normalized catalog data.",
  },
] as const;

export const mockCartLines = [
  {
    name: "Harbor Lounge Chair",
    summary: "Textured bouclé accent chair with sculpted oak frame.",
    quantity: 1,
    price: "€1,450",
  },
  {
    name: "Tide Floor Lamp",
    summary: "Brushed brass stem with parchment shade and dimmable base.",
    quantity: 2,
    price: "€420",
  },
] as const;

export const adminPanels = [
  {
    title: "Catalog operations",
    description: "Prepared for product drafts, category assignments, and publishing workflows.",
    body: "Connect the admin placeholder to the local DAL and Prisma models once CRUD requirements are finalized.",
  },
  {
    title: "Search indexing",
    description: "Reserved for Meilisearch sync health and queued index jobs.",
    body: "The Meilisearch client lives in lib/search so indexing actions can be added without reshaping the dashboard.",
  },
  {
    title: "Customer support",
    description: "Prepared for account lookups, order status review, and service notes.",
    body: "Authorization and DTO layers should be added before exposing any customer data in this surface.",
  },
  {
    title: "Content scheduling",
    description: "Space for future homepage slots and collection campaigns.",
    body: "The local JSON-based CMS structure mirrors the editorial modules already rendered on the storefront.",
  },
] as const;
