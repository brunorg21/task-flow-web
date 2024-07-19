"use client";

import { BoardCard } from "@/components/board-card";
import { useAuth } from "@/providers/auth-provider";

export function UserBoard() {
  const { user } = useAuth();

  return (
    <div className="md:grid md:grid-cols-12 gap-4 flex flex-col">
      {user ? (
        <BoardCard boardId={user.id} userBoard boardName={user.username} />
      ) : (
        "Carregando..."
      )}
    </div>
  );
}
