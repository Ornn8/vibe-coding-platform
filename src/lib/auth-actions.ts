"use server";

import { signIn, signOut } from "@/auth";
import type { Locale } from "@/i18n/routing";

export async function signInWithProvider(provider: "github" | "google", locale: Locale) {
  await signIn(provider, {
    redirectTo: `/${locale}/modules`
  });
}

export async function signOutUser(locale: Locale) {
  await signOut({
    redirectTo: `/${locale}`
  });
}
