import { Droppable } from "@hello-pangea/dnd";
import { DraggableCard } from "./draggable-card";

interface TableListProps {
  data: {
    id: number;
    title: string;
  }[];
  task: {
    id: number;
    status: string;
  };
}

export function TableList({ data, task }: TableListProps) {
  const color =
    task.status === "Em andamento"
      ? "text-yellow-500"
      : task.status === "Concluídas"
      ? "text-green-500"
      : "text-red-500";

  return (
    <Droppable type="table-list" droppableId={String(task.id)}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="col-span-4 p-4 space-y-2 bg-primary-foreground rounded-md"
        >
          <h1 className={`text-md ${color} font-bold`}>{task.status}</h1>
          {data.map((task, index) => {
            return <DraggableCard index={index} task={task} key={task.id} />;
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
