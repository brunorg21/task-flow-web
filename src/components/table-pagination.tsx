"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EntityTable } from "@/types/entityTable";

interface TablePaginationProps {
  data: any[];
  itemsPerPage: number;
  setRows: Dispatch<SetStateAction<EntityTable[]>>;
}

export function TablePagination({
  data,
  itemsPerPage,
  setRows,
}: TablePaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  useEffect(() => {
    const currentData = data.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setRows(currentData);
  }, [currentPage]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <div className="flex gap-4 items-center">
        <div className="text-sm">
          <span>{currentPage}</span> de <span>{totalPages}</span>
        </div>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button
          size={"icon"}
          variant={"outline"}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
