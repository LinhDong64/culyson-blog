import "server-only";
import type { Category, CategoryItem, Post, PostItem, StrapiEntity, StrapiPagination, StrapiRelation } from "@/types";

const STRAPI_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/$/, "");
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

export async function fetchStrapi(path: string, options: RequestInit = {}) {
  const url = `${STRAPI_URL}/api${path}`;
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");
  if (STRAPI_TOKEN) headers.set("Authorization", `Bearer ${STRAPI_TOKEN}`);

  const res = await fetch(url, {
    ...options,
    headers,
    ...(options.cache === "no-store" ? {} : { next: { revalidate: 60 } }),
  });

  if (!res.ok) {
    throw new Error(`Strapi error: ${res.status} ${res.statusText}`);
  }

  return res.json();
}


export function getStrapiMedia(url?: string | null) {
  if (!url) return null;
  return new URL(url, STRAPI_URL).toString();
}

function attributes<Value>(entity: StrapiEntity<Value>): Value {
  return "attributes" in entity ? entity.attributes : entity;
}

function relation<Value>(value?: StrapiRelation<Value>): Value | null {
  if (!value) return null;
  const entity = "data" in value ? value.data : value as StrapiEntity<Value>;
  return entity ? attributes(entity) : null;
}

function mapCategory(item: CategoryItem): Category {
  const category = attributes(item);
  return {
    id: item.id,
    name: category.name,
    slug: category.slug,
    description: category.description ?? "",
    alt: category.alt || category.name,
    image: getStrapiMedia(relation(category.image)?.url),
    link: `/categories/${encodeURIComponent(category.slug)}`,
  };
}

// ======================
// CATEGORIES
// ======================

export async function getCategories(): Promise<Category[]> {
  const categories: Category[] = [];
  let page = 1;
  let pageCount = 1;
  do {
    const query = new URLSearchParams({ "populate[0]": "image", "sort[0]": "name:asc", "pagination[pageSize]": "100", "pagination[page]": String(page) });
    const json = await fetchStrapi(`/categories?${query}`);
    categories.push(...json.data.map(mapCategory));
    pageCount = json.meta.pagination.pageCount;
    page += 1;
  } while (page <= pageCount);
  return categories;
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const query = new URLSearchParams({ "filters[slug][$eq]": slug, "populate[0]": "image" });
  const json = await fetchStrapi(`/categories?${query}`);
  return json.data[0] ? mapCategory(json.data[0]) : null;
}

// ======================
// POSTS
// ======================

export async function getPosts(options?: {
  categorySlug?: string;
  pageSize?: number;
  page?: number;
  offset?: number;
  featured?: boolean;
}): Promise<{ posts: Post[]; pagination: StrapiPagination }> {
  const { categorySlug, pageSize = 10, page = 1, offset, featured } = options || {};
  const query = new URLSearchParams({ populate: "*", "sort[0]": "publishedAt:desc", "sort[1]": "slug:asc", "pagination[withCount]": "true" });
  if (offset === undefined) {
    query.set("pagination[pageSize]", String(pageSize));
    query.set("pagination[page]", String(page));
  } else {
    query.set("pagination[start]", String(offset));
    query.set("pagination[limit]", String(pageSize));
  }
  if (categorySlug) query.set("filters[category][slug][$eq]", categorySlug);
  if (featured !== undefined) query.set("filters[featured][$eq]", String(featured));
  const json = await fetchStrapi(`/articles?${query}`);

  return {
    posts: json.data.map((item: PostItem) => mapPost(item)),
    pagination: json.meta.pagination,
  };
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = new URLSearchParams({ "filters[slug][$eq]": slug, populate: "*" });
  const json = await fetchStrapi(`/articles?${query}`);

  if (!json.data?.[0]) return null;
  return mapPost(json.data[0]);
}

// Helper map dữ liệu Post
function mapPost(item: PostItem): Post {
  const post = attributes(item);
  const category = relation(post.category);
  const tags = Array.isArray(post.tags) ? post.tags : post.tags?.data;

  return {
    id: item.id,
    title: post.title,
    slug: post.slug,
    description: post.description ?? "",
    content: post.content ?? [],
    postedDate: post.postedDate || post.publishedAt || post.createdAt || "",
    readingTime: post.readingTime ?? "",
    author: typeof post.author === "string" ? post.author : relation(post.author)?.name ?? "",
    cover: getStrapiMedia(relation(post.cover)?.url),
    coverAlt: post.coverAlt || post.title,
    category: category ? { name: category.name, slug: category.slug } : null,
    tags: tags?.map((tag) => attributes(tag).name) ?? [],
  };
}