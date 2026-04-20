import { Meilisearch } from "meilisearch";

const PRODUCT_INDEX_UID = "products";

export type ProductSearchDocument = {
  id: string;
  slug: string;
  name: string;
  category: string;
  categorySlug: string;
  material: string;
  color: string;
  size: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  priceCents: number;
  price: string;
  isFeatured: boolean;
  createdAt: string;
};

export const meili = new Meilisearch({
  host: process.env.MEILISEARCH_HOST ?? "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY ?? "local-master-key",
});

export const productIndex = meili.index<ProductSearchDocument>(PRODUCT_INDEX_UID);

async function waitForTask(taskUid: number) {
  await meili.tasks.waitForTask(taskUid, {
    timeout: 30_000,
  });
}

export async function ensureProductSearchIndex() {
  try {
    await meili.getIndex(PRODUCT_INDEX_UID);
  } catch {
    const task = await meili.createIndex(PRODUCT_INDEX_UID, { primaryKey: "id" });
    await waitForTask(task.taskUid);
  }

  const settingsTask = await productIndex.updateSettings({
    searchableAttributes: [
      "name",
      "category",
      "material",
      "shortDescription",
      "description",
    ],
    filterableAttributes: [
      "category",
      "categorySlug",
      "material",
      "color",
      "isFeatured",
      "priceCents",
    ],
    sortableAttributes: ["priceCents", "createdAt", "name"],
    displayedAttributes: [
      "id",
      "slug",
      "name",
      "category",
      "material",
      "color",
      "size",
      "shortDescription",
      "description",
      "imageUrl",
      "price",
      "priceCents",
      "isFeatured",
    ],
  });

  await waitForTask(settingsTask.taskUid);
}

export async function indexProductDocuments(documents: ProductSearchDocument[]) {
  const clearTask = await productIndex.deleteAllDocuments();
  await waitForTask(clearTask.taskUid);

  if (!documents.length) {
    return {
      indexed: 0,
    };
  }

  const addTask = await productIndex.addDocuments(documents);
  await waitForTask(addTask.taskUid);

  return {
    indexed: documents.length,
  };
}

export async function searchProductIds(query: string, limit = 250) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return null;
  }

  try {
    const response = await productIndex.search(trimmedQuery, {
      limit,
      attributesToRetrieve: ["id"],
    });

    return response.hits
      .map((hit) => hit.id)
      .filter((value): value is string => typeof value === "string");
  } catch {
    return null;
  }
}

export async function searchProductsForSuggestions(query: string, limit = 6) {
  const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    return {
      query: trimmedQuery,
      results: [],
      suggestions: {
        products: [],
        categories: [],
        materials: [],
      },
    };
  }

  const response = await productIndex.search(trimmedQuery, {
    limit,
    facets: ["category", "material"],
    attributesToRetrieve: [
      "id",
      "slug",
      "name",
      "category",
      "material",
      "shortDescription",
      "imageUrl",
      "price",
      "isFeatured",
    ],
  });

  const productSuggestions = Array.from(
    new Set(
      response.hits
        .map((hit) => hit.name)
        .filter((value): value is string => typeof value === "string"),
    ),
  ).slice(0, 5);

  const categories = Object.keys(response.facetDistribution?.category ?? {}).slice(0, 4);
  const materials = Object.keys(response.facetDistribution?.material ?? {}).slice(0, 4);

  return {
    query: trimmedQuery,
    results: response.hits.map((hit) => ({
      id: hit.id,
      slug: hit.slug,
      name: hit.name,
      category: hit.category,
      material: hit.material,
      shortDescription: hit.shortDescription,
      imageUrl: hit.imageUrl,
      price: hit.price,
      isFeatured: hit.isFeatured,
    })),
    suggestions: {
      products: productSuggestions,
      categories,
      materials,
    },
  };
}
