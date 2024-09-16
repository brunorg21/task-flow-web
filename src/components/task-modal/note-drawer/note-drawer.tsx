"use client";
import { NoteCard } from "@/components/note-card";

import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { NoteForm } from "./note-form";
import { getAnnotations } from "@/services/annotations";
import { useQuery } from "@tanstack/react-query";
import { Note } from "@/types/note";

interface NoteDrawerProps {
  taskId: string;
}
async function getTaskAnnotations(taskId: string) {
  const annotations = await getAnnotations(taskId);
  return annotations;
}

export function NoteDrawer({ taskId }: NoteDrawerProps) {
  const { data: annotations } = useQuery<Note[]>({
    queryKey: ["notes", taskId],
    queryFn: async () => await getTaskAnnotations(taskId),
  });

  return (
    <SheetContent className="space-y-6 overflow-auto">
      <SheetHeader>
        <SheetTitle>Anotações</SheetTitle>
        <SheetDescription>Visualize as anotações das tarefas.</SheetDescription>
      </SheetHeader>
      <NoteForm taskId={taskId} />

      {annotations?.map((annotation) => (
        <NoteCard annotation={annotation} key={annotation.id} />
      ))}
    </SheetContent>
  );
}
