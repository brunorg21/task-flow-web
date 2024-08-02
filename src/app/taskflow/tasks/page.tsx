import { BoardCard } from "@/components/board-card";
import { UserBoard } from "./user-board";

import { getOrganizations } from "@/services/organizations";

export default async function Boards() {
  const organizations = await getOrganizations();

  return (
    <div className="md:grid md:grid-rows-8 p-3 space-y-3">
      <div className="row-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Suas tarefas</h1>
        <UserBoard />
      </div>

      <div className="row-span-4 space-y-4">
        <h1 className="text-2xl font-bold">Tarefas das suas organizações</h1>
        <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
          {organizations.length === 0 ? (
            <h1 className="col-span-4 text-2xl font-semibold">
              Você não faz parte de nenhuma organização.
            </h1>
          ) : (
            organizations.map((organization) => (
              <BoardCard
                boardId={organization.id}
                key={organization.id}
                boardName={organization.name}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
