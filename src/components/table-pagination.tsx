"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TablePaginationProps {
  data: any[];
}

export function TablePagination({ data }: TablePaginationProps) {
  const itemsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);

  const count = data.length;
  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex gap-4 items-center">
      <Button size={"icon"} variant={"outline"}>
        <ChevronLeft className="w-5 h-5" />
      </Button>
      <Button variant={"outline"} size={"icon"}>
        1
      </Button>
      <Button variant={"outline"} size={"icon"}>
        2
      </Button>
      <Button variant={"outline"} size={"icon"}>
        3
      </Button>

      <Button size={"icon"} variant={"outline"}>
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  );
}
