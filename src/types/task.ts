import { User } from "./user";

export interface Task {
  id: string;
  title: string;
  status: "Em andamento" | "Cancelada" | "Concluída";
  createdAt: Date;
  assignedId: string | null;
  note: any[];
  attachments: any[];
  userId: string;
  assignUser: User | null;
  organizationId: string | null;
}
