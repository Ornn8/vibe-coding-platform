import { auth } from "@/auth";
import { availableAuthProviders } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { OAuthSignInButtons } from "@/components/shared/oauth-sign-in-buttons";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
};

export default async function LoginPage({ params }: LoginPageProps) {
  const { locale } = (await params) ?? { locale: "zh" };
  const session = await auth();

  if (session?.user) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-12">
        <div className="w-full rounded-[2rem] border border-border/70 bg-card/80 p-10 shadow-xl shadow-primary/5 backdrop-blur">
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Signed in</p>
          <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold">
            You are already signed in.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Continue to your learning dashboard or switch language from the header.
          </p>
          <Button asChild className="mt-6 rounded-full px-6">
            <Link href="/modules" locale={locale as Locale}>
              Go to modules
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl items-center px-6 py-12">
      <div className="w-full rounded-[2rem] border border-border/70 bg-card/80 p-10 shadow-xl shadow-primary/5 backdrop-blur">
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Auth</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl font-semibold">
          Sign in to access the learning workspace
        </h1>
        <p className="mt-3 text-muted-foreground">
          OAuth providers are configured through environment variables. If a provider is not ready yet, the button
          stays disabled so the project can still build safely.
        </p>

        <OAuthSignInButtons
          locale={locale as Locale}
          githubEnabled={availableAuthProviders.github}
          googleEnabled={availableAuthProviders.google}
        />
      </div>
    </div>
  );
}
