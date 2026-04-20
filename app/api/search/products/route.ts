import { NextResponse } from "next/server";

import { searchProductsForSuggestions } from "@/lib/search/meili";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";

  try {
    const payload = await searchProductsForSuggestions(query);
    return NextResponse.json(payload);
  } catch {
    return NextResponse.json(
      {
        query,
        results: [],
        suggestions: {
          products: [],
          categories: [],
          materials: [],
        },
      },
      { status: 200 },
    );
  }
}
