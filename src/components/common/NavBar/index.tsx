"use client";
import SectionLayout from "@/components/common/SectionLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Danh mục", href: "/categories" },
  { label: "Giới thiệu", href: "/about" },
  { label: "Liên hệ", href: "/contact" },
];

const isNavigationItemActive = (pathname: string, href: string) =>
  href === "/"
    ? pathname === "/"
    : pathname === href || pathname.startsWith(`${href}/`);

const NavBar = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full">
      <SectionLayout>
        <div className="mx-auto flex h-24 w-full items-center justify-between border-b border-border p-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <Image src="/logo.svg" alt="Culyson" width={200} height={80} />
          </Link>
          <nav aria-label="Primary navigation">
            <ul className="flex items-center gap-1">
              {navigationItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={
                      isNavigationItemActive(pathname, item.href)
                        ? "page"
                        : undefined
                    }
                    className={`inline-flex h-9 items-center rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                      isNavigationItemActive(pathname, item.href)
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SectionLayout>
    </header>
  );
};

export default NavBar;
