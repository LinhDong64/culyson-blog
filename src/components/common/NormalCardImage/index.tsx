import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import dayjs from "dayjs";
import { CalendarDaysIcon, ClockIcon, UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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
  author: string;
  postedDate: string;
  readingTime: string;
  title: string;
  description: string;
  tags: string[];
  image?: string;
  featured?: boolean;
  showReadMore?: boolean;
  href?: string;
};
const NormalCardImage: FC<NormalCardImageProps> = ({
  author,
  postedDate,
  readingTime,
  title,
  description,
  tags,
  image,
  featured = true,
  showReadMore = true,
  href,
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
          <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <UserIcon aria-hidden="true" className="size-5 shrink-0" />
            <p className="min-w-0 wrap-break-word"><span className="sr-only">Tác giả: </span>{author}</p>
          </div>
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
        {showReadMore && href && (
          <Link href={href} className={buttonVariants()} aria-label={`Đọc bài: ${title}`}>
            Đọc bài
          </Link>
        )}
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
