import Link from "next/link";
import { Button } from "./ui/button";
import {
  Building2,
  LayoutDashboard,
  SquareKanban,
  Workflow,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { AccountMenu } from "./account-menu";
import { ThemeToggle } from "./theme-toggle";
import { Nav } from "./nav";

export function Header() {
  return (
    <div className="flex items-center justify-between space-x-4 bg-primary-foreground p-4">
      <span className="flex items-center gap-2 text-lg font-bold">
        <Workflow size={30} /> task.flow
      </span>

      <Separator orientation="vertical" className="h-6" />
      <div className="hidden gap-4 items-center w-full md:flex">
        <Nav to="/taskflow/dashboard">
          <LayoutDashboard /> Dashboard
        </Nav>

        <Nav to="/taskflow/boards">
          <SquareKanban /> Boards
        </Nav>

        <Nav to="/taskflow/organizations">
          <Building2 /> Organizações
        </Nav>
      </div>

      <AccountMenu />
      <ThemeToggle />
    </div>
  );
}
