"use client";

import NormalCardImage from "@/components/common/NormalCardImage";
import { Button } from "@/components/ui/button";
import type { CategoryPostsPage } from "@/features/categories/services/posts";
import { LoaderCircleIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type CategoryPostsProps = {
  categorySlug: string;
  image: string;
  initialPage: CategoryPostsPage;
};

export default function CategoryPosts({ categorySlug, image, initialPage }: CategoryPostsProps) {
  const [page, setPage] = useState(initialPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const requestRef = useRef<AbortController | null>(null);

  useEffect(() => () => requestRef.current?.abort(), []);

  async function loadMore() {
    if (requestRef.current || page.nextOffset === null) {
      return;
    }

    const controller = new AbortController();
    requestRef.current = controller;
    setLoading(true);
    setError(false);

    try {
      const response = await fetch(
        `/api/categories/${encodeURIComponent(categorySlug)}/posts?offset=${page.nextOffset}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Unable to load posts");
      }

      const nextPage: CategoryPostsPage = await response.json();

      if (!controller.signal.aborted) {
        setPage((previous) => ({
          ...nextPage,
          posts: [...previous.posts, ...nextPage.posts],
        }));
      }
    } catch {
      if (!controller.signal.aborted) {
        setError(true);
      }
    } finally {
      requestRef.current = null;

      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }

  if (page.total === 0) {
    return <p className="py-8 text-muted-foreground">Chưa có bài viết trong danh mục này.</p>;
  }

  return (
    <>
      <ul id="category-post-list" aria-busy={loading} className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {page.posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/posts/${post.slug}`}
              aria-label={post.title}
              className="block rounded-xl transition-shadow hover:ring-2 hover:ring-ring focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
            >
              <NormalCardImage
                postedDate={post.postedDate}
                readingTime={post.readingTime}
                title={post.title}
                description={post.description}
                tags={post.tags}
                image={image}
                featured={false}
                showReadMore={false}
              />
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col items-center gap-3">
        <p role="status" className="text-sm text-muted-foreground">
          {page.posts.length} / {page.total} bài viết
        </p>
        {error && (
          <p role="alert" className="text-sm text-destructive">
            Không thể tải bài viết. Vui lòng thử lại.
          </p>
        )}
        {page.nextOffset !== null && (
          <Button
            type="button"
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={loadMore}
            aria-controls="category-post-list"
            className="cursor-pointer"
          >
            {loading ? (
              <LoaderCircleIcon aria-hidden="true" className="size-4 animate-spin" />
            ) : (
              <PlusIcon aria-hidden="true" className="size-4" />
            )}
            {loading ? "Đang tải..." : error ? "Thử lại" : "Xem thêm"}
          </Button>
        )}
      </div>
    </>
  );
}