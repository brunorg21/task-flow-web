import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

export function BoardCard() {
  return (
    <Link className="col-span-2" href={"/taskflow/tasks/user"}>
      <Card className="bg-primary-foreground md:hover:scale-105 hover:scale-[102%] duration-150">
        <CardHeader>
          <CardTitle className="text-lg">Gerencie suas tarefas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2">
            <Star fill="yellow" color="yellow" className="w-5 h-5" />{" "}
            <span className="text-sm font-bold">Bruno Rafael</span>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end text-sm gap-1">
          <span className="font-bold text-yellow-200">46</span> tarefas
          pendentes
        </CardFooter>
      </Card>
    </Link>
  );
}
