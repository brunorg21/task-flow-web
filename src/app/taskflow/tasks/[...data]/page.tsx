import { TableList } from "@/components/table";

import { Task } from "@/types/task";
import { Building, PlusCircle } from "lucide-react";
import { BadgeStatus } from "./badge-status";
import { EntityTable } from "@/types/entityTable";
import { DetailsButton } from "@/components/details-button";
import { TaskModal } from "@/components/task-modal/task-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

interface BoardProps {
  params: {
    data: string[];
  };
}

export default function Board({ params }: BoardProps) {
  const [type, typeId] = params.data;

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
  ];

  const headCells = [
    {
      label: "Título",
      customStyle: "w-[350px]",
    },
    {
      label: "Status",
    },
    {
      label: "Responsável",
    },
    {
      label: "Data de criação",
    },
    {
      label: "",
    },
  ];

  function createTable(task: Task) {
    return {
      id: task.id,
      contents: [
        {
          value: task.title,
        },
        {
          value: <BadgeStatus task={task} />,
        },
        {
          value: task.assignedId,
        },
        {
          value: task.createdAt.toString(),
        },
        {
          value: <DetailsButton modal={<TaskModal task={task} isEditing />} />,
        },
      ],
    } as EntityTable;
  }

  const rows = tasks.map((task) => createTable(task));

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <h1 className="flex gap-2 items-center text-2xl font-bold">
          <Building className="w-7 h-7" />
          Organização 1
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" variant={"default"}>
              <PlusCircle className="w-4 h-4" />
              Nova tarefa
            </Button>
          </DialogTrigger>
          <TaskModal />
        </Dialog>
      </div>
      <TableList entities={rows} headCells={headCells} />
    </div>
  );
}
