// import Image from "next/image"
import { FC } from "react"
import dayjs from "dayjs"
import { Badge } from "@/components/ui/badge"
import { CalendarDaysIcon, ClockIcon } from "lucide-react";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";

type HeroCardImageProps = {
  postedDate: string;
  readingTime: string;
  image: string;
  title: string;
  description: string;
  tags: string[];
};
const HeroCardImage: FC<HeroCardImageProps> = ({ postedDate, readingTime, image, title, description, tags }) => {
  return (
    <Card className="relative mx-auto w-full p-4">
      <div className="relative z-20 aspect-16/7 w-full bg-gray-300" />
      {/* <Image
        src={image}
        alt="Event cover"
        className="relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
        width="640"
        height="360"
      /> */}
      <CardHeader>
        <div className="flex gap-8 mb-4">
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
        <Button className="cursor-pointer">Read More</Button>
      </CardHeader>
      <CardFooter className="bg-white">
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
