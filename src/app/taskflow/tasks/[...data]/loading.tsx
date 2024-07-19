import { TableList } from "@/components/table";
import { TaskModal } from "@/components/task-modal/task-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { EntityTable } from "@/types/entityTable";
import { Building, PlusCircle } from "lucide-react";

export default function TaskLoading() {
  function createTable(id: string) {
    return {
      id,
      contents: [
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
      <TableList entities={rows} headCells={[]} />
    </div>
  );
}
