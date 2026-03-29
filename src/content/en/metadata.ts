import { courseStructure } from "../course-structure";

export const moduleMetadata = courseStructure.map((module) => ({
  slug: module.slug,
  order: module.order,
  tier: module.tier,
  durationWeeks: module.durationWeeks,
  title: module.title.en,
  description: module.description.en,
  project: {
    title: module.project.title.en,
    description: module.project.description.en
  },
  lessons: module.lessons.map((lesson) => ({
    slug: lesson.slug,
    order: lesson.order,
    title: lesson.title.en,
    description: lesson.description.en
  }))
}));
