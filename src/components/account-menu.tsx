import { auth } from "@/auth/auth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CircleUser, LogOut } from "lucide-react";
import Link from "next/link";

export async function AccountMenu() {
  const { user } = await auth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 items-center" variant="outline">
          <CircleUser size={20} />
          {user ? user.username : "Perfil"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2">
          {user?.username}
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="flex gap-2">
          <Link href={"/api/auth/logout"}>
            <LogOut size={15} />
            Sair
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
