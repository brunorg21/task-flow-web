import { TaskTable } from "@/components/task-table";

interface BoardProps {
  params: {
    data: string[];
  };
}

export default function Board({ params }: BoardProps) {
  const [type, typeId] = params.data;

  console.log({
    type,
    typeId,
  });

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Organização 1</h1>

      <TaskTable />
    </div>
  );
}
