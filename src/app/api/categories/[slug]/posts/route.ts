import { CATEGORIES } from "@/constants";
import { getCategoryPostsPage } from "@/features/categories/services/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!CATEGORIES.some((category) => category.slug === slug)) {
    return Response.json({ error: "Category not found" }, { status: 404 });
  }

  const offset = Number(new URL(request.url).searchParams.get("offset") ?? "0");

  if (!Number.isSafeInteger(offset) || offset < 0) {
    return Response.json({ error: "Invalid offset" }, { status: 400 });
  }

  return Response.json(getCategoryPostsPage(slug, offset));
}