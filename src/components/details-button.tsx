"use client";

import { Ellipsis, Eye, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog } from "./ui/dialog";

import { ReactNode, useState } from "react";
import { deleteOrganization } from "@/services/organizations";

interface DetailsButtonProps {
  modal: ReactNode;
  entityId: string;
}

export function DetailsButton({ modal, entityId }: DetailsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-secondary rounded-md p-1">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem
            onClick={() => setIsModalOpen((prev) => !prev)}
            className="flex gap-2 items-center justify-center font-semibold"
          >
            <Eye className="h-5 w-5" />
            Visualizar
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={async () => await deleteOrganization(entityId)}
            className="flex gap-2 items-center justify-center text-red-400 font-semibold"
          >
            <Trash className="h-5 w-5" />
            Excluir
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        {modal}
      </Dialog>
    </>
  );
}
