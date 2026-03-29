import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const legacyLessonSlugMap: Record<string, Record<string, string>> = {
  m1: {
    "1.1-vibe-coding-history": "1.1-what-is-vibe-coding",
    "1.2-core-concepts": "1.2-tool-landscape",
    "1.3-tool-landscape": "1.3-first-ai-webpage",
    "1.4-hello-world": "1.4-module-project"
  },
  m2: {
    "2.1-soul-questions": "2.1-why-vibe-projects-crash",
    "2.2-mvp-thinking": "2.2-soul-questions",
    "2.3-user-journey": "2.3-mvp-and-prioritization",
    "2.4-anti-patterns": "2.4-user-journey-and-requirements"
  },
  m3: {
    "3.1-context-is-king": "3.1-context-determines-everything",
    "3.2-prompt-four-elements": "3.2-four-elements-role-task",
    "3.3-system-prompts": "3.3-four-elements-constraints-format",
    "3.4-prompt-templates": "3.4-system-prompts-and-claude-md",
    "3.5-anti-patterns": "3.5-prompt-anti-patterns-and-portfolio"
  },
  m4: {
    "4.1-why-plan-matters": "4.1-prd-and-implementation-plan",
    "4.2-prd-writing": "4.2-pev-and-ask-plan",
    "4.3-implementation-plan": "4.3-claude-code-getting-started",
    "4.4-pev-loop": "4.4-crud-with-claude-code",
    "4.5-ask-plan-mode": "4.5-methodology-review-and-project",
    "4.6-claude-code-intro": "4.5-methodology-review-and-project"
  }
};

export default function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/").filter(Boolean);

  if (segments.length === 4 && segments[1] === "modules") {
    const [locale, , moduleSlug, lessonSlug] = segments;
    const canonicalLessonSlug = legacyLessonSlugMap[moduleSlug]?.[lessonSlug];

    if (canonicalLessonSlug) {
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/modules/${moduleSlug}/${canonicalLessonSlug}`;
      return NextResponse.redirect(url, 307);
    }
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/", "/(zh|en)/:path*"]
};
