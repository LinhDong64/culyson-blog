"use client";
import { Moon, Sun } from "lucide-react";
import SectionLayout from "@/components/common/SectionLayout";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useSyncExternalStore } from "react";

const subscribeToTheme = (onThemeChange: () => void) => {
  window.addEventListener("themechange", onThemeChange);
  return () => window.removeEventListener("themechange", onThemeChange);
};

const getThemeSnapshot = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("dark");

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
  const isDarkMode = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => false,
  );

  useEffect(() => {
    const isSavedDarkMode = window.localStorage.getItem("theme") === "dark";
    document.documentElement.classList.toggle("dark", isSavedDarkMode);
    window.dispatchEvent(new Event("themechange"));
  }, []);

  const toggleTheme = () => {
    const nextIsDarkMode = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", nextIsDarkMode);
    window.localStorage.setItem("theme", nextIsDarkMode ? "dark" : "light");
    window.dispatchEvent(new Event("themechange"));
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <SectionLayout>
        <div className="mx-auto flex h-24 w-full items-center justify-between border-b border-border p-4">
          <Link href="/" className="text-lg font-semibold tracking-tight">
            <Image src="/logo.svg" alt="Culyson" width={200} height={80} className="dark:brightness-0 dark:invert" />
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
                        : "text-muted-foreground hover:bg-muted/70 hover:text-foreground dark:text-zinc-300 dark:hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                  title={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
                  className="cursor-pointer inline-flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring dark:text-zinc-300 dark:hover:text-white"
                >
                  {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </SectionLayout>
    </header>
  );
};

export default NavBar;
