import Link from "next/link";
import { Button } from "./ui/button";
import {
  Building2,
  LayoutDashboard,
  SquareKanban,
  Workflow,
} from "lucide-react";
import { Separator } from "./ui/separator";

export function Header() {
  return (
    <div className="flex items-center justify-between space-x-4 bg-secondary-foreground p-4">
      <span className="flex items-center text-primary-foreground gap-2 text-lg font-bold">
        <Workflow size={30} /> task.flow
      </span>

      <Separator orientation="vertical" className="h-6" />
      <div className="flex gap-4 items-center w-full">
        <Button variant={"ghost"} asChild>
          <Link
            className="flex gap-2 text-primary-foreground text-lg"
            href={""}
          >
            <LayoutDashboard /> Dashboard
          </Link>
        </Button>
        <Button variant={"ghost"} asChild>
          <Link
            className="flex gap-2 text-primary-foreground text-lg"
            href={""}
          >
            <SquareKanban /> Boards
          </Link>
        </Button>

        <Button variant={"ghost"} asChild>
          <Link
            className="flex gap-2 text-primary-foreground text-lg"
            href={""}
          >
            <Building2 /> Organizações
          </Link>
        </Button>
      </div>

      <Button variant={"outline"}>Sair</Button>
    </div>
  );
}
