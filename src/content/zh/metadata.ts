import { courseStructure } from "../course-structure";

export const moduleMetadata = courseStructure.map((module) => ({
  slug: module.slug,
  order: module.order,
  tier: module.tier,
  durationWeeks: module.durationWeeks,
  title: module.title.zh,
  description: module.description.zh,
  project: {
    title: module.project.title.zh,
    description: module.project.description.zh
  },
  lessons: module.lessons.map((lesson) => ({
    slug: lesson.slug,
    order: lesson.order,
    title: lesson.title.zh,
    description: lesson.description.zh
  }))
}));
