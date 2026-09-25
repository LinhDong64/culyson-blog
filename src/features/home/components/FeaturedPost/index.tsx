import { FC } from "react";
import HeroCardImage from "@/components/common/HeroCardImage";
import NormalCardImage from "@/components/common/NormalCardImage";

const FeaturedPost: FC = () => {
  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết nổi bật</h2>
      <HeroCardImage />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NormalCardImage />
        <NormalCardImage />
      </div>
    </div>
  );
};

export default FeaturedPost;
