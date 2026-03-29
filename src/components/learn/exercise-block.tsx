type ExerciseBlockProps = {
  id?: string;
  level?: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
};

export function ExerciseBlock({ id, level, title, description, children }: ExerciseBlockProps) {
  return (
    <section className="rounded-[1.5rem] border border-border/70 bg-secondary/40 p-5" data-exercise-id={id}>
      <div className="flex flex-wrap items-center gap-3">
        {level ? (
          <span className="rounded-full border border-border/80 bg-background px-3 py-1 text-[11px] font-medium uppercase tracking-[0.24em] text-muted-foreground">
            {level}
          </span>
        ) : null}
        <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold">{title}</h3>
      </div>
      {description ? <p className="mt-3 text-sm leading-7 text-muted-foreground">{description}</p> : null}
      {children ? <div className="mt-4 text-sm leading-7 text-foreground/90">{children}</div> : null}
    </section>
  );
}
