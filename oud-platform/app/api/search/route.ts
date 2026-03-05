import { NextRequest, NextResponse } from "next/server";
import { searchFragrances } from "@/lib/queries";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const params = {
    query: searchParams.get("q") || undefined,
    brand: searchParams.get("brand") || undefined,
    gender: searchParams.get("gender") || undefined,
    sort: searchParams.get("sort") || undefined,
    page: searchParams.get("page")
      ? parseInt(searchParams.get("page")!, 10)
      : undefined,
    minRating: searchParams.get("rating")
      ? parseFloat(searchParams.get("rating")!)
      : undefined,
    limit: searchParams.get("limit")
      ? parseInt(searchParams.get("limit")!, 10)
      : 10,
  };

  const results = searchFragrances(params);

  return NextResponse.json(results);
}
