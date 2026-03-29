"use server";

import { revalidatePath } from "next/cache";
import { UserRole } from "@prisma/client";
import {
  createLessonMetadata,
  createModuleMetadata,
  deleteLessonMetadata,
  deleteModuleMetadata,
  updateChecklistItemMetadata,
  updateExerciseMetadata,
  updateLessonMetadata,
  updateModuleMetadata,
  updateReviewStatus,
  updateUserRole
} from "@/lib/admin";

export async function saveModuleMetadata(formData: FormData, pathToRevalidate: string) {
  await updateModuleMetadata({
    moduleId: String(formData.get("moduleId") ?? ""),
    order: Number(formData.get("order") ?? 0),
    tier: String(formData.get("tier") ?? "CORE") === "ADVANCED" ? "ADVANCED" : "CORE",
    titleZh: String(formData.get("titleZh") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    descriptionZh: String(formData.get("descriptionZh") ?? ""),
    descriptionEn: String(formData.get("descriptionEn") ?? ""),
    durationWeeks: Number(formData.get("durationWeeks") ?? 1)
  });

  revalidatePath(pathToRevalidate);
}

export async function createModule(formData: FormData, pathToRevalidate: string) {
  await createModuleMetadata({
    slug: String(formData.get("slug") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
    tier: String(formData.get("tier") ?? "CORE") === "ADVANCED" ? "ADVANCED" : "CORE",
    titleZh: String(formData.get("titleZh") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    descriptionZh: String(formData.get("descriptionZh") ?? "").trim(),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim(),
    durationWeeks: Number(formData.get("durationWeeks") ?? 1)
  });

  revalidatePath(pathToRevalidate);
}

export async function removeModule(formData: FormData, pathToRevalidate: string) {
  await deleteModuleMetadata(String(formData.get("moduleId") ?? ""));
  revalidatePath(pathToRevalidate);
}

export async function saveLessonMetadata(formData: FormData, pathToRevalidate: string) {
  await updateLessonMetadata({
    lessonId: String(formData.get("lessonId") ?? ""),
    order: Number(formData.get("order") ?? 0),
    titleZh: String(formData.get("titleZh") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    descriptionZh: String(formData.get("descriptionZh") ?? ""),
    descriptionEn: String(formData.get("descriptionEn") ?? "")
  });

  revalidatePath(pathToRevalidate);
}

export async function createLesson(formData: FormData, pathToRevalidate: string, listPathToRevalidate?: string) {
  await createLessonMetadata({
    moduleId: String(formData.get("moduleId") ?? ""),
    slug: String(formData.get("slug") ?? "").trim(),
    order: Number(formData.get("order") ?? 0),
    titleZh: String(formData.get("titleZh") ?? "").trim(),
    titleEn: String(formData.get("titleEn") ?? "").trim(),
    descriptionZh: String(formData.get("descriptionZh") ?? "").trim(),
    descriptionEn: String(formData.get("descriptionEn") ?? "").trim()
  });

  revalidatePath(pathToRevalidate);
  if (listPathToRevalidate) {
    revalidatePath(listPathToRevalidate);
  }
}

export async function removeLesson(formData: FormData, pathToRevalidate: string, listPathToRevalidate?: string) {
  await deleteLessonMetadata(String(formData.get("lessonId") ?? ""));
  revalidatePath(pathToRevalidate);
  if (listPathToRevalidate) {
    revalidatePath(listPathToRevalidate);
  }
}

export async function saveUserRole(formData: FormData, pathToRevalidate: string) {
  const role = String(formData.get("role") ?? "STUDENT") === "ADMIN" ? UserRole.ADMIN : UserRole.STUDENT;

  await updateUserRole(String(formData.get("userId") ?? ""), role);
  revalidatePath(pathToRevalidate);
}

export async function saveReviewDecision(formData: FormData, pathToRevalidate: string) {
  await updateReviewStatus({
    submissionId: String(formData.get("submissionId") ?? ""),
    status: String(formData.get("status") ?? "REVIEWED") === "COMPLETED" ? "COMPLETED" : "REVIEWED",
    reviewNote: String(formData.get("reviewNote") ?? "")
  });

  revalidatePath(pathToRevalidate);
}

export async function saveExerciseMetadata(formData: FormData, pathToRevalidate: string) {
  await updateExerciseMetadata({
    exerciseId: String(formData.get("exerciseId") ?? ""),
    titleZh: String(formData.get("titleZh") ?? ""),
    titleEn: String(formData.get("titleEn") ?? ""),
    descriptionZh: String(formData.get("descriptionZh") ?? ""),
    descriptionEn: String(formData.get("descriptionEn") ?? "")
  });

  revalidatePath(pathToRevalidate);
}

export async function saveChecklistItemMetadata(formData: FormData, pathToRevalidate: string) {
  await updateChecklistItemMetadata({
    checklistItemId: String(formData.get("checklistItemId") ?? ""),
    labelZh: String(formData.get("labelZh") ?? ""),
    labelEn: String(formData.get("labelEn") ?? "")
  });

  revalidatePath(pathToRevalidate);
}
