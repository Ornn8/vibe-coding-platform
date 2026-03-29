"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";

type CompleteLessonButtonProps = {
  completed: boolean;
  idleLabel: string;
  pendingLabel: string;
  completedLabel: string;
};

function SubmitButton({ completed, idleLabel, pendingLabel, completedLabel }: CompleteLessonButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="rounded-full px-6" disabled={pending || completed}>
      {completed ? completedLabel : pending ? pendingLabel : idleLabel}
    </Button>
  );
}

export function CompleteLessonButton(props: CompleteLessonButtonProps) {
  return <SubmitButton {...props} />;
}
