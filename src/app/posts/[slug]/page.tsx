import { BLOG_POSTS, CATEGORIES } from "@/constants";
import PostDetail from "@/features/posts";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

function getPostDetail(slug: string) {
  const post = BLOG_POSTS.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }

  const category = CATEGORIES.find((item) => item.slug === post.categorySlug);

  if (!category) {
    notFound();
  }

  return { post, category };
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { post } = getPostDetail(slug);

  return {
    title: `${post.title} | Culyson blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { post, category } = getPostDetail(slug);

  return <PostDetail post={post} category={category} />;
}