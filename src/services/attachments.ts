"use server";

import { api } from "@/lib/api";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

const token = cookies().get("@token")?.value;
export async function uploadAttachment(formData: FormData) {
  const response = await api("/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
    next: {
      tags: ["attachments"],
    },
  });

  if (response.ok) {
    return {
      success: true,
      data: await response.json(),
      message: "Arquivo enviado com sucesso",
    };
  } else {
    return {
      message: "Erro ao enviar o arquivo",
      success: false,
    };
  }
}

export async function deleteAttachment(attachmentId: string) {
  const token = cookies().get("@token")?.value;
  const response = await api(`/attachments/${attachmentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    revalidateTag("tasks");
  } else {
    const { message } = await response.json();

    return { success: false, message };
  }

  return { success: true };
}
