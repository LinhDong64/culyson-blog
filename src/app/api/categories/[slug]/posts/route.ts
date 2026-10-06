import { getCategoryBySlug } from "@/lib/strapi";
import { getCategoryPostsPage } from "@/features/categories/services/posts";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const offset = Number(new URL(request.url).searchParams.get("offset") ?? "0");

  if (!Number.isSafeInteger(offset) || offset < 0) {
    return Response.json({ error: "Invalid offset" }, { status: 400 });
  }

  try {
    if (!await getCategoryBySlug(slug)) {
      return Response.json({ error: "Category not found" }, { status: 404 });
    }
    return Response.json(await getCategoryPostsPage(slug, offset));
  } catch {
    return Response.json({ error: "Unable to load posts" }, { status: 502 });
  }
}