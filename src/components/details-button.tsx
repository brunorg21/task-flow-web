"use client";

import { Ellipsis, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog } from "./ui/dialog";

import { Button } from "./ui/button";
import { ReactNode, useState } from "react";

interface DetailsButtonProps {
  modal: ReactNode;
}

export function DetailsButton({ modal }: DetailsButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="hover:bg-secondary rounded-md p-1">
          <Ellipsis />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuItem
            asChild
            className="flex gap-2 items-center justify-center"
          >
            <Button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center justify-center gap-2 w-full"
              variant={"ghost"}
            >
              <Eye className="h-6 w-6" />
              Visualizar
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog open={isModalOpen} onOpenChange={() => setIsModalOpen(false)}>
        {modal}
      </Dialog>
    </>
  );
}
