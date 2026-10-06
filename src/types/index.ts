import type { BlocksContent } from "@strapi/blocks-react-renderer";

export type StrapiEntity<Value> = { id: number; documentId?: string } & (Value | { attributes: Value });
export type StrapiRelation<Value> = StrapiEntity<Value> | { data?: StrapiEntity<Value> | null } | null;

export type CategoryItem = StrapiEntity<{
  name: string;
  slug: string;
  description?: string | null;
  alt?: string | null;
  image?: StrapiRelation<{ url: string }>;
}>;

export type Category = {
  id: number;
  name: string;
  slug: string;
  description: string;
  alt: string;
  image: string | null;
  link: string;
};

type Tag = StrapiEntity<{ name: string }>;
export type PostItem = StrapiEntity<{
  title: string;
  slug: string;
  description?: string | null;
  content?: string[] | string | BlocksContent | null;
  postedDate?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
  readingTime?: string | null;
  author?: string | StrapiRelation<{ name: string }>;
  cover?: StrapiRelation<{ url: string }>;
  coverAlt?: string | null;
  category?: StrapiRelation<{ name: string; slug: string }>;
  tags?: Tag[] | { data?: Tag[] | null } | null;
}>;

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string[] | string | BlocksContent;
  postedDate: string;
  readingTime: string;
  author: string;
  cover: string | null;
  coverAlt: string;
  category: { name: string; slug: string } | null;
  tags: string[];
};

export type StrapiPagination = {
  total: number;
  page?: number;
  pageSize?: number;
  pageCount?: number;
  start?: number;
  limit?: number;
};
