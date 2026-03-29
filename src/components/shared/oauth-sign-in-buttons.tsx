"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";

type OAuthSignInButtonsProps = {
  locale: Locale;
  githubEnabled: boolean;
  googleEnabled: boolean;
};

type CsrfResponse = {
  csrfToken: string;
};

export function OAuthSignInButtons({ locale, githubEnabled, googleEnabled }: OAuthSignInButtonsProps) {
  const [csrfToken, setCsrfToken] = useState("");
  const callbackUrl = useMemo(() => `/${locale}/modules`, [locale]);

  useEffect(() => {
    let cancelled = false;

    async function loadCsrfToken() {
      const response = await fetch("/api/auth/csrf", {
        cache: "no-store"
      });

      if (!response.ok) {
        return;
      }

      const data = (await response.json()) as CsrfResponse;

      if (!cancelled) {
        setCsrfToken(data.csrfToken);
      }
    }

    void loadCsrfToken();

    return () => {
      cancelled = true;
    };
  }, []);

  const ready = Boolean(csrfToken);

  return (
    <div className="mt-8 grid gap-3">
      <form action="/api/auth/signin/github" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-between rounded-2xl px-5 py-6"
          disabled={!githubEnabled || !ready}
        >
          <span className="flex items-center gap-2">
            <Github className="size-4" />
            Continue with GitHub
          </span>
          <span className="text-xs text-muted-foreground">{githubEnabled ? "Configured" : "Missing env"}</span>
        </Button>
      </form>

      <form action="/api/auth/signin/google" method="POST">
        <input type="hidden" name="csrfToken" value={csrfToken} />
        <input type="hidden" name="callbackUrl" value={callbackUrl} />
        <Button
          type="submit"
          variant="outline"
          className="w-full justify-between rounded-2xl px-5 py-6"
          disabled={!googleEnabled || !ready}
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
