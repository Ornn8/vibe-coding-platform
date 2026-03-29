import { UserRole } from "@prisma/client";
import { db } from "@/lib/db";
import { courseStructure } from "@/content/course-structure";

type DashboardStat = {
  label: string;
  value: number;
};

type DashboardModuleFunnel = {
  moduleSlug: string;
  moduleTitle: string;
  startedCount: number;
  completedCount: number;
};

type DashboardUserTrend = {
  date: string;
  count: number;
};

type AdminDashboardData = {
  stats: DashboardStat[];
  funnel: DashboardModuleFunnel[];
  activity: DashboardUserTrend[];
};

type AdminModuleListItem = {
  id?: string;
  slug: string;
  order: number;
  tier: "CORE" | "ADVANCED";
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  durationWeeks: number;
  lessonCount: number;
};

type CreateModuleInput = {
  slug: string;
  order: number;
  tier: "CORE" | "ADVANCED";
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  durationWeeks: number;
};

type CreateLessonInput = {
  moduleId: string;
  slug: string;
  order: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
};

type AdminLessonListItem = {
  id?: string;
  slug: string;
  order: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  exercises: Array<{
    id?: string;
    titleZh: string;
    titleEn: string;
    descriptionZh: string;
    descriptionEn: string;
  }>;
};

type AdminModuleDetail = {
  module: AdminModuleListItem;
  lessons: AdminLessonListItem[];
  projectChecklist: Array<{
    id?: string;
    labelZh: string;
    labelEn: string;
  }>;
};

type AdminUserListItem = {
  id: string;
  name: string;
  email: string;
  role: "STUDENT" | "ADMIN";
  createdAt: Date;
  lastActiveAt: Date | null;
  completedLessons: number;
  completedModules: number;
};

type AdminReviewItem = {
  submissionId: string;
  status: "DRAFT" | "SUBMITTED" | "REVIEWED" | "COMPLETED";
  reviewNote: string;
  reviewedAt: Date | null;
  learnerName: string;
  learnerEmail: string;
  moduleSlug: string;
  moduleTitle: string;
  projectTitle: string;
  contentText: string;
  contentLinks: string[];
  checklist: Array<{
    label: string;
    checked: boolean;
  }>;
  createdAt: Date;
};

function jsonToLocaleStrings(value: unknown) {
  const record = (value ?? {}) as { zh?: string; en?: string };

  return {
    zh: record.zh ?? "",
    en: record.en ?? ""
  };
}

function fallbackModules(): AdminModuleListItem[] {
  return courseStructure.map((module) => ({
    slug: module.slug,
    order: module.order,
    tier: module.tier,
    titleZh: module.title.zh,
    titleEn: module.title.en,
    descriptionZh: module.description.zh,
    descriptionEn: module.description.en,
    durationWeeks: module.durationWeeks,
    lessonCount: module.lessons.length
  }));
}

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  try {
    const [userCount, submissionsCount, users, modules, logs] = await Promise.all([
      db.user.count({ where: { deletedAt: null } }),
      db.submission.count({ where: { deletedAt: null } }),
      db.user.findMany({
        where: { deletedAt: null },
        include: {
          lessonProgress: {
            where: {
              completed: true
            }
          }
        }
      }),
      db.module.findMany({
        where: { deletedAt: null },
        orderBy: { order: "asc" },
        include: {
          lessons: {
            where: { deletedAt: null },
            include: {
              progress: {
                where: {
                  completed: true
                }
              }
            }
          }
        }
      }),
      db.dailyActiveLog.findMany({
        orderBy: { date: "desc" },
        take: 30
      })
    ]);

    const activeUsersThisMonth = logs
      .filter((item) => {
        const now = new Date();
        return item.date.getUTCFullYear() === now.getUTCFullYear() && item.date.getUTCMonth() === now.getUTCMonth();
      })
      .map((item) => item.userId);

    const totalLessons = modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const averageCompletionRate =
      users.length === 0 || totalLessons === 0
        ? 0
        : Math.round(
            users.reduce((sum, user) => sum + Math.min(user.lessonProgress.length / totalLessons, 1), 0) /
              users.length *
              100
          );

    const activityMap = new Map<string, number>();
    for (const item of logs) {
      const key = item.date.toISOString().slice(0, 10);
      activityMap.set(key, (activityMap.get(key) ?? 0) + 1);
    }

    return {
      stats: [
        { label: "注册用户", value: userCount },
        { label: "本月活跃", value: new Set(activeUsersThisMonth).size },
        { label: "平均完课率", value: averageCompletionRate },
        { label: "总提交数", value: submissionsCount }
      ],
      funnel: modules.map((module) => ({
        moduleSlug: module.slug,
        moduleTitle: jsonToLocaleStrings(module.title).zh || module.slug,
        startedCount: new Set(module.lessons.flatMap((lesson) => lesson.progress.map((item) => item.userId))).size,
        completedCount: users.filter((user) => {
          const completedLessonIds = new Set(user.lessonProgress.map((item) => item.lessonId));
          return module.lessons.every((lesson) => completedLessonIds.has(lesson.id));
        }).length
      })),
      activity: [...activityMap.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([date, count]) => ({ date, count }))
    };
  } catch {
    return {
      stats: [
        { label: "注册用户", value: 0 },
        { label: "本月活跃", value: 0 },
        { label: "平均完课率", value: 0 },
        { label: "总提交数", value: 0 }
      ],
      funnel: fallbackModules().map((module) => ({
        moduleSlug: module.slug,
        moduleTitle: module.titleZh,
        startedCount: 0,
        completedCount: 0
      })),
      activity: []
    };
  }
}

