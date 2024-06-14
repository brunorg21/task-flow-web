import { Ellipsis, Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Dialog, DialogTrigger } from "./ui/dialog";

import { Button } from "./ui/button";
import { ReactNode } from "react";

interface DetailsButtonProps {
  modal: ReactNode;
}

export function DetailsButton({ modal }: DetailsButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="hover:bg-secondary rounded-md p-1">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem asChild className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2" variant={"ghost"}>
                <Eye className="h-6 w-6" />
                Visualizar
              </Button>
            </DialogTrigger>
            {modal}
          </Dialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
