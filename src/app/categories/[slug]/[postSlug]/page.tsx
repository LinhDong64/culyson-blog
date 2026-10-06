import { BLOG_POSTS, CATEGORIES } from "@/constants";
import PostDetail from "@/features/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{ slug: string; postSlug: string }>;
};

function getPostDetail(categorySlug: string, postSlug: string) {
  const category = CATEGORIES.find((item) => item.slug === categorySlug);
  const post = BLOG_POSTS.find(
    (item) => item.slug === postSlug && item.categorySlug === categorySlug
  );

  if (!category || !post) {
    notFound();
  }

  return { post, category };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.categorySlug, postSlug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug, postSlug } = await params;
  const { post } = getPostDetail(slug, postSlug);

  return {
    title: `${post.title} | Culyson blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, postSlug } = await params;
  const { post, category } = getPostDetail(slug, postSlug);

  return <PostDetail post={post} category={category} />;
}