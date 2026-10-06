import { FC } from "react";
import NormalCardImage from "@/components/common/NormalCardImage";
import { BLOG_POSTS, CATEGORIES } from "@/constants";

const LatestPosts: FC = () => {
  const latestPosts = [...BLOG_POSTS]
    .sort((first, second) =>
      second.postedDate.localeCompare(first.postedDate) || first.slug.localeCompare(second.slug)
    )
    .slice(0, 4);

  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết mới nhất</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {latestPosts.map((post) => (
          <NormalCardImage
            key={post.slug}
            postedDate={post.postedDate}
            readingTime={post.readingTime}
            image={CATEGORIES.find((category) => category.slug === post.categorySlug)?.image}
            title={post.title}
            description={post.description}
            tags={post.tags}
            featured={false}
            href={`/categories/${post.categorySlug}/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
