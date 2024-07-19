export interface Task {
  id: string;
  title: string;
  status: "Em andamento" | "Cancelada" | "Concluída";
  createdAt: Date;
  assignedId: string | null;
  note: any[];
  attachment: any[];
  userId: string;
  assignUser: string;
}
