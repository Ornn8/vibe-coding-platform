export type LocalizedText = {
  zh: string;
  en: string;
};

export type ExerciseDefinition = {
  title: LocalizedText;
  description: LocalizedText;
};

export type LessonDefinition = {
  slug: string;
  order: number;
  title: LocalizedText;
  description: LocalizedText;
  estimatedMins?: number;
  methodologyTag?: LocalizedText;
  exercise: ExerciseDefinition;
};

export type ModuleProjectDefinition = {
  title: LocalizedText;
  description: LocalizedText;
  checklist: LocalizedText[];
};

export type ModuleDefinition = {
  slug: string;
  order: number;
  tier: "CORE" | "ADVANCED";
  durationWeeks: number;
  title: LocalizedText;
  description: LocalizedText;
  lessons: LessonDefinition[];
  project: ModuleProjectDefinition;
};
