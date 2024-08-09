import { auth } from "@/auth/auth";
import { BoardCard } from "@/components/board-card";

export async function UserBoard() {
  const { user } = await auth();

  return (
    <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
      <BoardCard boardId={user.id} userBoard boardName={user.username} />
    </div>
  );
}
