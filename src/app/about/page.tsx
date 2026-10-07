import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, BookOpen, Code2, Coffee, PenLine } from "lucide-react";
import SectionLayout from "@/components/common/SectionLayout";

export const metadata: Metadata = {
  title: "Giới thiệu | Culyson",
  description:
    "Một chút về Culyson, lý do mình viết blog và những câu chuyện về công nghệ, học hỏi và cuộc sống.",
};

const interests = [
  { icon: Code2, title: "Công nghệ", description: "Hiểu cách mọi thứ hoạt động, từ những dòng code đến các công cụ hằng ngày." },
  { icon: BookOpen, title: "Học hỏi", description: "Một cuốn sách, một ý tưởng mới, một góc nhìn khác để suy ngẫm." },
  { icon: Coffee, title: "Cuộc sống", description: "Những điều bình dị và những khoảng dừng giữa một ngày bận rộn." },
];

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com", icon: "/icons/icon-facebook.png" },
  { name: "Instagram", href: "https://instagram.com", icon: "/icons/icon-instagram.png" },
];

const About = () => {
  return (
    <article lang="vi">
      <SectionLayout>
        <header className="mx-auto flex max-w-3xl flex-col items-center px-6 pb-16 pt-14 text-center sm:pb-20 sm:pt-20">
          <div className="mb-7 flex size-44 items-center justify-center overflow-hidden rounded-full border border-border bg-muted sm:size-48">
            <Image
              src="/logo.svg"
              alt="Ảnh đại diện Culyson"
              width={160}
              height={80}
              loading="eager"
              className="h-auto w-40 dark:brightness-0 dark:invert"
            />
          </div>
          <p className="mb-3 text-sm text-muted-foreground">Xin chào, mình là</p>
          <h1 className="font-heading text-6xl font-bold leading-tight sm:text-7xl">Culyson</h1>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            Một người thích học hỏi, viết lách và lưu lại những điều đáng nhớ.
            Đây là góc nhỏ của mình trên Internet.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <span className="text-sm text-muted-foreground">Theo dõi mình</span>
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${social.name} (mở trong tab mới)`}
                title={social.name}
                className="inline-flex size-11 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                <Image src={social.icon} alt="" width={22} height={22} className="grayscale transition-all hover:grayscale-0 dark:brightness-0 dark:invert" />
              </a>
            ))}
          </div>
        </header>
      </SectionLayout>

      <SectionLayout bg="bg-transparent">
        <div className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          <div className="mb-6 flex items-center gap-3 text-muted-foreground">
            <PenLine size={18} aria-hidden="true" />
            <p className="text-sm">Vài dòng về mình</p>
          </div>
          <h2 className="mb-7 font-heading text-3xl font-bold leading-snug sm:text-4xl">
            Viết để nhớ. Chia sẻ để kết nối.
          </h2>
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Mình là Mai Linh Dong, bạn cũng có thể gọi mình là Culyson.
              Mình muốn dành nơi này cho những điều đã học được, những câu hỏi
              còn đang tìm lời giải và những câu chuyện nhỏ trong cuộc sống.
            </p>
            <p>
              Không phải lúc nào một ý tưởng cũng rõ ràng ngay từ đầu. Đôi khi,
              chỉ khi ngồi xuống và viết, mình mới hiểu điều mình đang nghĩ.
              Blog này là nơi để những suy nghĩ ấy có thêm thời gian và không gian.
            </p>
          </div>

          <section aria-labelledby="why-write" className="mt-12">
            <h2 id="why-write" className="mb-5 font-heading text-2xl font-bold sm:text-3xl">Tại sao mình viết blog?</h2>
            <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
              <p>
                Vì trí nhớ có hạn, còn những điều đáng lưu lại thì rất nhiều.
                Mình viết để sắp xếp kiến thức, ghi lại một trải nghiệm và giữ
                lại những góc nhìn có thể thay đổi theo thời gian.
              </p>
              <p>
                Mình không muốn đợi đến khi biết hết mọi thứ mới chia sẻ.
                Một bài viết có thể bắt đầu từ một điều rất nhỏ. Nếu nó giúp
                bạn có thêm một ý tưởng, hoặc đơn giản là cảm thấy đồng cảm,
                thì việc viết đã có ý nghĩa rồi.
              </p>
            </div>
          </section>
        </div>

        <figure className="mx-auto max-w-5xl px-6">
          <Image
            src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85"
            alt="Sổ tay, máy tính và tách cà phê trên bàn làm việc"
            width={1600}
            height={1000}
            unoptimized
            className="aspect-4/3 w-full rounded-lg object-cover sm:aspect-video"
          />
          <figcaption className="mt-4 text-center text-sm leading-6 text-muted-foreground">
            Một khoảng yên tĩnh cho những ý tưởng thành lời.
          </figcaption>
        </figure>

        <section aria-labelledby="about-life" className="mx-auto max-w-3xl px-6 py-14 sm:py-20">
          <h2 id="about-life" className="mb-5 font-heading text-2xl font-bold sm:text-3xl">Ngoài những dòng chữ</h2>
          <div className="space-y-5 text-base leading-8 text-muted-foreground sm:text-lg">
            <p>
              Mình nghĩ việc học không chỉ diễn ra trước màn hình. Một cuộc trò
              chuyện, một trang sách hay một lần thử làm điều mới đều có thể
              mang đến một góc nhìn khác.
            </p>
            <p>
              Vì thế, ở đây sẽ không chỉ có những bài viết về công nghệ.
              Mình cũng muốn dành chỗ cho những suy ngẫm đời thường, những
              điều khiến mình tò mò và cả những bài học từ việc làm chưa tốt.
            </p>
            <p>Cảm ơn bạn đã ghé qua. Hy vọng bạn tìm được một điều gì đó đáng mang theo.</p>
          </div>
        </section>
      </SectionLayout>

      <SectionLayout>
        <section aria-labelledby="interests" className="px-6 py-14 sm:py-16">
          <h2 id="interests" className="mb-10 text-center font-heading text-3xl font-bold">Những điều mình quan tâm</h2>
          <div className="grid gap-8 sm:grid-cols-3 sm:gap-10">
            {interests.map(({ icon: Icon, title, description }) => (
              <div key={title} className="border-t border-border pt-6">
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" className="mb-4 text-muted-foreground" />
                <h3 className="mb-3 font-heading text-xl font-bold">{title}</h3>
                <p className="text-sm leading-7 text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-8 text-center">
            <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium underline decoration-border underline-offset-8 transition-colors hover:text-muted-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              Khám phá những bài viết <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </SectionLayout>
    </article>
  );
};

export default About;