export async function getAdminModules() {
  try {
    const modules = await db.module.findMany({
      where: { deletedAt: null },
      orderBy: { order: "asc" },
      include: {
        lessons: {
          where: { deletedAt: null }
        }
      }
    });

    return modules.map((module) => {
      const title = jsonToLocaleStrings(module.title);
      const description = jsonToLocaleStrings(module.description);

      return {
        id: module.id,
        slug: module.slug,
        order: module.order,
        tier: module.tier,
        titleZh: title.zh,
        titleEn: title.en,
        descriptionZh: description.zh,
        descriptionEn: description.en,
        durationWeeks: module.durationWeeks,
        lessonCount: module.lessons.length
      } satisfies AdminModuleListItem;
    });
  } catch {
    return fallbackModules();
  }
}

export async function getAdminModuleDetail(moduleSlug: string): Promise<AdminModuleDetail | null> {
  try {
    const moduleRecord = await db.module.findFirst({
      where: {
        slug: moduleSlug,
        deletedAt: null
      },
      include: {
        lessons: {
          where: { deletedAt: null },
          orderBy: { order: "asc" },
          include: {
            exercises: {
              where: {
                deletedAt: null,
                type: "LESSON_EXERCISE"
              },
              orderBy: {
                order: "asc"
              }
            }
          }
        },
        project: {
          include: {
            exercise: {
              include: {
                checklistItems: {
                  where: { deletedAt: null },
                  orderBy: { order: "asc" }
                }
              }
            }
          }
        }
      }
    });

    if (!moduleRecord) {
      return null;
    }

    const title = jsonToLocaleStrings(moduleRecord.title);
    const description = jsonToLocaleStrings(moduleRecord.description);

    return {
      module: {
        id: moduleRecord.id,
        slug: moduleRecord.slug,
        order: moduleRecord.order,
        tier: moduleRecord.tier,
        titleZh: title.zh,
        titleEn: title.en,
        descriptionZh: description.zh,
        descriptionEn: description.en,
        durationWeeks: moduleRecord.durationWeeks,
        lessonCount: moduleRecord.lessons.length
      },
      lessons: moduleRecord.lessons.map((lesson) => {
        const lessonTitle = jsonToLocaleStrings(lesson.title);
        const lessonDescription = jsonToLocaleStrings(lesson.description);

        return {
          id: lesson.id,
          slug: lesson.slug,
          order: lesson.order,
          titleZh: lessonTitle.zh,
          titleEn: lessonTitle.en,
          descriptionZh: lessonDescription.zh,
          descriptionEn: lessonDescription.en,
          exercises: lesson.exercises.map((exercise) => {
            const exerciseTitle = jsonToLocaleStrings(exercise.title);
            const exerciseDescription = jsonToLocaleStrings(exercise.description);

            return {
              id: exercise.id,
              titleZh: exerciseTitle.zh,
              titleEn: exerciseTitle.en,
              descriptionZh: exerciseDescription.zh,
              descriptionEn: exerciseDescription.en
            };
          })
        } satisfies AdminLessonListItem;
      }),
      projectChecklist: moduleRecord.project?.exercise
        ? moduleRecord.project.exercise.checklistItems.map((item) => {
            const label = jsonToLocaleStrings(item.label);
            return {
              id: item.id,
              labelZh: label.zh,
              labelEn: label.en
            };
          })
        : []
    };
  } catch {
    const fallback = courseStructure.find((module) => module.slug === moduleSlug);
    if (!fallback) {
      return null;
    }

    return {
      module: fallbackModules().find((module) => module.slug === moduleSlug)!,
      lessons: fallback.lessons.map((lesson) => ({
        slug: lesson.slug,
        order: lesson.order,
        titleZh: lesson.title.zh,
        titleEn: lesson.title.en,
        descriptionZh: lesson.description.zh,
        descriptionEn: lesson.description.en,
        exercises: [
          {
            titleZh: lesson.exercise.title.zh,
            titleEn: lesson.exercise.title.en,
            descriptionZh: lesson.exercise.description.zh,
            descriptionEn: lesson.exercise.description.en
          }
        ]
      })),
      projectChecklist: fallback.project.checklist.map((item) => ({
        labelZh: item.zh,
        labelEn: item.en
      }))
    };
  }
}

