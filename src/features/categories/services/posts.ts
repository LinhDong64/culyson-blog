import { BLOG_POSTS } from "@/constants";

export const CATEGORY_POSTS_PAGE_SIZE = 4;

export type CategoryPostsPage = {
  posts: typeof BLOG_POSTS;
  total: number;
  nextOffset: number | null;
};

export function getCategoryPostsPage(categorySlug: string, offset = 0): CategoryPostsPage {
  const posts = BLOG_POSTS.filter((post) => post.categorySlug === categorySlug)
    .sort((first, second) =>
      second.postedDate.localeCompare(first.postedDate) || first.slug.localeCompare(second.slug)
    );
  const page = posts.slice(offset, offset + CATEGORY_POSTS_PAGE_SIZE);
  const nextOffset = offset + page.length;

  return {
    posts: page,
    total: posts.length,
    nextOffset: nextOffset < posts.length ? nextOffset : null,
  };
}