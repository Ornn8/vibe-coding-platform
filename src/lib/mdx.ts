import { readFile } from "node:fs/promises";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/shared/mdx-components";

export type LessonFrontmatter = {
  title: string;
  description: string;
  order: number;
  module: string;
  estimatedMins?: number;
  methodologyTag?: string;
};

export async function loadLessonMdx(locale: string, moduleSlug: string, lessonSlug: string) {
  const requestedPath = path.join(process.cwd(), "src", "content", locale, moduleSlug, `${lessonSlug}.mdx`);
  let rawSource: string;

  try {
    rawSource = await readFile(requestedPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT" || locale === "zh") {
      throw error;
    }

    const fallbackPath = path.join(process.cwd(), "src", "content", "zh", moduleSlug, `${lessonSlug}.mdx`);
    rawSource = await readFile(fallbackPath, "utf8");
  }

  return compileMDX<LessonFrontmatter>({
    source: rawSource,
    components: mdxComponents,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      }
    }
  });
}
