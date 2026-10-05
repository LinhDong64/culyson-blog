import SectionLayout from "@/components/common/SectionLayout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORIES } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const [featuredCategory, ...categories] = CATEGORIES;

const CategoriesContent: FC = () => {
  return (
    <>
      <SectionLayout bg="bg-transparent">
        <section aria-labelledby="featured-category" className="px-4 pb-10 sm:px-6 sm:pb-14">
          <h2 id="featured-category" className="my-6 text-xl font-bold sm:text-2xl">
            Danh mục nổi bật
          </h2>
          <Card className="gap-0 rounded-lg py-0 transition-shadow hover:ring-2 hover:ring-foreground/30">
            <Link
              href={featuredCategory.link}
              aria-label={featuredCategory.name}
              className="block rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
            >
            <div className="relative aspect-4/3 w-full overflow-hidden sm:aspect-16/7">
              <Image
                src={featuredCategory.image}
                alt={featuredCategory.alt}
                fill
                sizes="(max-width: 1152px) 100vw, 1104px"
                preload
                className="object-cover"
              />
            </div>
            <CardHeader className="gap-3 px-5 py-7 text-center sm:py-9">
              <CardTitle>
                <h3 className="text-3xl font-bold sm:text-4xl">{featuredCategory.name}</h3>
              </CardTitle>
              <CardDescription className="text-base leading-relaxed">
                {featuredCategory.description}
              </CardDescription>
              <p className="text-sm text-muted-foreground">{featuredCategory.count} bài viết</p>
            </CardHeader>
            </Link>
          </Card>
        </section>
      </SectionLayout>
      <SectionLayout bg="bg-background">
        <section aria-labelledby="other-categories" className="px-4 py-10 sm:px-6 sm:py-14">
          <h2 id="other-categories" className="mb-6 border-b border-border pb-5 text-xl font-bold sm:text-2xl">
            Các danh mục khác
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.slug} className="gap-0 rounded-lg py-0 transition-shadow hover:ring-2 hover:ring-foreground/30">
                <Link
                  href={category.link}
                  aria-label={category.name}
                  className="block h-full rounded-lg focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring"
                >
                <div className="relative aspect-3/2 w-full overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    sizes="(min-width: 1152px) 352px, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <CardHeader className="gap-2 px-5 py-6 text-center">
                  <CardTitle>
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </CardTitle>
                  <CardDescription>{category.count} bài viết</CardDescription>
                </CardHeader>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      </SectionLayout>
    </>
  );
};

export default CategoriesContent;