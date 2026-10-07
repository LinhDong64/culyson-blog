import { FC } from "react";
import BaseInfo from "@/features/home/components/BaseInfo";
import SectionLayout from "@/components/common/SectionLayout";
import FeaturedPost from "@/features/home/components/FeaturedPost";
import LatestPosts from "@/features/home/components/LatestPosts";
import Categories from "@/components/common/Categories";

const HomeContent: FC = () => {
  return (
    <>
      <SectionLayout bg="bg-background">
        <BaseInfo />
      </SectionLayout>
      <SectionLayout bg="bg-transparent">
        <FeaturedPost />
      </SectionLayout>
      <SectionLayout bg="bg-background">
        <LatestPosts />
      </SectionLayout>
      <SectionLayout bg="bg-transparent">
        <Categories />
      </SectionLayout>
    </>
  );
};

export default HomeContent;
