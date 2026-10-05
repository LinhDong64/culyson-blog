import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import Image from "next/image";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FC } from "react";

type NormalCardImageProps = {
  postedDate: string;
  readingTime: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  showReadMore?: boolean;
};
const NormalCardImage: FC<NormalCardImageProps> = ({
  postedDate,
  readingTime,
  title,
  description,
  tags,
  image,
  featured = true,
  showReadMore = true,
}) => {
  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="relative aspect-16/7 w-full bg-gray-300">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(min-width: 1152px) 540px, (min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        )}
      </div>
      <CardHeader>
        <div className="mb-4 flex flex-wrap gap-x-8 gap-y-2">
          <div className="flex items-center">
            <CalendarDaysIcon
              className="inline-block mr-2"
              width={20}
              height={20}
            />
            <p className="text-muted-foreground">
              {dayjs(postedDate).format("DD-MM-YYYY")}
            </p>
          </div>
          <div className="flex items-center">
            <ClockIcon className="inline-block mr-2" width={20} height={20} />
            <p className="text-muted-foreground">{readingTime}</p>
          </div>
        </div>
        {featured && (
          <CardAction>
            <Badge variant="secondary">Featured</Badge>
          </CardAction>
        )}
        <CardTitle className="text-2xl font-bold"><h3>{title}</h3></CardTitle>
        <CardDescription>{description}</CardDescription>
        {showReadMore && <Button className="cursor-pointer">Read More</Button>}
      </CardHeader>
      {tags.length > 0 && (
        <CardFooter className="flex-wrap gap-2 bg-background">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="mr-2 rounded-[4px] display-inline-block py-4 px-8"
            >
              {tag}
            </Badge>
          ))}
        </CardFooter>
      )}
    </Card>
  );
};
export default NormalCardImage;
