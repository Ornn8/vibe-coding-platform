import { cache } from "react";
import type { Prisma } from "@prisma/client";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { courseStructure } from "@/content/course-structure";
import type { Locale } from "@/i18n/routing";

type LocalizedText = {
  zh: string;
  en: string;
};

type LessonSummary = {
  id?: string;
  slug: string;
  order: number;
  title: string;
  description: string;
  completed: boolean;
  exercise?: {
    id?: string;
    title: string;
    description: string;
    submission?: {
      status: "DRAFT" | "SUBMITTED" | "REVIEWED" | "COMPLETED";
      text: string;
      links: string[];
    };
  };
};

type ModuleSummary = {
  id?: string;
  slug: string;
  order: number;
  tier: "CORE" | "ADVANCED";
  durationWeeks: number;
  title: string;
  description: string;
  lessonCount: number;
  completedLessons: number;
  lessons: LessonSummary[];
  project: {
    id?: string;
    exerciseId?: string;
    title: string;
    description: string;
    checklist: Array<{
      id?: string;
      label: string;
    }>;
    submission?: {
      id?: string;
      status: "DRAFT" | "SUBMITTED" | "REVIEWED" | "COMPLETED";
      text: string;
      links: string[];
      checkedItemIds: string[];
      reviewNote?: string;
    };
  };
};

type SubmissionContent = {
  text?: string;
  links?: string[];
  files?: string[];
};

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

function pickLocale(value: Prisma.JsonValue | null | undefined, locale: Locale) {
  const record = (value ?? {}) as LocalizedText;
  return record[locale] ?? record.zh ?? record.en ?? "";
}

function fromStatic(locale: Locale): ModuleSummary[] {
  return courseStructure.map((module) => ({
    slug: module.slug,
    order: module.order,
    tier: module.tier,
    durationWeeks: module.durationWeeks,
    title: module.title[locale],
    description: module.description[locale],
    lessonCount: module.lessons.length,
    completedLessons: 0,
    lessons: module.lessons.map((lesson) => ({
      slug: lesson.slug,
      order: lesson.order,
      title: lesson.title[locale],
      description: lesson.description[locale],
      completed: false,
      exercise: {
        title: lesson.exercise.title[locale],
        description: lesson.exercise.description[locale]
      }
    })),
    project: {
      id: module.slug,
      title: module.project.title[locale],
      description: module.project.description[locale],
      checklist: module.project.checklist.map((item, index) => ({
        id: `${module.slug}-check-${index + 1}`,
        label: item[locale]
      }))
    }
  }));
}

