import { NewTaskForm } from "./task-form/new-task-form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function NewTaskModal() {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] p-6">
      <DialogHeader className="p-2">
        <DialogTitle className="text-xl font-bold">Editar tarefa</DialogTitle>
        <DialogDescription className="mt-4 text-sm">
          Visualize todos os anexos para essa tarefa
        </DialogDescription>
      </DialogHeader>
      <NewTaskForm />
    </DialogContent>
  );
}