export async function getAdminUsers(): Promise<AdminUserListItem[]> {
  try {
    const [users, modules] = await Promise.all([
      db.user.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: "desc" },
        include: {
          lessonProgress: {
            where: {
              completed: true
            },
            include: {
              lesson: {
                select: {
                  moduleId: true
                }
              }
            }
          }
        }
      }),
      db.module.findMany({
        where: { deletedAt: null },
        include: {
          lessons: {
            where: { deletedAt: null }
          }
        }
      })
    ]);

    return users.map((user) => {
      const completedModuleIds = new Set(user.lessonProgress.map((item) => item.lesson.moduleId));
      const completedModules = modules.filter((module) =>
        module.lessons.every((lesson) => user.lessonProgress.some((item) => item.lessonId === lesson.id))
      ).length;

      return {
        id: user.id,
        name: user.name ?? "未命名用户",
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
        lastActiveAt: user.lastActiveAt,
        completedLessons: user.lessonProgress.length,
        completedModules: completedModules || completedModuleIds.size
      };
    });
  } catch {
    return [];
  }
}

export async function updateUserRole(userId: string, role: UserRole) {
  await db.user.update({
    where: { id: userId },
    data: { role }
  });
}

export async function updateModuleMetadata(input: {
  moduleId: string;
  order: number;
  tier: "CORE" | "ADVANCED";
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
  durationWeeks: number;
}) {
  await db.module.update({
    where: { id: input.moduleId },
    data: {
      order: input.order,
      tier: input.tier,
      durationWeeks: input.durationWeeks,
      title: {
        zh: input.titleZh,
        en: input.titleEn
      },
      description: {
        zh: input.descriptionZh,
        en: input.descriptionEn
      }
    }
  });
}

export async function createModuleMetadata(input: CreateModuleInput) {
  await db.$transaction(async (tx) => {
    const createdModule = await tx.module.create({
      data: {
        slug: input.slug,
        order: input.order,
        tier: input.tier,
        durationWeeks: input.durationWeeks,
        title: {
          zh: input.titleZh,
          en: input.titleEn
        },
        description: {
          zh: input.descriptionZh,
          en: input.descriptionEn
        }
      }
    });

    const projectExercise = await tx.exercise.create({
      data: {
        type: "MODULE_PROJECT",
        order: 1,
        title: {
          zh: `${input.titleZh || input.slug} 模块项目`,
          en: `${input.titleEn || input.slug} Module Project`
        },
        description: {
          zh: "请补充这个模块项目的要求与交付说明。",
          en: "Add the project requirements and delivery notes for this module."
        }
      }
    });

    await tx.moduleProject.create({
      data: {
        moduleId: createdModule.id,
        exerciseId: projectExercise.id,
        title: {
          zh: `${input.titleZh || input.slug} 模块项目`,
          en: `${input.titleEn || input.slug} Module Project`
        },
        description: {
          zh: "请在后台完善模块项目描述。",
          en: "Complete the module-project description in the admin panel."
        }
      }
    });
  });
}

export async function deleteModuleMetadata(moduleId: string) {
  const now = new Date();

  await db.$transaction(async (tx) => {
    const moduleRecord = await tx.module.findUnique({
      where: { id: moduleId },
      include: {
        lessons: {
          where: { deletedAt: null },
          select: { id: true }
        },
        project: {
          include: {
            exercise: {
              include: {
                checklistItems: {
                  where: { deletedAt: null },
                  select: { id: true }
                }
              }
            }
          }
        }
      }
    });

    if (!moduleRecord) {
      return;
    }

    const lessonIds = moduleRecord.lessons.map((lesson) => lesson.id);

    if (lessonIds.length > 0) {
      await tx.exercise.updateMany({
        where: {
          lessonId: { in: lessonIds },
          deletedAt: null
        },
        data: { deletedAt: now }
      });

      await tx.lesson.updateMany({
        where: {
          id: { in: lessonIds },
          deletedAt: null
        },
        data: { deletedAt: now }
      });
    }

    if (moduleRecord.project?.exercise) {
      const checklistIds = moduleRecord.project.exercise.checklistItems.map((item) => item.id);
      if (checklistIds.length > 0) {
        await tx.checklistItem.updateMany({
          where: {
            id: { in: checklistIds },
            deletedAt: null
          },
          data: { deletedAt: now }
        });
      }

      await tx.exercise.update({
        where: { id: moduleRecord.project.exercise.id },
        data: { deletedAt: now }
      });
    }

    if (moduleRecord.project) {
      await tx.moduleProject.update({
        where: { id: moduleRecord.project.id },
        data: { deletedAt: now }
      });
    }

    await tx.module.update({
      where: { id: moduleId },
      data: { deletedAt: now }
    });
  });
}

