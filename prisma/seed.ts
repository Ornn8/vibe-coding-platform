import { ExerciseType, ModuleTier, PrismaClient } from "@prisma/client";
import { courseStructure } from "../src/content/course-structure";

const prisma = new PrismaClient();

async function resetCourseData() {
  await prisma.submissionCheckStatus.deleteMany();
  await prisma.submission.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.checklistItem.deleteMany();
  await prisma.moduleProject.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.module.deleteMany();
}

async function seedCourseData() {
  for (const moduleDef of courseStructure) {
    const moduleRecord = await prisma.module.create({
      data: {
        slug: moduleDef.slug,
        order: moduleDef.order,
        tier: moduleDef.tier === "ADVANCED" ? ModuleTier.ADVANCED : ModuleTier.CORE,
        durationWeeks: moduleDef.durationWeeks,
        title: moduleDef.title,
        description: moduleDef.description
      }
    });

    for (const lessonDef of moduleDef.lessons) {
      const lessonRecord = await prisma.lesson.create({
        data: {
          moduleId: moduleRecord.id,
          slug: lessonDef.slug,
          order: lessonDef.order,
          title: lessonDef.title,
          description: lessonDef.description
        }
      });

      await prisma.exercise.create({
        data: {
          lessonId: lessonRecord.id,
          type: ExerciseType.LESSON_EXERCISE,
          order: 1,
          title: lessonDef.exercise.title,
          description: lessonDef.exercise.description
        }
      });
    }

    const projectExercise = await prisma.exercise.create({
      data: {
        type: ExerciseType.MODULE_PROJECT,
        order: 1,
        title: moduleDef.project.title,
        description: moduleDef.project.description
      }
    });

    await prisma.moduleProject.create({
      data: {
        moduleId: moduleRecord.id,
        exerciseId: projectExercise.id,
        title: moduleDef.project.title,
        description: moduleDef.project.description
      }
    });

    await prisma.checklistItem.createMany({
      data: moduleDef.project.checklist.map((item, index) => ({
        exerciseId: projectExercise.id,
        order: index + 1,
        label: item
      }))
    });
  }
}

async function main() {
  await resetCourseData();
  await seedCourseData();

  console.log(`Seeded ${courseStructure.length} modules for the Vibe Coding platform.`);
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
