"use server";

import { api } from "@/lib/api";
import { Note } from "@/types/note";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function getAnnotations(taskId: string) {
  const token = cookies().get("@token")?.value;

  const response = await api(`/notes/tasks/${taskId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["notes"],
    },
  });

  const { notes }: { notes: Note[] } = await response.json();

  return notes;
}

export async function createAnnotation({
  description,
  taskId,
}: Omit<Note, "createdAt" | "id" | "attachments" | "user">) {
  const token = cookies().get("@token")?.value;
  const response = await api("/notes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      taskId,
    }),
  });

  if (response.ok) {
    revalidateTag("notes");
  }

  const { message } = await response.json();

  return { success: !!response.ok, message };
}

// export async function deleteAnnotation(orgId: string) {
//   const token = cookies().get("@token")?.value;
//   const response = await api(`/notes/${orgId}`, {
//     method: "DELETE",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (response.ok) {
//     revalidateTag("annotations");
//   }

//   return { success: !!response.ok };
// }