async function fromDatabase(locale: Locale, userId?: string) {
  const modules = await db.module.findMany({
    where: {
      deletedAt: null
    },
    orderBy: {
      order: "asc"
    },
    include: {
      lessons: {
        where: {
          deletedAt: null
        },
        orderBy: {
          order: "asc"
        },
        include: {
          exercises: {
            where: {
              deletedAt: null,
              type: "LESSON_EXERCISE"
            },
            orderBy: {
              order: "asc"
            },
            include: {
              submissions: {
                where: {
                  userId: userId ?? "__none__",
                  deletedAt: null
                }
              }
            }
          },
          progress: userId
            ? {
                where: {
                  userId
                }
              }
            : false
        }
      },
      project: {
        include: {
          exercise: {
            include: {
              checklistItems: {
                where: {
                  deletedAt: null
                },
                orderBy: {
                  order: "asc"
                }
              },
              submissions: {
                where: {
                  userId: userId ?? "__none__",
                  deletedAt: null
                },
                include: {
                  checklistStatuses: true
                }
              }
            }
          }
        }
      }
    }
  });

  return modules.map((module) => {
    const staticModule = courseStructure.find((candidate) => candidate.slug === module.slug);
    const sourceLessons = staticModule?.lessons ?? [];
    const lessons =
      sourceLessons.length > 0
        ? sourceLessons.map((staticLesson) => {
            const lesson =
              module.lessons.find((candidate) => candidate.slug === staticLesson.slug) ??
              module.lessons.find((candidate) => candidate.order === staticLesson.order);

            return {
              id: lesson?.id,
              slug: staticLesson.slug,
              order: staticLesson.order,
              title: staticLesson.title[locale],
              description: staticLesson.description[locale],
              completed: Array.isArray(lesson?.progress) ? lesson.progress.some((item) => item.completed) : false,
              exercise: {
                id: lesson?.exercises[0]?.id,
                title: staticLesson.exercise.title[locale],
                description: staticLesson.exercise.description[locale],
                submission: Array.isArray(lesson?.exercises[0]?.submissions) && lesson?.exercises[0]?.submissions[0]
                  ? {
                      status: lesson.exercises[0].submissions[0].status,
                      text: ((lesson.exercises[0].submissions[0].content as SubmissionContent).text ?? ""),
                      links: ((lesson.exercises[0].submissions[0].content as SubmissionContent).links ?? [])
                    }
                  : undefined
              }
            };
          })
        : module.lessons.map((lesson) => ({
            id: lesson.id,
            slug: lesson.slug,
            order: lesson.order,
            title: pickLocale(lesson.title, locale),
            description: pickLocale(lesson.description, locale),
            completed: Array.isArray(lesson.progress) ? lesson.progress.some((item) => item.completed) : false,
            exercise: lesson.exercises[0]
              ? {
                  id: lesson.exercises[0].id,
                  title: pickLocale(lesson.exercises[0].title, locale),
                  description: pickLocale(lesson.exercises[0].description, locale),
                  submission: Array.isArray(lesson.exercises[0].submissions) && lesson.exercises[0].submissions[0]
                    ? {
                        status: lesson.exercises[0].submissions[0].status,
                        text: ((lesson.exercises[0].submissions[0].content as SubmissionContent).text ?? ""),
                        links: ((lesson.exercises[0].submissions[0].content as SubmissionContent).links ?? [])
                      }
                    : undefined
                }
              : undefined
          }));

    const projectSubmission =
      module.project?.exercise && Array.isArray(module.project.exercise.submissions)
        ? module.project.exercise.submissions[0]
        : null;

    return {
      id: module.id,
      slug: module.slug,
      order: module.order,
      tier: module.tier,
      durationWeeks: module.durationWeeks,
      title: staticModule?.title[locale] ?? pickLocale(module.title, locale),
      description: staticModule?.description[locale] ?? pickLocale(module.description, locale),
      lessonCount: lessons.length,
      completedLessons: lessons.filter((lesson) => lesson.completed).length,
      lessons,
      project: {
        id: module.project?.id,
        exerciseId: module.project?.exerciseId,
        title: staticModule?.project.title[locale] ?? (module.project ? pickLocale(module.project.title, locale) : ""),
        description:
          staticModule?.project.description[locale] ??
          (module.project ? pickLocale(module.project.description, locale) : ""),
        checklist: staticModule
          ? staticModule.project.checklist.map((item, index) => ({
              id: module.project?.exercise?.checklistItems[index]?.id ?? `${module.slug}-check-${index + 1}`,
              label: item[locale]
            }))
          : module.project?.exercise
            ? module.project.exercise.checklistItems.map((item) => ({
                id: item.id,
                label: pickLocale(item.label, locale)
              }))
            : [],
        submission: projectSubmission
          ? {
              id: projectSubmission.id,
              status: projectSubmission.status,
              text: ((projectSubmission.content as SubmissionContent).text ?? ""),
              links: ((projectSubmission.content as SubmissionContent).links ?? []),
              checkedItemIds: projectSubmission.checklistStatuses
                .filter((item) => item.checked)
                .map((item) => item.checklistItemId),
              reviewNote: projectSubmission.reviewNote ?? undefined
            }
          : undefined
      }
    } satisfies ModuleSummary;
  });
}

export const getLearningModules = cache(async (locale: Locale, userId?: string) => {
  try {
    return await fromDatabase(locale, userId);
  } catch {
    return fromStatic(locale);
  }
});

export async function getCurrentUserId() {
  const session = await auth();
  return session?.user?.id;
}

