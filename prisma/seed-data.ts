type SeedCategory = {
  name: string;
  slug: string;
  description: string;
  displayOrder: number;
  children?: SeedCategory[];
};

type SeedProductImage = {
  url: string;
  altText: string;
  width: number;
  height: number;
  sortOrder: number;
  isPrimary?: boolean;
};

type SeedVariant = {
  name: string;
  sku: string;
  material: string;
  color: string;
  size: string;
  priceCents: number;
  compareAtPriceCents?: number;
  stockQuantity: number;
  isDefault?: boolean;
};

type SeedProduct = {
  name: string;
  slug: string;
  sku: string;
  categorySlug: string;
  shortDescription: string;
  description: string;
  material: string;
  color: string;
  size: string;
  priceCents: number;
  compareAtPriceCents?: number;
  stockQuantity: number;
  isFeatured?: boolean;
  images: SeedProductImage[];
  variants: SeedVariant[];
};

export const seedCategories: SeedCategory[] = [
  {
    name: "Living Room",
    slug: "living-room",
    description: "Seating, storage, and accent furniture for everyday living.",
    displayOrder: 1,
    children: [
      {
        name: "Sofas",
        slug: "sofas",
        description: "Deep seating, modular forms, and statement sofas.",
        displayOrder: 1,
      },
      {
        name: "Accent Chairs",
        slug: "accent-chairs",
        description: "Occasional chairs for reading corners and layered seating.",
        displayOrder: 2,
      },
    ],
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    description: "Furniture designed for gathering, hosting, and slow meals.",
    displayOrder: 2,
    children: [
      {
        name: "Dining Tables",
        slug: "dining-tables",
        description: "Large-format dining tables in wood and stone finishes.",
        displayOrder: 1,
      },
    ],
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    description: "Bedroom essentials with warm materials and quiet silhouettes.",
    displayOrder: 3,
  },
  {
    name: "Office",
    slug: "office",
    description: "Workspaces built around storage, focus, and comfort.",
    displayOrder: 4,
  },
];

