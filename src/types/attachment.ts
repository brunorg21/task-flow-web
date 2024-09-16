export interface Attachment {
  id: string;
  fileName: string;
  url: string;
  taskId: string | null;
  noteId: string | null;
  createdAt: Date;
  type: string;
}

export interface OnChangeAttachmentProps {
  id: string;
  type: string;
}
