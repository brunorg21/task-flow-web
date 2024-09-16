"use server";

import { api } from "@/lib/api";

import { Task } from "@/types/task";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createTask({
  assignedId,
  status,
  title,
  organizationId,
  attachments,
}: Omit<Task, "createdAt" | "id" | "userId" | "assignUser" | "note">) {
  const token = cookies().get("@token")?.value;
  const response = await api("/tasks", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assignedId,
      status,
      title,
      organizationId,
      attachments,
    }),
  });

  if (response.ok) {
    revalidateTag("tasks");
    revalidateTag("tasks-by-user");
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}

async function getTasksByOrganization(organizationId: string) {
  const token = cookies().get("@token")?.value;

  const response = await api(`/tasks/organization/${organizationId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["tasks"],
    },
  });

  const { tasks }: { tasks: Task[] } = await response.json();

  return tasks;
}

export async function getTasks(organizationId: string | null) {
  if (!organizationId) {
    return await getTasksByUser();
  }

  return await getTasksByOrganization(organizationId);
}

async function getTasksByUser() {
  const token = cookies().get("@token")?.value;

  const response = await api("/tasks/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["tasks-by-user"],
    },
  });

  const { tasks }: { tasks: Task[] } = await response.json();

  return tasks;
}

export async function deleteTask(taskId: string) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    revalidateTag("tasks");
    revalidateTag("tasks-by-user");
  } else {
    const { message } = await response.json();

    return { success: false, message };
  }

  return { success: true };
}

export async function updateTask({
  assignedId,
  attachments,
  status,
  title,
  id,
}: Omit<
  Task,
  "createdAt" | "assignUser" | "note" | "organizationId" | "userId"
>) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/tasks/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      assignedId,
      attachments,
      status,
      title,
    }),
  });

  if (response.ok) {
    revalidateTag("tasks");
    revalidateTag("tasks-by-user");
    return {
      success: !!response.ok,
      message: "Tarefa atualizada com sucesso!",
    };
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}
