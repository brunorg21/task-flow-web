"use client";

import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  data: any[];
}

export function TablePagination({ data }: TablePaginationProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="text-sm">
        <span>1</span> de <span>11</span>
      </div>
      <Button size={"icon"} variant={"outline"}>
        <ChevronLeft className="w-4 h-4" />
      </Button>
      <Button size={"icon"} variant={"outline"}>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
