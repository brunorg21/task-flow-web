"use client";

import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import { TableList } from "./table-list";
import { useState } from "react";

const tasks = [
  {
    id: 1,
    status: "Em andamento",
    data: [
      {
        id: 1,
        title: "Tarefa 1",
      },
      {
        id: 2,
        title: "Tarefa 2",
      },
      {
        id: 3,
        title: "Tarefa 3",
      },
      {
        id: 4,
        title: "Tarefa 4",
      },
      {
        id: 5,
        title: "Tarefa 5",
      },
    ],
  },
  {
    id: 2,
    status: "Canceladas",
    data: [
      {
        id: 6,
        title: "Tarefa 6",
      },
      {
        id: 7,
        title: "Tarefa 7",
      },
      {
        id: 8,
        title: "Tarefa 8",
      },
      {
        id: 9,
        title: "Tarefa 9",
      },
      {
        id: 10,
        title: "Tarefa 10",
      },
    ],
  },
  {
    id: 3,
    status: "Concluídas",
    data: [
      {
        id: 11,
        title: "Tarefa 11",
      },
      {
        id: 12,
        title: "Tarefa 12",
      },
      {
        id: 13,
        title: "Tarefa 13",
      },
      {
        id: 14,
        title: "Tarefa 14",
      },
      {
        id: 15,
        title: "Tarefa 15",
      },
    ],
  },
];

export function DragTable() {
  const [data, setData] = useState(tasks);

  function onDragEnd(result: DropResult) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const updatedData = [...data];

    const sourceListIndex = updatedData.findIndex(
      (task) => task.id === Number(source.droppableId)
    );
    const destinationListIndex = updatedData.findIndex(
      (task) => task.id === Number(destination.droppableId)
    );

    const sourceList = updatedData[sourceListIndex];
    const destinationList = updatedData[destinationListIndex];

    const [movedItem] = sourceList.data.splice(source.index, 1);

    destinationList.data.splice(destination.index, 0, movedItem);

    setData(updatedData);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-12 w-full p-4 h-full gap-4">
        {data.map((task) => {
          return <TableList data={task.data} task={task} key={task.id} />;
        })}
      </div>
    </DragDropContext>
  );
}
