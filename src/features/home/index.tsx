import { FC } from "react";
import BaseInfo from "@/features/home/components/BaseInfo";
import SectionLayout from "@/components/common/SectionLayout";
import FeaturedPost from "@/features/home/components/FeaturedPost";
import LatestPosts from "@/features/home/components/LatestPosts";
import Categories from "@/features/home/components/Categories";

const HomeContent: FC = () => {
  return (
    <>
      <SectionLayout bg="bg-white">
        <BaseInfo />
      </SectionLayout>
      <SectionLayout bg="bg-transparent">
        <FeaturedPost />
      </SectionLayout>
      <SectionLayout bg="bg-white">
        <LatestPosts />
      </SectionLayout>
      <SectionLayout bg="bg-transparent">
        <Categories />
      </SectionLayout>
    </>
  );
};

export default HomeContent;
