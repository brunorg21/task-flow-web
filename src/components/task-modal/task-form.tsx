"use client";

import { FormSchema } from "@/types/form-schema";
import { Form } from "../form";
import { z } from "zod";
import { Task } from "@/types/task";
import { User } from "@/types/user";

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
  users?: User[];
}

const taskFormSchema = z.object({
  title: z.string(),
  responsible: z.string({
    message: "Insira um responsável pela tarefa.",
  }),
  status: z.enum(["Em andamento", "Cancelada", "Concluída"], {
    message: "Insira um status válido.",
  }),
  date: z.string(),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

export function TaskForm({ task, isEditing, users }: TaskFormProps) {
  function handleSubmitForm(data: TaskFormSchema) {
    console.log(data);
  }

  console.log(users);

  const formInputs: FormSchema[] = [
    {
      renderType: "TEXT",
      key: "title",
      name: "title",
      label: "Título",
      placeholder: "Título",
      size: 6,
      defaultValue: task?.title,
    },
    {
      renderType: "SELECT",
      key: "responsible",
      name: "responsible",
      label: "Responsável",
      placeholder: "Responsável",
      description: "Responsável pela tarefa.",
      size: 6,
      defaultValue: task?.assignedId ?? "",
      options:
        users?.map(({ id, username }) => ({ id, value: username })) ?? [],
    },
    {
      renderType: "SELECT",
      key: "status",
      name: "status",
      label: "Status",
      placeholder: "Status",
      size: 6,
      defaultValue: task?.status,
      options: [
        { id: "1", value: "Em andamento" },
        { id: "2", value: "Concluída" },
        { id: "3", value: "Cancelada" },
      ],
    },
    {
      renderType: "TEXT",
      key: "date",
      name: "date",
      label: "Data de criação",
      placeholder: "Data de criação",
      size: 6,
      disabled: true,
      defaultValue: task?.createdAt.toString() ?? "",
      hidden: !isEditing,
    },
  ];

  return (
    <Form
      handleSubmitForm={handleSubmitForm}
      inputs={formInputs}
      formSchema={taskFormSchema}
      isEditing={isEditing}
    />
  );
}
