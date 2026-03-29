"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function markLessonComplete(lessonId: string, pathToRevalidate: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  await db.lessonProgress.upsert({
    where: {
      userId_lessonId: {
        userId: session.user.id,
        lessonId
      }
    },
    create: {
      userId: session.user.id,
      lessonId,
      completed: true,
      completedAt: new Date()
    },
    update: {
      completed: true,
      completedAt: new Date()
    }
  });

  revalidatePath(pathToRevalidate);
}

function parseLinks(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function saveLessonExerciseSubmission(formData: FormData, pathToRevalidate: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const exerciseId = String(formData.get("exerciseId") ?? "");
  const text = String(formData.get("text") ?? "").trim();
  const links = parseLinks(String(formData.get("links") ?? ""));

  if (!exerciseId) {
    throw new Error("Missing exercise");
  }

  await db.submission.upsert({
    where: {
      userId_exerciseId: {
        userId: session.user.id,
        exerciseId
      }
    },
    create: {
      userId: session.user.id,
      exerciseId,
      status: "SUBMITTED",
      content: {
        text,
        links,
        files: []
      }
    },
    update: {
      status: "SUBMITTED",
      content: {
        text,
        links,
        files: []
      }
    }
  });

  revalidatePath(pathToRevalidate);
}
