import { FC } from "react";
import HeroCardImage from "@/components/common/HeroCardImage";
import NormalCardImage from "@/components/common/NormalCardImage";

const FeaturedPost: FC = () => {
  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
      <HeroCardImage 
        postedDate="2024-06-15"
        readingTime="5 min read"
        image="/path/to/image.jpg"
        title="Featured Post Title"
        description="This is a description of the featured post."
        tags={["Tag1", "Tag2"]}
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NormalCardImage 
        postedDate="2024-06-15"
         readingTime="5 min read"
         title=""
         description=""
          tags={["tag 1", "tag 2"]}
          />
        <NormalCardImage 
        postedDate="2024-06-15"
         readingTime="5 min read" 
         title=""
         description=""
         tags={["tag 1", "tag 2"]}
         />
      </div>
    </div>
  );
};

export default FeaturedPost;
