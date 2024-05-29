import {
  AlignJustify,
  Building2,
  LayoutDashboard,
  SquareKanban,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Nav } from "./nav";

export function MenuNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="flex gap-2 items-center" variant="outline">
          <AlignJustify size={20} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <div className="gap-2 w-full flex flex-col p-4">
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
