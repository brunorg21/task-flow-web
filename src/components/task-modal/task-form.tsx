"use client";

import { FormSchema } from "@/types/form-schema";
import { Form } from "../form";
import { z } from "zod";
import { Task } from "@/types/task";

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
}

export function TaskForm({ task, isEditing }: TaskFormProps) {
  console.log(task);
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
      defaultValue: task?.title,
    },
    {
      key: "responsible",
      name: "responsible",
      label: "Responsável",
      placeholder: "Responsável",
      description: "Responsável pela tarefa.",
      size: 6,
      defaultValue: task?.assignedId,
    },
    {
      key: "status",
      name: "status",
      label: "Status",
      placeholder: "Status",
      size: 6,
      defaultValue: task?.status,
    },
    {
      key: "date",
      name: "date",
      label: "Data de criação",
      placeholder: "Data de criação",
      size: 6,
      disabled: true,
      defaultValue: task?.createdAt,
      hidden: !isEditing,
    },
  ] as FormSchema[];

  return (
    <Form
      handleSubmitForm={handleSubmitForm}
      inputs={formInputs}
      formSchema={formSchema}
      isEditing={isEditing}
    />
  );
}
