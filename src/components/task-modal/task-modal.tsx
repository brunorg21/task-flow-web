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
import { Form } from "../form";
import { FormSchema } from "@/types/form-schema";
import { z } from "zod";

export function TaskModal() {
  const formSchema = z.object({
    title: z.string(),
    responsible: z.string(),
    status: z.enum(["Em andamento", "Cancelada", "Concluída"], {
      message: "Insira um valor válido.",
    }),
    date: z.string(),
  });

  function handleSubmitForm(data: any) {
    console.log(data);
  }

  const formInputs = [
    {
      key: "title",
      name: "title",
      label: "Título",
      placeholder: "Título",
      size: 6,
    },
    {
      key: "responsible",
      name: "responsible",
      label: "Responsável",
      placeholder: "Responsável",
      size: 6,
    },
    {
      key: "status",
      name: "status",
      label: "Status",
      placeholder: "Status",
      size: 6,
    },
    {
      key: "date",
      name: "date",
      label: "Data de criação",
      placeholder: "Data de criação",
      size: 6,
      disabled: true,
    },
  ] as FormSchema[];

  return (
    <DialogContent className="flex flex-col w-[1220px] h-[700px] overflow-auto p-6">
      <DialogHeader className="p-2">
        <div className="flex justify-between">
          <DialogTitle className="text-xl font-bold">Tarefa 1</DialogTitle>
          <Sheet>
            <SheetTrigger asChild>
              <Button size={"sm"} className="flex items-center gap-1">
                <NotepadText />
                Visualizar notas
              </Button>
            </SheetTrigger>
            <NoteDrawer />
          </Sheet>
        </div>
        <DialogDescription className="mt-4 text-sm">
          Atualize sua tarefa e visualize seus anexos
        </DialogDescription>
      </DialogHeader>
      <div className="flex flex-col justify-between h-full">
        <Form
          handleSubmitForm={handleSubmitForm}
          inputs={formInputs}
          formSchema={formSchema}
        />
        <div className="grid grid-cols-12 gap-2">
          <FileView />
          <FileView />
          <FileView />
        </div>
      </div>
    </DialogContent>
  );
}
