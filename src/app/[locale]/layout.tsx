import { NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { LocaleSwitcher } from "@/components/shared/locale-switcher";
import { Navbar } from "@/components/shared/navbar";
import { Providers } from "@/components/shared/providers";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { getLocaleMessages } from "@/i18n/messages";
import { Link } from "@/i18n/navigation";
import { isLocale, routing, type Locale } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = (await params) ?? { locale: routing.defaultLocale };

  if (!isLocale(locale)) {
    notFound();
  }

  const messages = await getLocaleMessages(locale);
  const t = await getTranslations({ locale, namespace: "Layout" });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <div className="relative min-h-screen overflow-hidden">
          <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-primary/10 to-transparent" />
          <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-5">
            <Link href="/" locale={locale as Locale} className="flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                VC
              </div>
              <div>
                <p className="font-[family-name:var(--font-display)] text-lg font-semibold">Vibe Coding</p>
                <p className="text-sm text-muted-foreground">{t("brandTagline")}</p>
              </div>
            </Link>

            <div className="flex items-center gap-3">
              <LocaleSwitcher />
              <ThemeToggle />
              <Navbar locale={locale} />
            </div>
          </header>

          <main>{children}</main>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
