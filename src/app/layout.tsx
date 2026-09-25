import type { Metadata } from "next";
import { Geist_Mono, Lexend, PT_Serif } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/common/NavBar";
import SiteFooter from "@/components/common/Footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const ptSerif = PT_Serif({
  variable: "--font-pt-serif",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Culyson blog",
  description: "Personal blog of Mai Linh Dong",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistMono.variable} ${lexend.variable} ${ptSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
         <NavBar />
        <main className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
          <div className="w-full h-full flex-1 ">{children}</div>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
