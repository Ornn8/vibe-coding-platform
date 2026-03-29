"use client";

import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="inline-flex rounded-full border border-border/80 bg-background/80 p-1 backdrop-blur">
      {routing.locales.map((nextLocale) => {
        const isActive = nextLocale === locale;

        return (
          <Button
            key={nextLocale}
            type="button"
            variant={isActive ? "default" : "ghost"}
            size="sm"
            className="rounded-full"
            onClick={() => router.replace(pathname, { locale: nextLocale })}
          >
            {t(nextLocale)}
          </Button>
        );
      })}
    </div>
  );
}
