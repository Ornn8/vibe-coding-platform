"use client";

import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

type LocaleErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function LocaleError({ error, reset }: LocaleErrorProps) {
  const t = useTranslations("Status");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-5 px-6 py-12">
      <p className="text-sm uppercase tracking-[0.3em] text-primary">Error</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">{t("error")}</h1>
      <Button type="button" className="rounded-full px-6" onClick={reset}>
        {t("tryAgain")}
      </Button>
    </div>
  );
}
