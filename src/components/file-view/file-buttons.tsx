"use client";

import { DownloadIcon, X } from "lucide-react";
import { Button } from "../ui/button";
import { toast } from "../ui/use-toast";
import { api } from "@/lib/api";
import { Attachment } from "@/types/attachment";
import Cookie from "js-cookie";
import { deleteAttachment } from "@/services/attachments";

interface FileButtonsProps {
  attachment: Attachment;
}

export async function downloadAttachment(fileName: string, token: string) {
  const response = await api(`/download/${fileName}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["attachments"],
    },
  });

  if (response.ok) {
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    return {
      success: true,
      data: url,
      message: "Arquivo baixado com sucesso",
    };
  } else {
    const { message } = await response.json();
    return {
      message,
      success: false,
    };
  }
}

export function FileButtons({ attachment }: FileButtonsProps) {
  const token = Cookie.get("@token");

  return (
    <div className="flex items-center gap-2">
      <Button
        type="button"
        onClick={async () => {
          const { success, data, message } = await downloadAttachment(
            attachment.fileName,
            token!
          );

          if (!success) {
            return toast({
              title: message,
              variant: "destructive",
            });
          }

          const link = document.createElement("a");
          link.href = data!;
          link.setAttribute("download", attachment.fileName);
          document.body.appendChild(link);
          link.click();
          link.parentNode?.removeChild(link);
        }}
        variant="ghost"
        size="icon"
        className="rounded-full"
      >
        <DownloadIcon className="h-5 w-5" />
        <span className="sr-only">Download</span>
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-red-500 hover:bg-red-500/10 rounded-full"
        onClick={async () => {
          const { message, success } = await deleteAttachment(attachment.id);

          if (success) {
            toast({
              title: "Anexo deletado com sucesso!",
            });
          } else {
            toast({
              title: message ?? "Erro ao deletar anexo!",
              variant: "destructive",
            });
          }
        }}
      >
        <X className="h-5 w-5" />
        <span className="sr-only">Delete</span>
      </Button>
    </div>
  );
}
