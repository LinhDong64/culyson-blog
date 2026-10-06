import { FC } from "react"
import dayjs from "dayjs"
import { Badge } from "@/components/ui/badge"
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
} from "@/components/ui/card"
import { buttonVariants } from "@/components/ui/button";

type HeroCardImageProps = {
  author: string;
  postedDate: string;
  readingTime: string;
  image?: string;
  title: string;
  description: string;
  tags: string[];
  href?: string;
};
const HeroCardImage: FC<HeroCardImageProps> = ({ author, postedDate, readingTime, image, title, description, tags, href }) => {
  return (
    <Card className="relative mx-auto w-full p-4">
      <div className="relative aspect-16/7 w-full overflow-hidden bg-gray-300">
        {image && (
          <Image
            src={image}
            alt=""
            fill
            sizes="(max-width: 1152px) 100vw, 1120px"
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
            <CalendarDaysIcon className="inline-block mr-2" width={20} height={20} />
            <p className="text-muted-foreground">{dayjs(postedDate).format("DD-MM-YYYY")}</p>
          </div>
          <div className="flex items-center">
            <ClockIcon className="inline-block mr-2" width={20} height={20} />
            <p className="text-muted-foreground">{readingTime}</p>
          </div>
        </div>
        <CardAction>
          <Badge variant="secondary">Featured</Badge>
        </CardAction>
        <CardTitle className="text-3xl font-bold">{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
        {href && (
          <Link href={href} className={buttonVariants()} aria-label={`Đọc bài: ${title}`}>
            Đọc bài
          </Link>
        )}
      </CardHeader>
      <CardFooter className="flex-wrap gap-2 bg-background">
        {
          tags.length > 0 && tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-2 rounded-[4px] display-inline-block py-4 px-8">
              {tag}
            </Badge>
          ))
        }
      </CardFooter>
    </Card>
  )
};

export default HeroCardImage;
