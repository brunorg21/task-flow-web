import { ListChecks } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface BoardCardProps {
  boardName: string;
  userBoard?: boolean;
  boardId: string;
}

export function BoardCard({
  boardName,
  userBoard = false,
  boardId,
}: BoardCardProps) {
  return (
    <Link
      className="col-span-2"
      href={`/taskflow/tasks/${userBoard ? "user" : "org"}/${boardId}`}
    >
      <Card className="bg-primary-foreground md:hover:scale-105 hover:scale-[102%] duration-150">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <ListChecks className="w-6 h-6" /> Gerencie suas tarefas
          </CardTitle>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter className="flex justify-start text-sm gap-1">
          <span className="text-lg font-semibold">{boardName}</span>
        </CardFooter>
      </Card>
    </Link>
  );
}
