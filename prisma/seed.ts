import "dotenv/config";

import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, Role, ProductStatus } from "@prisma/client";

import { seedCategories, seedProducts } from "./seed-data";

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/north_atelier?schema=public";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.user.deleteMany();

  for (const category of seedCategories) {
    await prisma.category.create({
      data: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        displayOrder: category.displayOrder,
        children: category.children
          ? {
              create: category.children.map((child) => ({
                name: child.name,
                slug: child.slug,
                description: child.description,
                displayOrder: child.displayOrder,
              })),
            }
          : undefined,
      },
    });
  }

  const categoryMap = new Map(
    (
      await prisma.category.findMany({
        select: { id: true, slug: true },
      })
    ).map((category) => [category.slug, category.id]),
  );

  for (const product of seedProducts) {
    const categoryId = categoryMap.get(product.categorySlug);

    if (!categoryId) {
      throw new Error(`Missing category for slug: ${product.categorySlug}`);
    }

    await prisma.product.create({
      data: {
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        shortDescription: product.shortDescription,
        description: product.description,
        material: product.material,
        color: product.color,
        size: product.size,
        priceCents: product.priceCents,
        compareAtPriceCents: product.compareAtPriceCents,
        stockQuantity: product.stockQuantity,
        status: ProductStatus.ACTIVE,
        isFeatured: product.isFeatured ?? false,
        categoryId,
        images: {
          create: product.images,
        },
        variants: {
          create: product.variants,
        },
      },
    });
  }

  const [defaultVariant, firstProduct] = await Promise.all([
    prisma.productVariant.findFirstOrThrow({
      where: { isDefault: true },
      orderBy: { createdAt: "asc" },
    }),
    prisma.product.findFirstOrThrow({
      orderBy: { createdAt: "asc" },
    }),
  ]);

  await prisma.user.createMany({
    data: [
      {
        name: "North Atelier Admin",
        email: "admin@northatelier.local",
        role: Role.ADMIN,
      },
      {
        name: "Sample Customer",
        email: "customer@northatelier.local",
        role: Role.CUSTOMER,
      },
    ],
  });

  const customer = await prisma.user.findUniqueOrThrow({
    where: { email: "customer@northatelier.local" },
  });

  await prisma.cartItem.create({
    data: {
      userId: customer.id,
      productId: firstProduct.id,
      variantId: defaultVariant.id,
      quantity: 1,
      unitPriceCents: defaultVariant.priceCents,
    },
  });

  const featuredProducts = seedProducts
    .filter((product) => product.isFeatured)
    .map((product) => product.name);

  console.log(
    JSON.stringify(
      {
        seeded: {
          categories: seedCategories.length,
          products: seedProducts.length,
          variants: seedProducts.reduce(
            (total, product) => total + product.variants.length,
            0,
          ),
          featuredProducts,
        },
      },
      null,
      2,
    ),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
