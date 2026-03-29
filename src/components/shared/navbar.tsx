import { auth } from "@/auth";
import { getTranslations } from "next-intl/server";
import { signOutUser } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type NavbarProps = {
  locale: Locale;
};

export async function Navbar({ locale }: NavbarProps) {
  const session = await auth();
  const t = await getTranslations({ locale, namespace: "Navbar" });

  return (
    <div className="flex items-center gap-3">
      <Button asChild variant="ghost" className="rounded-full px-4">
        <Link href="/tools" locale={locale}>
          {t("tools")}
        </Link>
      </Button>
      {session?.user ? (
        <>
          <div className="hidden rounded-full border border-border/70 bg-background/80 px-4 py-2 text-sm text-muted-foreground md:block">
            <span className="font-medium text-foreground">{session.user.name ?? session.user.email}</span>
            <span className="ml-2 rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
              {session.user.role}
            </span>
          </div>
          <form
            action={async () => {
              "use server";
              await signOutUser(locale);
            }}
          >
            <Button type="submit" variant="outline" className="rounded-full">
              {t("signOut")}
            </Button>
          </form>
        </>
      ) : (
        <Button asChild className="rounded-full px-5">
          <Link href="/login" locale={locale}>
            {t("logIn")}
          </Link>
        </Button>
      )}
    </div>
  );
}
