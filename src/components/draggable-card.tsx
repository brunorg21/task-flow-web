"use client";

import { Draggable } from "@hello-pangea/dnd";

interface DraggableCardProps {
  task: {
    id: number;
    title: string;
  };
  index: number;
}

export function DraggableCard({ index, task }: DraggableCardProps) {
  return (
    <Draggable draggableId={String(task.id)} index={index}>
      {(provided) => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="flex flex-col bg-secondary p-4 rounded-md space-y-4"
        >
          <div className="flex items-center justify-between text-sm">
            {task.title}
            <span className="flex items-center gap-2">
              {new Date().getFullYear()}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm font-bold">
            Responsável:
            <span className="text-md font-normal">Bruno Rafael</span>
          </div>
        </div>
      )}
    </Draggable>
  );
}
