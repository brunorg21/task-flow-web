"use client";

import { FormSchema } from "@/types/form-schema";
import { Form } from "../form";
import { z } from "zod";
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { createTask } from "@/services/tasks";
import { toast } from "../ui/use-toast";

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
  users: User[];
  orgId?: string;
}

const taskFormSchema = z.object({
  title: z.string(),
  responsibleId: z
    .string({
      message: "Insira um responsável pela tarefa.",
    })
    .nullish(),
  statusId: z
    .enum(["1", "2", "3"], {
      message: "Insira um status válido.",
    })
    .default("1"),
});

type TaskFormSchema = z.infer<typeof taskFormSchema>;

export function TaskForm({ task, isEditing, users, orgId }: TaskFormProps) {
  const statusOptions = [
    { id: "1", value: "Em andamento" },
    { id: "2", value: "Concluída" },
    { id: "3", value: "Cancelada" },
  ];

  async function handleSubmitForm(data: TaskFormSchema) {
    if (!isEditing) {
      const response = await createTask({
        assignedId: data.responsibleId ?? null,
        attachments: [],
        organizationId: orgId ?? null,
        title: data.title,
        status: "Em andamento",
      });

      if (response.success) {
        toast({
          title: "Tarefa criada com sucesso!",
        });
      } else {
        toast({
          title: response.message ?? "Erro ao criar tarefa!",
          variant: "destructive",
        });
      }
    }
  }

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
      key: "responsibleId",
      name: "responsibleId",
      label: "Atribuido á",
      placeholder: "Responsável",
      description: "Responsável pela tarefa.",
      size: 6,
      disabled: !orgId,
      defaultValue: task?.assignedId ?? "",
      options:
        users?.map(({ id, username }) => ({ id, value: username })) ?? [],
    },
    {
      renderType: "SELECT",
      key: "statusId",
      name: "statusId",
      label: "Status",
      placeholder: "Status",
      size: 6,
      defaultValue:
        statusOptions.find((status) => status.value === task?.status)?.id ?? "",
      options: statusOptions,
      disabled: !isEditing,
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
