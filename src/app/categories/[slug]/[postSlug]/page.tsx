import { getCategoryBySlug, getPostBySlug } from "@/lib/strapi";
import PostDetail from "@/features/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{ slug: string; postSlug: string }>;
};

async function getPostDetail(categorySlug: string, postSlug: string) {
  const [category, post] = await Promise.all([
    getCategoryBySlug(categorySlug),
    getPostBySlug(postSlug),
  ]);

  if (!category || !post || post.category?.slug !== categorySlug) {
    notFound();
  }

  return { post, category };
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const { post } = await getPostDetail(slug, postSlug);

  return {
    title: `${post.title} | Culyson blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, postSlug } = await params;
  const { post, category } = await getPostDetail(slug, postSlug);

  return <PostDetail post={post} category={category} />;
}