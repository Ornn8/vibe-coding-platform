"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";

function parseLinks(raw: string) {
  return raw
    .split(/\r?\n/)
    .map((value) => value.trim())
    .filter(Boolean);
}

export async function saveProjectSubmission(formData: FormData, pathToRevalidate: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const exerciseId = String(formData.get("exerciseId") ?? "");
  const status = String(formData.get("status") ?? "DRAFT");
  const text = String(formData.get("text") ?? "").trim();
  const links = parseLinks(String(formData.get("links") ?? ""));
  const checklistIds = formData
    .getAll("checklist")
    .map((value) => String(value))
    .filter(Boolean);

  if (!exerciseId) {
    throw new Error("Missing project exercise");
  }

  const checklistItems = await db.checklistItem.findMany({
    where: {
      exerciseId,
      deletedAt: null
    }
  });

  if (status === "SUBMITTED" && checklistItems.some((item) => !checklistIds.includes(item.id))) {
    throw new Error("All checklist items must be completed before final submission");
  }

  const submission = await db.submission.upsert({
    where: {
      userId_exerciseId: {
        userId: session.user.id,
        exerciseId
      }
    },
    create: {
      userId: session.user.id,
      exerciseId,
      status: status === "SUBMITTED" ? "SUBMITTED" : "DRAFT",
      content: {
        text,
        links,
        files: []
      }
    },
    update: {
      status: status === "SUBMITTED" ? "SUBMITTED" : "DRAFT",
      content: {
        text,
        links,
        files: []
      }
    }
  });

  await db.submissionCheckStatus.deleteMany({
    where: {
      submissionId: submission.id
    }
  });

  if (checklistItems.length > 0) {
    await db.submissionCheckStatus.createMany({
      data: checklistItems.map((item) => ({
        submissionId: submission.id,
        checklistItemId: item.id,
        checked: checklistIds.includes(item.id)
      }))
    });
  }

  revalidatePath(pathToRevalidate);
}
