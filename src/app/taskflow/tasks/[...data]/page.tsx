import { TableList } from "@/components/table";

import { Task } from "@/types/task";
import { Building, PlusCircle } from "lucide-react";
import { BadgeStatus } from "./badge-status";
import { EntityTable } from "@/types/entityTable";
import { DetailsButton } from "@/components/details-button";
import { TaskModal } from "@/components/task-modal/task-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { format } from "date-fns";

interface BoardProps {
  params: {
    data: string[];
  };
}

export async function getTasksByUser(token: string) {
  await new Promise((resolve) => setTimeout(resolve, 3000));

  const response = await api("/tasks/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { tasks }: { tasks: Task[] } = await response.json();

  return tasks;
}

export default async function Board({ params }: BoardProps) {
  const token = cookies().get("@token")?.value;
  const [type, name, typeId] = params.data;

  console.log(params);

  const tasks = await getTasksByUser(token!);

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
          value: task.assignUser ?? "N/A",
        },
        {
          value: format(task.createdAt, "dd/MM/yyyy"),
        },
        {
          value: (
            <DetailsButton
              entityId={task.id}
              modal={<TaskModal task={task} isEditing />}
            />
          ),
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
          {name}
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