export async function getModuleBySlug(locale: Locale, moduleSlug: string, userId?: string) {
  const modules = await getLearningModules(locale, userId);
  return modules.find((module) => module.slug === moduleSlug) ?? null;
}

export async function getLessonBySlug(
  locale: Locale,
  moduleSlug: string,
  lessonSlug: string,
  userId?: string
) {
  const learningModule = await getModuleBySlug(locale, moduleSlug, userId);

  if (!learningModule) {
    return null;
  }

  const currentIndex = learningModule.lessons.findIndex((lesson) => lesson.slug === lessonSlug);

  if (currentIndex === -1) {
    return null;
  }

  return {
    module: learningModule,
    lesson: learningModule.lessons[currentIndex],
    previousLesson: currentIndex > 0 ? learningModule.lessons[currentIndex - 1] : null,
    nextLesson:
      currentIndex < learningModule.lessons.length - 1 ? learningModule.lessons[currentIndex + 1] : null
  };
}

export function getCanonicalLessonSlug(moduleSlug: string, lessonSlug: string) {
  return legacyLessonSlugMap[moduleSlug]?.[lessonSlug] ?? lessonSlug;
}

export async function ensureDailyActivity(userId: string) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  try {
    await db.dailyActiveLog.upsert({
      where: {
        userId_date: {
          userId,
          date: today
        }
      },
      update: {},
      create: {
        userId,
        date: today
      }
    });

    await db.user.update({
      where: {
        id: userId
      },
      data: {
        lastActiveAt: new Date()
      }
    });
  } catch {
    return;
  }
}

function calculateStreak(dates: Date[]) {
  if (dates.length === 0) {
    return 0;
  }

  const normalized = dates
    .map((date) => {
      const value = new Date(date);
      value.setHours(0, 0, 0, 0);
      return value.getTime();
    })
    .sort((a, b) => b - a);

  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const value of normalized) {
    if (value === cursor.getTime()) {
      streak += 1;
      cursor = new Date(cursor.getTime() - 86_400_000);
      continue;
    }

    if (value === cursor.getTime() - 86_400_000 && streak === 0) {
      streak = 1;
      cursor = new Date(value - 86_400_000);
      continue;
    }

    break;
  }

  return streak;
}

export async function getLearnerProfile(locale: Locale, userId: string) {
  const modules = await getLearningModules(locale, userId);
  const totalLessons = modules.reduce((sum, module) => sum + module.lessonCount, 0);
  const completedLessons = modules.reduce((sum, module) => sum + module.completedLessons, 0);
  const completedModules = modules.filter((module) => module.completedLessons === module.lessonCount).length;

  try {
    const [logs, promptTemplates] = await Promise.all([
      db.dailyActiveLog.findMany({
        where: { userId },
        orderBy: { date: "desc" },
        take: 30
      }),
      db.promptTemplate.findMany({
        where: {
          userId,
          deletedAt: null
        },
        orderBy: {
          updatedAt: "desc"
        }
      })
    ]);

    return {
      modules,
      totalLessons,
      completedLessons,
      completedModules,
      streakDays: calculateStreak(logs.map((log) => log.date)),
      recentActivity: logs,
      promptTemplates
    };
  } catch {
    return {
      modules,
      totalLessons,
      completedLessons,
      completedModules,
      streakDays: 0,
      recentActivity: [],
      promptTemplates: []
    };
  }
}

export async function getProjectsOverview(locale: Locale, userId?: string) {
  const modules = await getLearningModules(locale, userId);

  return modules.map((module) => ({
    moduleSlug: module.slug,
    moduleTitle: module.title,
    tier: module.tier,
    projectId: module.project.id ?? module.slug,
    projectTitle: module.project.title,
    projectDescription: module.project.description,
    status: module.project.submission?.status ?? "DRAFT",
    checkedCount: module.project.submission?.checkedItemIds.length ?? 0,
    checklistCount: module.project.checklist.length
  }));
}

export async function getProjectById(locale: Locale, projectId: string, userId?: string) {
  const modules = await getLearningModules(locale, userId);

  return (
    modules.find((module) => module.project.id === projectId || module.slug === projectId || module.project.exerciseId === projectId) ??
    null
  );
}