export async function updateLessonMetadata(input: {
  lessonId: string;
  order: number;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
}) {
  await db.lesson.update({
    where: { id: input.lessonId },
    data: {
      order: input.order,
      title: {
        zh: input.titleZh,
        en: input.titleEn
      },
      description: {
        zh: input.descriptionZh,
        en: input.descriptionEn
      }
    }
  });
}

export async function createLessonMetadata(input: CreateLessonInput) {
  await db.$transaction(async (tx) => {
    const lesson = await tx.lesson.create({
      data: {
        moduleId: input.moduleId,
        slug: input.slug,
        order: input.order,
        title: {
          zh: input.titleZh,
          en: input.titleEn
        },
        description: {
          zh: input.descriptionZh,
          en: input.descriptionEn
        }
      }
    });

    await tx.exercise.create({
      data: {
        lessonId: lesson.id,
        type: "LESSON_EXERCISE",
        order: 1,
        title: {
          zh: `${input.titleZh || input.slug} 课堂练习`,
          en: `${input.titleEn || input.slug} Lesson Exercise`
        },
        description: {
          zh: "请在后台补充练习说明。",
          en: "Add the lesson exercise description in the admin panel."
        }
      }
    });
  });
}

export async function deleteLessonMetadata(lessonId: string) {
  const now = new Date();

  await db.$transaction(async (tx) => {
    await tx.exercise.updateMany({
      where: {
        lessonId,
        deletedAt: null
      },
      data: { deletedAt: now }
    });

    await tx.lesson.update({
      where: { id: lessonId },
      data: { deletedAt: now }
    });
  });
}

export async function updateExerciseMetadata(input: {
  exerciseId: string;
  titleZh: string;
  titleEn: string;
  descriptionZh: string;
  descriptionEn: string;
}) {
  await db.exercise.update({
    where: { id: input.exerciseId },
    data: {
      title: {
        zh: input.titleZh,
        en: input.titleEn
      },
      description: {
        zh: input.descriptionZh,
        en: input.descriptionEn
      }
    }
  });
}

export async function updateChecklistItemMetadata(input: {
  checklistItemId: string;
  labelZh: string;
  labelEn: string;
}) {
  await db.checklistItem.update({
    where: { id: input.checklistItemId },
    data: {
      label: {
        zh: input.labelZh,
        en: input.labelEn
      }
    }
  });
}

export async function getAdminReviews(): Promise<AdminReviewItem[]> {
  try {
    const submissions = await db.submission.findMany({
      where: {
        deletedAt: null,
        exercise: {
          type: "MODULE_PROJECT"
        }
      },
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: true,
        exercise: {
          include: {
            moduleProject: {
              include: {
                module: true
              }
            },
            checklistItems: {
              where: { deletedAt: null },
              orderBy: { order: "asc" }
            }
          }
        },
        checklistStatuses: true
      }
    });

    return submissions.map((submission) => {
      const moduleProject = submission.exercise.moduleProject;
      const moduleTitle = moduleProject ? jsonToLocaleStrings(moduleProject.module.title).zh : "未知模块";
      const projectTitle = moduleProject ? jsonToLocaleStrings(moduleProject.title).zh : "模块项目";
      const content = submission.content as { text?: string; links?: string[] };

      return {
        submissionId: submission.id,
        status: submission.status,
        reviewNote: submission.reviewNote ?? "",
        reviewedAt: submission.reviewedAt,
        learnerName: submission.user.name ?? "未命名用户",
        learnerEmail: submission.user.email,
        moduleSlug: moduleProject?.module.slug ?? "unknown",
        moduleTitle,
        projectTitle,
        contentText: content.text ?? "",
        contentLinks: content.links ?? [],
        checklist: submission.exercise.checklistItems.map((item) => ({
          label: jsonToLocaleStrings(item.label).zh,
          checked: submission.checklistStatuses.some(
            (status) => status.checklistItemId === item.id && status.checked
          )
        })),
        createdAt: submission.createdAt
      };
    });
  } catch {
    return [];
  }
}

export async function updateReviewStatus(input: {
  submissionId: string;
  status: "REVIEWED" | "COMPLETED";
  reviewNote: string;
}) {
  await db.submission.update({
    where: { id: input.submissionId },
    data: {
      status: input.status,
      reviewNote: input.reviewNote,
      reviewedAt: new Date()
    }
  });
}
