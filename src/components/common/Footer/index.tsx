import type { FC } from "react";
import SectionLayout from "@/components/common/SectionLayout";
import Image from "next/image";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <SectionLayout bg="bg-transparent">
      <footer className="w-full border-t border-border p-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Culyson. All rights reserved.
          </p>
          <Link href="/" className="text-lg font-semibold tracking-tight">
          <Image src="/logo.svg" alt="Culyson" width={200} height={80} />
        </Link>
          <p className="text-sm text-muted-foreground">
            Built with ❤️ by Mai Linh Dong.
          </p>
        </div>
      </footer>
    </SectionLayout>
  );
};

export default Footer;
