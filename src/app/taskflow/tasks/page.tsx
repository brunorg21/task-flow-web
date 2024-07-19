import { BoardCard } from "@/components/board-card";
import { UserBoard } from "./user-board";
import { api } from "@/lib/api";
import { cookies } from "next/headers";
import { Organization } from "@/types/organizaiton";

async function getOrganizations(token: string) {
  const response = await api("/organizations", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const { organizations }: { organizations: Organization[] } =
    await response.json();

  return organizations;
}

export default async function Boards() {
  const token = cookies().get("@token")?.value;

  await new Promise((resolve) => setTimeout(resolve, 3000));

  const organizations = await getOrganizations(token!);

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
