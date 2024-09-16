import { FileIcon } from "lucide-react";

import { Card, CardContent } from "../ui/card";
import { Attachment } from "@/types/attachment";
import { format } from "date-fns";
import { FileButtons } from "./file-buttons";

interface FileViewProps {
  attachment: Attachment;
}

export function FileView({ attachment }: FileViewProps) {
  return (
    <Card className="w-full max-w-md">
      <CardContent className="grid grid-cols-[auto_1fr_auto] items-center gap-2 py-1 px-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-muted">
          <FileIcon className="h-4 w-4 text-muted-foreground" />
        </div>
        <div className="space-y-0.5">
          <p className="text-sm font-medium">{attachment.fileName}</p>
          <p className="text-sm text-muted-foreground">
            {format(new Date(attachment.createdAt), "dd/MM/yyyy")}
          </p>
        </div>
        <FileButtons attachment={attachment} />
      </CardContent>
    </Card>
  );
}
