import { Building2, LayoutDashboard, LayoutList } from "lucide-react";
import { Separator } from "./ui/separator";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";
import { Nav } from "./nav";

import { MenuNavigation } from "./menu-navigation";
import Image from "next/image";

export function Header() {
  return (
    <div className="flex items-center justify-between space-x-4 bg-primary-foreground p-4">
      <span className="flex items-center gap-2 text-lg">
        <Image src={"/logo.png"} alt="" width={40} height={40} />
      </span>

      <Separator orientation="vertical" className="h-6" />
      <div className="hidden gap-4 items-center w-full md:flex">
        <Nav to="/taskflow/tasks">
          <LayoutList /> Tarefas
        </Nav>

        <Nav to="/taskflow/organizations">
          <Building2 /> Organizações
        </Nav>
      </div>
      <div className="md:hidden flex">
        <MenuNavigation />
      </div>

      <AccountMenu />
      <ThemeToggle />
    </div>
  );
}
