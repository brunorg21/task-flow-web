"use client";

import { TableList } from "@/components/table";
import { TaskModal } from "@/components/task-modal/task-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EntityTable } from "@/types/entityTable";
import { PlusCircle } from "lucide-react";

export default function OrganizationLoading() {
  const headCells = [
    {
      label: "Nome",
    },

    {
      label: "Data de criação",
    },
    {
      label: "",
      customStyle: "w-[30px]",
    },
  ];
  function createTable(id: string) {
    return {
      id,
      contents: [
        {
          value: <Skeleton className="w-full h-8" />,
        },
        {
          value: <Skeleton className="w-full h-8" />,
        },
        {
          value: <Skeleton className="w-full h-8" />,
        },
        {
          value: <Skeleton className="w-full h-8" />,
        },
      ],
    } as EntityTable;
  }
  const rows = Array.from({ length: 10 }).map((e, index) => {
    return createTable(index.toString());
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-end items-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              disabled
              className="flex items-center gap-2"
              variant={"default"}
            >
              <PlusCircle className="w-4 h-4" />
              Nova organização
            </Button>
          </DialogTrigger>
          <TaskModal />
        </Dialog>
      </div>
      <TableList entities={rows} headCells={headCells} />
    </div>
  );
}
