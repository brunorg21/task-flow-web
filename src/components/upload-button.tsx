"use client";

import { Upload } from "lucide-react";
import { FileView } from "./file-view/file-view";
import { Button } from "./ui/button";
import { ChangeEvent, useEffect, useState } from "react";
import { Attachment, OnChangeAttachmentProps } from "@/types/attachment";
import { uploadAttachment } from "@/services/attachments";
import { toast } from "./ui/use-toast";

interface UploadFilesProps {
  onChange: (attachments: OnChangeAttachmentProps[]) => void;
  name: string;
  defaultAttachments: Attachment[];
}

export function UploadButton({
  onChange,
  name,
  defaultAttachments,
}: UploadFilesProps) {
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [prevAttachments, setPrevAttachments] = useState<File[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<{
    [key: number]: boolean;
  }>({});

  useEffect(() => {
    const combinedAttachments = [...defaultAttachments, ...attachments];

    if (combinedAttachments.length > 0 && combinedAttachments.length <= 3) {
      onChange(
        combinedAttachments.map((attachment) => {
          return {
            id: attachment.id,
            type: attachment.type,
          };
        })
      );
    }
  }, [attachments, defaultAttachments]);

  async function handleUploadAttachment(attachment: File, index: number) {
    setUploadingFiles((prev) => ({ ...prev, [index]: true }));

    const formData = new FormData();
    formData.append(`file${index}`, attachment);

    const { success, data } = await uploadAttachment(formData);

    if (success) {
      setAttachments((prevState) => [
        ...prevState,
        ...data.createdAttachments?.map((e: Attachment) => e),
      ]);
    }

    setUploadingFiles((prev) => ({ ...prev, [index]: false }));
  }

  async function handleGetAttachments(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files || []);

    if (!files) {
      return;
    }

    if (defaultAttachments.length + files.length > 3) {
      return toast({
        description: "Por favor, selecione no máximo 3 arquivos",
        variant: "default",
      });
    }

    files.map(async (file, index) => {
      await handleUploadAttachment(file, index);
    });

    setPrevAttachments(files);
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button asChild>
          <label
            className="flex gap-2 items-center cursor-pointer"
            htmlFor="task-files"
          >
            <Upload className="w-4 h-4" /> Carregar anexo
          </label>
        </Button>
        <input
          onChange={handleGetAttachments}
          multiple
          id="task-files"
          className="hidden"
          type="file"
          name={name}
        />
      </div>
      <div className="flex flex-col items-start gap-2">
        {prevAttachments.map((file, index) => (
          <div key={index}>
            {uploadingFiles[index] ? (
              <p>Uploading {file.name}...</p>
            ) : (
              <p className="text-emerald-300">{file.name} carregado!</p>
            )}
          </div>
        ))}

        {defaultAttachments.length > 0 &&
          defaultAttachments.map((attachment, i) => (
            <FileView key={i} attachment={attachment} />
          ))}
      </div>
    </div>
  );
}
