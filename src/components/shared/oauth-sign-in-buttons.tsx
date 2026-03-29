import { Github, Mail } from "lucide-react";
import { signInWithProvider } from "@/lib/auth-actions";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type OAuthSignInButtonsProps = {
  locale: Locale;
  githubEnabled: boolean;
  googleEnabled: boolean;
};

export function OAuthSignInButtons({ locale, githubEnabled, googleEnabled }: OAuthSignInButtonsProps) {
  return (
    <div className="mt-8 grid gap-3">
      <form
        action={async () => {
          "use server";
          await signInWithProvider("github", locale);
        }}
      >
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-between rounded-2xl px-5 py-6"
          disabled={!githubEnabled}
        >
          <span className="flex items-center gap-2">
            <Github className="size-4" />
            Continue with GitHub
          </span>
          <span className="text-xs text-muted-foreground">{githubEnabled ? "Configured" : "Missing env"}</span>
        </Button>
      </form>

      <form
        action={async () => {
          "use server";
          await signInWithProvider("google", locale);
        }}
      >
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-between rounded-2xl px-5 py-6"
          disabled={!googleEnabled}
        >
          <span className="flex items-center gap-2">
            <Mail className="size-4" />
            Continue with Google
          </span>
          <span className="text-xs text-muted-foreground">{googleEnabled ? "Configured" : "Missing env"}</span>
        </Button>
      </form>
    </div>
  );
}
