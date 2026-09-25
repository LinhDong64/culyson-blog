import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { CATEGORIES } from "@/constants";

const Categories: FC = () => {
  return (
   <div className="w-full py-15 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Danh mục</h2>
      <div className="flex justify-between flex-wrap w-full gap-2">
        {
          CATEGORIES.map(category => (
            <Badge 
              key={category.name}
              variant="outline" 
              className="p-4 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700 hover:shadow-lg hover:shadow-blue-200/60 focus-within:-translate-y-1 focus-within:border-blue-400 focus-within:bg-blue-50 focus-within:text-blue-700 focus-within:shadow-lg focus-within:shadow-blue-200/60 dark:hover:border-blue-500 dark:hover:bg-blue-950/40 dark:hover:text-blue-300 dark:hover:shadow-blue-950/40"
              render={
                <Link href={category.link} className="group/link inline-flex items-center gap-1 hover:underline">
                  {category.name}
                  <ArrowUpRightIcon className="transition-transform duration-300 ease-out group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" data-icon="inline-end" />
                </Link>} 
              />
          ))
        }
      </div>
    </div>
  );
};

export default Categories;