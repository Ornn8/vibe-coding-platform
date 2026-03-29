import { getTranslations } from "next-intl/server";

type LocaleLoadingProps = {
  params: Promise<{ locale: string }>;
};

export default async function LocaleLoading({ params }: LocaleLoadingProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const t = await getTranslations({ locale, namespace: "Status" });

  return (
    <div className="mx-auto flex min-h-[50vh] max-w-7xl items-center px-6 py-12">
      <div className="rounded-[1.75rem] border border-border/70 bg-card/80 px-6 py-5 text-muted-foreground shadow-lg shadow-primary/5">
        {t("loading")}
      </div>
    </div>
  );
}
