import HeroCardImage from "@/components/common/HeroCardImage";
import NormalCardImage from "@/components/common/NormalCardImage";
import { getPosts } from "@/lib/strapi";

const FeaturedPost = async () => {
  const { posts } = await getPosts({ pageSize: 3, featured: true });
  const [featuredPost, ...otherFeaturedPosts] = posts.filter((post) => post.category);

  if (!featuredPost) {
    return null;
  }

  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
      <HeroCardImage
        author={featuredPost.author}
        postedDate={featuredPost.postedDate}
        readingTime={featuredPost.readingTime}
        image={featuredPost.cover ?? undefined}
        title={featuredPost.title}
        description={featuredPost.description}
        tags={featuredPost.tags}
        href={`/categories/${encodeURIComponent(featuredPost.category!.slug)}/${encodeURIComponent(featuredPost.slug)}`}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {otherFeaturedPosts.map((post) => (
          <NormalCardImage
            key={post.slug}
            author={post.author}
            postedDate={post.postedDate}
            readingTime={post.readingTime}
            image={post.cover ?? undefined}
            title={post.title}
            description={post.description}
            tags={post.tags}
            href={`/categories/${encodeURIComponent(post.category!.slug)}/${encodeURIComponent(post.slug)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedPost;
