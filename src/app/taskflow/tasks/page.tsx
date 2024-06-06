import { BoardCard } from "@/components/board-card";

export default function Boards() {
  return (
    <div className="md:grid md:grid-rows-8 p-3 space-y-6">
      <div className="row-span-4 space-y-4">
        <h1 className="text-2xl font-bold">Suas tarefas</h1>
        <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
          <BoardCard />
        </div>
      </div>

      <div className="row-span-4 space-y-4">
        <h1 className="text-2xl font-bold">Tarefas das suas organizações</h1>
        <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
          <BoardCard />
        </div>
      </div>
    </div>
  );
}
