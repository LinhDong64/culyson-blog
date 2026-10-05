import SectionLayout from "@/components/common/SectionLayout";
import { CATEGORIES } from "@/constants";
import CategoryPosts from "@/features/categories/components/CategoryPosts";
import { getCategoryPostsPage } from "@/features/categories/services/posts";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  const initialPage = getCategoryPostsPage(category.slug);

  return (
    <SectionLayout bg="bg-background">
      <section className="px-4 py-10 sm:px-6 sm:py-14">
        <Link
          href="/categories"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          <ArrowLeftIcon className="size-4" aria-hidden="true" />
          Danh mục
        </Link>
        <div className="mb-8 border-b border-border pb-6">
          <h1 className="font-heading text-3xl font-bold sm:text-4xl">{category.name}</h1>
          <p className="mt-3 leading-relaxed text-muted-foreground">{category.description}</p>
          <p className="mt-3 text-sm text-muted-foreground">{initialPage.total} bài viết</p>
        </div>
        <div className="relative aspect-4/3 overflow-hidden rounded-lg sm:aspect-16/7">
          <Image
            src={category.image}
            alt={category.alt}
            fill
            sizes="(max-width: 1152px) 100vw, 1104px"
            preload
            className="object-cover"
          />
        </div>
        <section aria-labelledby="category-posts" className="mt-10 sm:mt-14">
          <h2 id="category-posts" className="mb-6 text-2xl font-bold">Bài viết</h2>
          <CategoryPosts
            key={category.slug}
            categorySlug={category.slug}
            image={category.image}
            initialPage={initialPage}
          />
        </section>
      </section>
    </SectionLayout>
  );
}