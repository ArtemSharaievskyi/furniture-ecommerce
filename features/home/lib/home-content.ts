export const homeHeroContent = {
  eyebrow: "North Atelier",
  title: "Furniture shaped by quiet materials and modern living.",
  description:
    "A premium furniture destination for calm rooms, tactile finishes, and pieces that feel as edited as the spaces they live in.",
  imageUrl:
    "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1800&q=80",
  moments: [
    "Curated living, dining, and bedroom pieces",
    "Material-led silhouettes with softened geometry",
    "Delivery-minded planning for modern homes",
  ],
} as const;

export const categoryCopy: Record<
  string,
  { eyebrow: string; description: string }
> = {
  sofas: {
    eyebrow: "Living",
    description: "Modular silhouettes and sink-in comfort for quieter rooms.",
  },
  chairs: {
    eyebrow: "Seating",
    description: "Occasional chairs and dining forms with sculpted presence.",
  },
  tables: {
    eyebrow: "Dining",
    description: "Stone, oak, and everyday surfaces designed to gather around.",
  },
  beds: {
    eyebrow: "Bedroom",
    description: "Layered frames and upholstered forms with restorative calm.",
  },
  wardrobes: {
    eyebrow: "Storage",
    description: "Architectural storage designed to disappear into the room.",
  },
};

export const promotionalBanners = [
  {
    eyebrow: "Interior planning",
    title: "Book a room edit with our in-house studio.",
    description:
      "A focused service for layout, material pairings, and furniture selection before you commit.",
    href: "/catalog",
    cta: "Explore the collection",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1600&q=80",
  },
  {
    eyebrow: "Seasonal edit",
    title: "Dining pieces for longer evenings and larger tables.",
    description:
      "Travertine surfaces, oak seating, and low-glare lighting for hosting with warmth.",
    href: "/catalog",
    cta: "Shop dining",
    imageUrl:
      "https://images.unsplash.com/photo-1505409628601-edc9af17fda6?auto=format&fit=crop&w=1600&q=80",
  },
] as const;

export const benefits = [
  {
    title: "Material-led curation",
    description: "Every piece is selected for texture, proportion, and longevity.",
  },
  {
    title: "Designed to layer",
    description: "Collections are composed to work together across open-plan homes.",
  },
  {
    title: "Room-first guidance",
    description: "A more helpful way to shop when scale and layout matter as much as taste.",
  },
  {
    title: "Delivery-minded details",
    description: "Planning information stays clear from first browse through checkout.",
  },
] as const;

export const newsletterContent = {
  eyebrow: "Newsletter",
  title: "A monthly note on new arrivals, rooms, and material stories.",
  description:
    "Receive curated drops, campaign previews, and styling ideas without the noise of a daily inbox.",
} as const;
