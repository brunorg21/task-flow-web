import { TableList } from "@/components/table";

import { Task } from "@/types/task";
import { Building, PlusCircle } from "lucide-react";
import { BadgeStatus } from "./badge-status";
import { EntityTable } from "@/types/entityTable";
import { DetailsButton } from "@/components/details-button";
import { TaskModal } from "@/components/task-modal/task-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";

import { format } from "date-fns";
import { getUsersByOrganization } from "@/services/user-organization";
import { getTasks } from "@/services/tasks";

interface BoardProps {
  params: {
    data: string[];
  };
}

export default async function Board({ params }: BoardProps) {
  const [_, slug, orgId] = params.data;

  const tasks = await getTasks(orgId);
  const users = await getUsersByOrganization(slug);

  const headCells = [
    {
      label: "Título",
      customStyle: "w-[350px]",
    },
    {
      label: "Status",
    },
    {
      label: "Atribuido á",
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
          value: task.assignUser?.username ?? "N/A",
        },
        {
          value: format(task.createdAt, "dd/MM/yyyy"),
        },
        {
          value: (
            <DetailsButton
              modal={
                <TaskModal orgId={orgId} users={users} task={task} isEditing />
              }
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
          {decodeURIComponent(slug)}
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2" variant={"default"}>
              <PlusCircle className="w-4 h-4" />
              Nova tarefa
            </Button>
          </DialogTrigger>
          <TaskModal orgId={orgId} users={users} />
        </Dialog>
      </div>
      <TableList entities={rows} headCells={headCells} />
    </div>
  );
}
