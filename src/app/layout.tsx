import type { Metadata } from "next";
import { headers } from "next/headers";
import { Noto_Sans_SC, Space_Grotesk } from "next/font/google";
import "./globals.css";

const notoSansSc = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "700"]
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "700"]
});

export const metadata: Metadata = {
  title: "Vibe Coding Learning Platform",
  description: "A free and open-source platform for systematic Vibe Coding education."
};

export const dynamic = "force-dynamic";

type RootLayoutProps = {
  children: React.ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const requestHeaders = await headers();
  const requestLocale = requestHeaders.get("x-current-locale");
  const lang = requestLocale === "en" ? "en" : "zh";

  return (
    <html suppressHydrationWarning lang={lang}>
      <body className={`${notoSansSc.variable} ${spaceGrotesk.variable} min-h-screen font-[family-name:var(--font-body)]`}>
        {children}
      </body>
    </html>
  );
}
