import { Badge } from "@/components/ui/badge";
import { Task } from "@/types/task";

interface BadgeStatusProps {
  task: Task;
}

export function BadgeStatus({ task }: BadgeStatusProps) {
  return (
    <Badge
      className={`${
        task.status === "Cancelada"
          ? "text-red-400 border-red-200"
          : task.status === "Em andamento"
          ? "text-yellow-400 border-yellow-200"
          : "text-green-400 border-green-200"
      }`}
      variant={"outline"}
    >
      {task.status}
    </Badge>
  );
}
