"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { EntityTable } from "@/types/entityTable";

interface TablePaginationProps {
  data: any[];
  itemsPerPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  currentPage: number;
}

export function TablePagination({
  data,
  itemsPerPage,
  setCurrentPage,
  currentPage
}: TablePaginationProps) {
  const totalPages = Math.ceil(data.length / itemsPerPage);



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
        <div className="flex text-sm gap-2">
          <div>
            <span>{data.length} itens</span>
          </div>
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
