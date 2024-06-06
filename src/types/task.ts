export interface Task {
  id: string;
  title: string;
  status: "Em andamento" | "Cancelada" | "Concluída";
  createdAt: Date;
  assignedId: string;
}
