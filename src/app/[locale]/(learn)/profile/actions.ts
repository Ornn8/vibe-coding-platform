"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { db } from "@/lib/db";

function parseTags(raw: string) {
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function savePromptTemplate(formData: FormData, pathToRevalidate: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "");
  const title = String(formData.get("title") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const category = String(formData.get("category") ?? "").trim();
  const tags = parseTags(String(formData.get("tags") ?? ""));

  if (!title || !content) {
    throw new Error("Title and content are required");
  }

  if (id) {
    await db.promptTemplate.update({
      where: {
        id,
        userId: session.user.id
      },
      data: {
        title,
        content,
        category: category || null,
        tags
      }
    });
  } else {
    await db.promptTemplate.create({
      data: {
        userId: session.user.id,
        title,
        content,
        category: category || null,
        tags
      }
    });
  }

  revalidatePath(pathToRevalidate);
}

export async function deletePromptTemplate(formData: FormData, pathToRevalidate: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  const id = String(formData.get("id") ?? "");

  if (!id) {
    throw new Error("Missing prompt template id");
  }

  await db.promptTemplate.update({
    where: {
      id,
      userId: session.user.id
    },
    data: {
      deletedAt: new Date()
    }
  });

  revalidatePath(pathToRevalidate);
}
