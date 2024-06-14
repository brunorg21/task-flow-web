import { NoteCard } from "@/components/note-card";
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function NoteDrawer() {
  return (
    <SheetContent className="space-y-6 overflow-auto">
      <SheetHeader>
        <SheetTitle>Notas</SheetTitle>
        <SheetDescription>Visualize as anotações das tarefas.</SheetDescription>
      </SheetHeader>
      <NoteCard />
      <NoteCard />
      <NoteCard />
      <NoteCard />
    </SheetContent>
  );
}
