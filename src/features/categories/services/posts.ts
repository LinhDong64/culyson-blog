import { getPosts } from "@/lib/strapi";
import type { Post } from "@/types";

export const CATEGORY_POSTS_PAGE_SIZE = 4;

export type CategoryPostsPage = {
  posts: Post[];
  total: number;
  nextOffset: number | null;
};

export async function getCategoryPostsPage(categorySlug: string, offset = 0): Promise<CategoryPostsPage> {
  const { posts, pagination } = await getPosts({ categorySlug, offset, pageSize: CATEGORY_POSTS_PAGE_SIZE });
  const nextOffset = offset + posts.length;

  return {
    posts,
    total: pagination.total,
    nextOffset: posts.length > 0 && nextOffset < pagination.total ? nextOffset : null,
  };
}