export const seedProducts: SeedProduct[] = [
  {
    name: "Harbor Modular Sofa",
    slug: "harbor-modular-sofa",
    sku: "SOFA-HARBOR",
    categorySlug: "sofas",
    shortDescription: "Low-profile modular sofa with plush seat depth.",
    description:
      "The Harbor Modular Sofa is designed for open-plan living rooms with generous proportions, deep cushions, and a grounded silhouette. It balances tailored upholstery with inviting comfort and works as an anchor piece for premium residential interiors.",
    material: "Kiln-dried oak, high-resilience foam, linen blend upholstery",
    color: "Sand",
    size: "3-Seater",
    priceCents: 329900,
    compareAtPriceCents: 359900,
    stockQuantity: 9,
    isFeatured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
        altText: "Harbor Modular Sofa in a warm living room setting",
        width: 1400,
        height: 1000,
        sortOrder: 1,
        isPrimary: true,
      },
      {
        url: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=1400&q=80",
        altText: "Close detail of the Harbor sofa upholstery",
        width: 1400,
        height: 1000,
        sortOrder: 2,
      },
    ],
    variants: [
      {
        name: "Sand / 3-Seater",
        sku: "SOFA-HARBOR-SAND-3",
        material: "Linen blend upholstery",
        color: "Sand",
        size: "3-Seater",
        priceCents: 329900,
        compareAtPriceCents: 359900,
        stockQuantity: 4,
        isDefault: true,
      },
      {
        name: "Olive / 3-Seater",
        sku: "SOFA-HARBOR-OLIVE-3",
        material: "Performance weave upholstery",
        color: "Olive",
        size: "3-Seater",
        priceCents: 339900,
        stockQuantity: 3,
      },
      {
        name: "Sand / Corner Sectional",
        sku: "SOFA-HARBOR-SAND-CORNER",
        material: "Linen blend upholstery",
        color: "Sand",
        size: "Corner Sectional",
        priceCents: 459900,
        stockQuantity: 2,
      },
    ],
  },
  {
    name: "Atelier Lounge Chair",
    slug: "atelier-lounge-chair",
    sku: "CHAIR-ATELIER",
    categorySlug: "accent-chairs",
    shortDescription: "Sculpted lounge chair with solid timber frame.",
    description:
      "The Atelier Lounge Chair pairs a compact footprint with a curved backrest and tactile upholstery. It works in living rooms, bedrooms, and hospitality settings where a distinct occasional seat is needed without visual heaviness.",
    material: "Solid ash, webbing support, bouclé upholstery",
    color: "Ivory",
    size: "Single Seat",
    priceCents: 119900,
    stockQuantity: 18,
    images: [
      {
        url: "https://images.unsplash.com/photo-1519947486511-46149fa0a254?auto=format&fit=crop&w=1400&q=80",
        altText: "Atelier Lounge Chair in an editorial corner",
        width: 1400,
        height: 1000,
        sortOrder: 1,
        isPrimary: true,
      },
    ],
    variants: [
      {
        name: "Ivory / Ash",
        sku: "CHAIR-ATELIER-IVORY-ASH",
        material: "Bouclé upholstery, ash frame",
        color: "Ivory",
        size: "Single Seat",
        priceCents: 119900,
        stockQuantity: 10,
        isDefault: true,
      },
      {
        name: "Charcoal / Walnut",
        sku: "CHAIR-ATELIER-CHARCOAL-WALNUT",
        material: "Textured weave upholstery, walnut frame",
        color: "Charcoal",
        size: "Single Seat",
        priceCents: 124900,
        stockQuantity: 8,
      },
    ],
  },
  {
    name: "Cascade Dining Table",
    slug: "cascade-dining-table",
    sku: "TABLE-CASCADE",
    categorySlug: "dining-tables",
    shortDescription: "Large-format dining table with architectural base.",
    description:
      "The Cascade Dining Table is designed for generous gatherings and visual presence. A substantial tabletop and sculptural pedestal base create a centerpiece that feels refined but durable enough for daily use.",
    material: "Travertine veneer, engineered core, solid oak base",
    color: "Natural Stone",
    size: "240 cm",
    priceCents: 419900,
    compareAtPriceCents: 449900,
    stockQuantity: 6,
    isFeatured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505409628601-edc9af17fda6?auto=format&fit=crop&w=1400&q=80",
        altText: "Cascade Dining Table styled in a modern dining room",
        width: 1400,
        height: 1000,
        sortOrder: 1,
        isPrimary: true,
      },
    ],
    variants: [
      {
        name: "Natural Stone / 240 cm",
        sku: "TABLE-CASCADE-STONE-240",
        material: "Travertine veneer, oak base",
        color: "Natural Stone",
        size: "240 cm",
        priceCents: 419900,
        compareAtPriceCents: 449900,
        stockQuantity: 3,
        isDefault: true,
      },
      {
        name: "Smoked Oak / 220 cm",
        sku: "TABLE-CASCADE-OAK-220",
        material: "Smoked oak veneer, oak base",
        color: "Smoked Oak",
        size: "220 cm",
        priceCents: 389900,
        stockQuantity: 3,
      },
    ],
  },
  {
    name: "Mora Storage Bed",
    slug: "mora-storage-bed",
    sku: "BED-MORA",
    categorySlug: "bedroom",
    shortDescription: "Platform bed with integrated under-frame storage.",
    description:
      "The Mora Storage Bed combines upholstered softness with hidden storage capacity, making it ideal for urban bedrooms where every square meter matters. The proportions are calm and architectural, with subtle detailing around the base.",
    material: "Solid pine, engineered panels, woven upholstery",
    color: "Mist",
    size: "Queen",
    priceCents: 279900,
    stockQuantity: 11,
    images: [
      {
        url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
        altText: "Mora Storage Bed in a serene bedroom interior",
        width: 1400,
        height: 1000,
        sortOrder: 1,
        isPrimary: true,
      },
    ],
    variants: [
      {
        name: "Mist / Queen",
        sku: "BED-MORA-MIST-QUEEN",
        material: "Woven upholstery",
        color: "Mist",
        size: "Queen",
        priceCents: 279900,
        stockQuantity: 6,
        isDefault: true,
      },
      {
        name: "Graphite / King",
        sku: "BED-MORA-GRAPHITE-KING",
        material: "Performance weave upholstery",
        color: "Graphite",
        size: "King",
        priceCents: 309900,
        stockQuantity: 5,
      },
    ],
  },
  {
    name: "Ledger Executive Desk",
    slug: "ledger-executive-desk",
    sku: "DESK-LEDGER",
    categorySlug: "office",
    shortDescription: "Spacious desk with integrated storage and cable control.",
    description:
      "The Ledger Executive Desk is tailored for residential offices and studio environments that need a substantial surface, concealed storage, and elevated materiality. A refined silhouette keeps the piece feeling calm despite its utility.",
    material: "Walnut veneer, powder-coated steel, soft-close drawers",
    color: "Walnut",
    size: "160 cm",
    priceCents: 214900,
    stockQuantity: 7,
    images: [
      {
        url: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80",
        altText: "Ledger Executive Desk in a modern office",
        width: 1400,
        height: 1000,
        sortOrder: 1,
        isPrimary: true,
      },
    ],
    variants: [
      {
        name: "Walnut / 160 cm",
        sku: "DESK-LEDGER-WALNUT-160",
        material: "Walnut veneer, steel base",
        color: "Walnut",
        size: "160 cm",
        priceCents: 214900,
        stockQuantity: 4,
        isDefault: true,
      },
      {
        name: "Black Oak / 180 cm",
        sku: "DESK-LEDGER-BLACK-180",
        material: "Black oak veneer, steel base",
        color: "Black Oak",
        size: "180 cm",
        priceCents: 239900,
        stockQuantity: 3,
      },
    ],
  },
];
