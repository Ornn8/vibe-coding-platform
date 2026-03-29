# Content Authoring Checklist

## Frontmatter

- `title` is present and matches the intended lesson title.
- `description` is present and summarizes the lesson in one sentence.
- `module` matches the module slug such as `m1`, `m2`, `m3`, or `m4`.
- `order` matches the lesson order in `course-structure.ts`.

## Body Structure

- The lesson opens with a practical framing section instead of abstract definitions only.
- Major concepts are grouped under short headings.
- Each lesson includes concrete examples or scenarios rather than placeholder prose.
- Any code fence includes an explicit language tag such as `bash`, `ts`, `tsx`, `md`, or `json`.

## Exercises

- At least one `<Exercise>` block appears in the lesson.
- Exercise prompts are specific, actionable, and tied to the lesson goal.
- Exercise IDs are unique within the course and follow the `ex-x.y.z` style from the authoring plan when possible.
- Exercises appear near the relevant concept instead of only at the very end.

## References

- The lesson ends with a short references section.
- References name the source or repository and what it informed.
- References avoid long verbatim quotation.

## QA

- File path, lesson slug, and frontmatter all agree.
- The lesson can be loaded by the existing MDX pipeline without syntax errors.
- Terminology is consistent with adjacent lessons in the same module.
- The lesson tone is conversational, concrete, and Chinese-first.
