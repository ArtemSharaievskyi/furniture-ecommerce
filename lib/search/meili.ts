import "server-only";

import { Meilisearch } from "meilisearch";

export const meili = new Meilisearch({
  host: process.env.MEILISEARCH_HOST ?? "http://127.0.0.1:7700",
  apiKey: process.env.MEILISEARCH_MASTER_KEY ?? "local-master-key",
});

export const productIndex = meili.index("products");
