import NormalCardImage from "@/components/common/NormalCardImage";
import { getPosts } from "@/lib/strapi";

const LatestPosts = async () => {
  const { posts } = await getPosts({ pageSize: 4 });
  const latestPosts = posts.filter((post) => post.category);

  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết mới nhất</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {latestPosts.map((post) => (
          <NormalCardImage
            key={post.slug}
            author={post.author}
            postedDate={post.postedDate}
            readingTime={post.readingTime}
            image={post.cover ?? undefined}
            title={post.title}
            description={post.description}
            tags={post.tags}
            featured={false}
            href={`/categories/${encodeURIComponent(post.category!.slug)}/${encodeURIComponent(post.slug)}`}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestPosts;
