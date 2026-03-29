import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const session = await auth();

  if (!session?.user) {
    return redirect(`/${locale}/login`);
  }

  if (session.user.role !== "ADMIN") {
    return redirect(`/${locale}/modules`);
  }

  return (
    <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 pb-12 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="h-fit rounded-[1.75rem] border border-border/70 bg-card/85 p-5 shadow-lg shadow-primary/5 lg:sticky lg:top-24">
        <p className="text-sm uppercase tracking-[0.28em] text-primary">管理后台</p>
        <div className="mt-4 rounded-2xl border border-border/70 bg-background px-4 py-3">
          <p className="text-sm font-medium text-foreground">{session.user.name ?? session.user.email}</p>
          <p className="mt-1 text-xs text-muted-foreground">{session.user.role}</p>
        </div>

        <nav className="mt-6 grid gap-2">
          <Link
            href="/dashboard"
            locale={locale as Locale}
            className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            数据总览
          </Link>
          <Link
            href="/content"
            locale={locale as Locale}
            className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            内容管理
          </Link>
          <Link
            href="/users"
            locale={locale as Locale}
            className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            用户管理
          </Link>
          <Link
            href="/reviews"
            locale={locale as Locale}
            className="rounded-2xl border border-border/70 px-4 py-3 text-sm transition hover:border-primary/40 hover:bg-primary/5"
          >
            项目评审
          </Link>
        </nav>
      </aside>

      <div>{children}</div>
    </div>
  );
}
