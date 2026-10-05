import { FC } from "react";
import HeroCardImage from "@/components/common/HeroCardImage";
import NormalCardImage from "@/components/common/NormalCardImage";
import { BLOG_POSTS, CATEGORIES } from "@/constants";

const FeaturedPost: FC = () => {
  const [featuredPost, ...otherFeaturedPosts] = BLOG_POSTS.slice(0, 3);

  if (!featuredPost) {
    return null;
  }

  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
      <HeroCardImage
        postedDate={featuredPost.postedDate}
        readingTime={featuredPost.readingTime}
        image={CATEGORIES.find((category) => category.slug === featuredPost.categorySlug)?.image}
        title={featuredPost.title}
        description={featuredPost.description}
        tags={featuredPost.tags}
        href={`/posts/${featuredPost.slug}`}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {otherFeaturedPosts.map((post) => (
          <NormalCardImage
            key={post.slug}
            postedDate={post.postedDate}
            readingTime={post.readingTime}
            image={CATEGORIES.find((category) => category.slug === post.categorySlug)?.image}
            title={post.title}
            description={post.description}
            tags={post.tags}
            href={`/posts/${post.slug}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPost;
