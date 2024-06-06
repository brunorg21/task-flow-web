import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@/types/task";
import { Badge } from "./ui/badge";
import { GripHorizontal } from "lucide-react";
import { TablePagination } from "./table-pagination";

const tasks: Task[] = [
  {
    id: "m5gr84i9",
    assignedId: "1sasas",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 1",
  },
  {
    id: "3u1reuv4",
    assignedId: "saioshao",
    createdAt: new Date(),
    status: "Cancelada",
    title: "Tarefa 2",
  },
  {
    id: "derv1ws0",
    assignedId: "dubngvdfiogdf",
    createdAt: new Date(),
    status: "Concluída",
    title: "Tarefa 3",
  },
  {
    id: "5kma53ae",
    assignedId: "gwspfomsdf",
    createdAt: new Date(),
    status: "Concluída",
    title: "Tarefa 6",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
  {
    id: "bhqecj4p",
    assignedId: "asassa",
    createdAt: new Date(),
    status: "Em andamento",
    title: "Tarefa 8",
  },
];

export function TaskTable() {
  return (
    <div className="border rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[350px]">Título</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Responsável</TableHead>
            <TableHead>Data de criação</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.title}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    task.status === "Cancelada"
                      ? "text-red-400 border-red-200"
                      : task.status === "Em andamento"
                      ? "text-yellow-400 border-yellow-200"
                      : "text-green-400 border-green-200"
                  }`}
                  variant={"outline"}
                >
                  {task.status}
                </Badge>
              </TableCell>
              <TableCell>{task.assignedId}</TableCell>
              <TableCell>{task.createdAt.toString()}</TableCell>
              <TableCell className="text-right">
                <GripHorizontal />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex items-end justify-end p-1">
        <TablePagination data={tasks} />
      </div>
    </div>
  );
}
