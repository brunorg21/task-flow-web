"use client";
import { NotepadText } from "lucide-react";

import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { FileView } from "../file-view";
import { Button } from "../ui/button";

import { Sheet, SheetTrigger } from "../ui/sheet";
import { NoteDrawer } from "./note-drawer/note-drawer";

import { TaskForm } from "./task-form";
import { Task } from "@/types/task";

interface TaskModalProps {
  isEditing?: boolean;
  task?: Task;
}

export function TaskModal({ isEditing = false, task }: TaskModalProps) {
  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="p-2">
        <div className="flex justify-between">
          <DialogTitle className="text-xl font-bold">Tarefa 1</DialogTitle>
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"sm"} className="flex items-center gap-1">
                <NotepadText />
                Notas
              </Button>
            </SheetTrigger>
            <NoteDrawer />
          </Sheet>
        </div>
        <DialogDescription className="mt-4 text-sm">
          {isEditing
            ? "Atualize sua tarefa e visualize seus anexos"
            : "Preencha os campos para adicionar uma nova tarefa"}
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <TaskForm isEditing={isEditing} task={task} />
        <div className="grid grid-cols-12 gap-2">
          {isEditing ? (
            <>
              {task?.attachment.map((attachment) => (
                <FileView key={attachment.id} />
              ))}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </DialogContent>
  );
}
