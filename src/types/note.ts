import { User } from "./user";

export interface Note {
  id: string;
  description: string;
  createdAt: Date;
  taskId: string;
  attachments: any[];
  user: User;
}
