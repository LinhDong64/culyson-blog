import type { Metadata } from "next";
import { Clock3, Mail } from "lucide-react";
import SectionLayout from "@/components/common/SectionLayout";
import ContactForm from "@/features/contact";

export const metadata: Metadata = {
  title: "Liên hệ | Culyson",
  description:
    "Gửi lời nhắn và kết nối với Culyson. Mình rất vui khi nhận được tin nhắn từ bạn.",
};

const Contact = () => {
  return (
    <article lang="vi">
      <SectionLayout>
        <div className="mx-auto max-w-5xl px-6 pb-16 pt-14 sm:pb-24 sm:pt-20">
          <header className="mb-12 text-center sm:mb-16">
            <h1 className="font-heading text-4xl font-bold leading-tight sm:text-5xl">
              Liên hệ
            </h1>
            <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
              Mình rất vui khi nhận được tin nhắn từ bạn.
            </p>
          </header>

          <div className="grid gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-16">
            <ContactForm />

            <aside aria-label="Thông tin liên hệ" className="space-y-9 border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
              <section aria-labelledby="contact-email">
                <h2 id="contact-email" className="mb-3 flex items-center gap-3 font-heading text-xl font-bold">
                  <Mail size={19} strokeWidth={1.5} aria-hidden="true" className="text-muted-foreground" />
                  Email
                </h2>
                <a href="mailto:mailinhdong@gmail.com" className="break-all text-sm leading-7 text-muted-foreground underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                  mailinhdong@gmail.com
                </a>
              </section>

              <section aria-labelledby="contact-social">
                <h2 id="contact-social" className="mb-3 font-heading text-xl font-bold">
                  Kết nối
                </h2>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-7 text-muted-foreground">
                  <a href="https://www.facebook.com/mai.linh.ong.2024/" target="_blank" rel="noopener noreferrer" aria-label="Facebook (mở trong tab mới)" className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    Facebook
                  </a>
                  <span aria-hidden="true">·</span>
                  <a href="https://www.instagram.com/mailinhdong/" target="_blank" rel="noopener noreferrer" aria-label="Instagram (mở trong tab mới)" className="underline decoration-border underline-offset-4 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
                    Instagram
                  </a>
                </div>
              </section>

              <section aria-labelledby="contact-response">
                <h2 id="contact-response" className="mb-3 flex items-center gap-3 font-heading text-xl font-bold">
                  <Clock3 size={19} strokeWidth={1.5} aria-hidden="true" className="text-muted-foreground" />
                  Thời gian phản hồi
                </h2>
                <p className="text-sm leading-7 text-muted-foreground">
                  Thường trong 1-2 ngày
                </p>
              </section>
            </aside>
          </div>
        </div>
      </SectionLayout>
    </article>
  );
};

export default Contact;