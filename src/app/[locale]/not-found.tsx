import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type NotFoundProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleNotFound({ params }: NotFoundProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "Status" });

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-5 px-6 py-12">
      <p className="text-sm uppercase tracking-[0.3em] text-primary">404</p>
      <h1 className="font-[family-name:var(--font-display)] text-4xl font-semibold">{t("notFound")}</h1>
      <Button asChild className="rounded-full px-6">
        <Link href="/" locale={locale as Locale}>
          {t("backHome")}
        </Link>
      </Button>
    </div>
  );
}
