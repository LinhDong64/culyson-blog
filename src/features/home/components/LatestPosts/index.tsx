import { FC } from "react";
import NormalCardImage from "@/components/common/NormalCardImage";

const LatestPosts: FC = () => {
  return (
    <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Bài viết mới nhất</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <NormalCardImage />
        <NormalCardImage />
        <NormalCardImage />
        <NormalCardImage />
      </div>
    </div>
  );
};

export default LatestPosts;
