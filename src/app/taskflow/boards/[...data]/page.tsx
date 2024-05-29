import { DragTable } from "@/components/drag-table";

interface BoardProps {
  params: {
    data: string[];
  };
}

export default function Board({ params }: BoardProps) {
  const [type, typeId] = params.data;

  return (
    <div className="flex items-center justify-center">
      <DragTable />
    </div>
  );
}
