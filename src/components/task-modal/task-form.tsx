"use client";

import { FormSchema } from "@/types/form-schema";
import { Form } from "../form";
import { z } from "zod";
import { Task } from "@/types/task";
import { User } from "@/types/user";
import { createTask, updateTask } from "@/services/tasks";
import { toast } from "../ui/use-toast";

interface TaskFormProps {
  task?: Task;
  isEditing?: boolean;
  users: User[];
  orgId?: string;
}

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const taskFormSchema = z.object({
  title: z.string(),
  responsibleId: z
    .string({
      message: "Insira um responsável pela tarefa.",
    })
    .nullable(),
  statusId: z
    .enum(["1", "2", "3"], {
      message: "Insira um status válido.",
    })
    .default("1"),
  attachments: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
      })
    )
    .refine((file) =>
      file.map(
        (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
        "Somente formatos .jpg, .jpeg e .png são suportados."
      )
    )
    .refine((files) => files?.length <= 3, "Número de anexos atingido. Máx.: 3")
    .default([]),
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
        assignedId: data.responsibleId === "" ? null : data.responsibleId,
        attachments: data.attachments.map((attachment) => attachment.id) ?? [],
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
    } else if (isEditing && task) {
      const response = await updateTask({
        assignedId: data.responsibleId === "" ? null : data.responsibleId,
        attachments: data.attachments.map((attachment) => attachment.id) ?? [],
        title: data.title,
        status:
          (statusOptions.find((item) => item.id === data.statusId)?.value as
            | "Em andamento"
            | "Concluída"
            | "Cancelada") ?? "Em andamento",
        id: task.id,
      });
      if (response.success) {
        toast({
          title: "Tarefa atualizada com sucesso!",
        });
      } else {
        toast({
          title: response.message ?? "Erro ao atualizar tarefa!",
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
        statusOptions.find((status) => status.value === task?.status)?.id ??
        "1",
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
    {
      renderType: "UPLOAD",
      key: "attachments",
      type: "file",
      name: "attachments",
      label: "Anexos",
      size: 6,
      defaultAttachments: task?.attachments ?? [],
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
