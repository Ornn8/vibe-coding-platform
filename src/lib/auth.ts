import { PrismaAdapter } from "@auth/prisma-adapter";
import type { UserRole } from "@prisma/client";
import type { Session, User } from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { db } from "@/lib/db";

const githubConfigured = Boolean(process.env.AUTH_GITHUB_ID && process.env.AUTH_GITHUB_SECRET);
const googleConfigured = Boolean(process.env.AUTH_GOOGLE_ID && process.env.AUTH_GOOGLE_SECRET);

const providers = [];

if (githubConfigured) {
  providers.push(
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? ""
    })
  );
}

if (googleConfigured) {
  providers.push(
    Google({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? ""
    })
  );
}

export const availableAuthProviders = {
  github: githubConfigured,
  google: googleConfigured
} as const;

export const authConfig = {
  adapter: PrismaAdapter(db),
  secret: process.env.AUTH_SECRET ?? "development-auth-secret",
  session: {
    strategy: "database" as const
  },
  trustHost: true,
  providers,
  callbacks: {
    session({ session, user }: { session: Session; user: User }) {
      const dbUser = user as User & {
        id: string;
        role?: UserRole;
        locale?: string;
      };

      if (session.user) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role ?? "STUDENT";
        session.user.locale = dbUser.locale ?? "zh";
      }

      return session;
    }
  }
};
