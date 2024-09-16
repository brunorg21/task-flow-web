"use client";
import { NotepadText, Trash2 } from "lucide-react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FileView } from "../file-view/file-view";
import { Button } from "../ui/button";

import { Sheet, SheetTrigger } from "../ui/sheet";
import { NoteDrawer } from "./note-drawer/note-drawer";

import { TaskForm } from "./task-form";
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { deleteTask } from "@/services/tasks";
import { toast } from "../ui/use-toast";

interface TaskModalProps {
  isEditing?: boolean;
  task?: Task;
  users: User[];
  orgId?: string;
}

export function TaskModal({
  isEditing = false,
  task,
  users,
  orgId,
}: TaskModalProps) {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="p-2">
        <div className="flex justify-between">
          <DialogTitle className="text-xl font-bold">
            {task?.title ?? "Adicionar nova tarefa"}
          </DialogTitle>
          <div className="flex items-center gap-2">
            {task && (
              <form action="">
                <Button
                  formAction={async () => {
                    const { success } = await deleteTask(task.id);

                    if (success) {
                      toast({
                        title: "Tarefa excluída com sucesso!",
                      });
                    }
                  }}
                  title="Excluir tarefa"
                  variant={"destructive"}
                  size={"icon"}
                >
                  <Trash2 className="size-4" />
                </Button>
              </form>
            )}

            <Sheet>
              <SheetTrigger asChild>
                <Button size={"sm"} className="flex items-center gap-1">
                  <NotepadText />
                  Anotações
                </Button>
              </SheetTrigger>
              <NoteDrawer taskId={task?.id ?? ""} />
            </Sheet>
          </div>
        </div>
        <DialogDescription className="mt-4 text-sm">
          {isEditing
            ? "Atualize sua tarefa e visualize seus anexos"
            : "Preencha os campos para adicionar uma nova tarefa"}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <TaskForm
          orgId={orgId}
          users={users}
          isEditing={isEditing}
          task={task}
        />
      </div>
    </DialogContent>
  );
}
