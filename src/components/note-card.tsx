import { format } from "date-fns";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Note } from "@/types/note";

interface NoteCardProps {
  annotation: Note;
}

export function NoteCard({ annotation }: NoteCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between text-md">
        {annotation.user.username}
        <div className="text-xs">
          {format(annotation.createdAt, "dd/MM/yyyy")}
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 text-sm">
        {annotation.description}
      </CardContent>
    </Card>
  );
}
