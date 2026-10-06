import SectionLayout from "@/components/common/SectionLayout";
import { Badge } from "@/components/ui/badge";
import type { Category, Post } from "@/types";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import ReactMarkdown from "react-markdown";
import dayjs from "dayjs";
import { ArrowLeftIcon, CalendarDaysIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PostDetailProps = {
  post: Post;
  category: Category;
};

export default function PostDetail({ post, category }: PostDetailProps) {
  const image = post.cover ?? category.image;
  return (
    <SectionLayout bg="bg-background">
      <article className="px-4 py-10 sm:px-6 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <Link
            href={category.link}
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            {category.name}
          </Link>
          <header>
            <h1 className="font-heading text-3xl font-bold leading-tight break-words sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {post.description}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="inline-flex min-w-0 items-center gap-2">
                <UserIcon aria-hidden="true" className="size-4 shrink-0" />
                <span className="min-w-0 wrap-break-word"><span className="sr-only">Tác giả: </span>{post.author}</span>
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDaysIcon aria-hidden="true" className="size-4" />
                <time dateTime={post.postedDate}>
                  {dayjs(post.postedDate).format("DD-MM-YYYY")}
                </time>
              </span>
              <span className="inline-flex items-center gap-2">
                <ClockIcon aria-hidden="true" className="size-4" />
                {post.readingTime}
              </span>
            </div>
          </header>
        </div>
        {image && <figure className="mx-auto mt-8 max-w-4xl">
          <div className="relative aspect-4/3 overflow-hidden rounded-lg sm:aspect-16/7">
            <Image
              src={image}
              alt={post.cover ? post.coverAlt : category.alt}
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              preload
              className="object-cover"
            />
          </div>
        </figure>}
        <div className="mx-auto mt-8 max-w-3xl space-y-6 font-heading text-lg leading-loose break-words sm:mt-10 [&_a]:underline [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:text-xl [&_h3]:font-bold [&_img]:max-w-full [&_ol]:list-decimal [&_ol]:pl-6 [&_ul]:list-disc [&_ul]:pl-6 [&_pre]:overflow-x-auto">
          {typeof post.content === "string" ? (
            <ReactMarkdown>{post.content}</ReactMarkdown>
          ) : post.content.every((paragraph) => typeof paragraph === "string") ? (
            (post.content as string[]).map((paragraph, index) => <p key={`${post.slug}-${index}`}>{paragraph}</p>)
          ) : (
            <BlocksRenderer content={post.content as BlocksContent} />
          )}
        </div>
        <footer className="mx-auto mt-10 max-w-3xl border-t border-border pt-6">
          {post.tags.length > 0 && (
            <ul aria-label="Thẻ bài viết" className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <li key={tag}>
                  <Badge variant="secondary" className="rounded px-3 py-1">
                    {tag}
                  </Badge>
                </li>
              ))}
            </ul>
          )}
          <Link
            href={category.link}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            Quay lại {category.name}
          </Link>
        </footer>
      </article>
    </SectionLayout>
  );
}