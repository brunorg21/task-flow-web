"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { TablePagination } from "./table-pagination";
import { HeadCells } from "@/types/headCells";
import { EntityTable } from "@/types/entityTable";
import { useState } from "react";

interface TableListProps {
  headCells: HeadCells[];
  entities: EntityTable[];
}

export function TableList({ headCells, entities }: TableListProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const currentData = entities.slice((currentPage - 1) * 10, currentPage * 10);

  return (
    <div className="border rounded-md w-full">
      <Table>
        <TableHeader>
          <TableRow>
            {headCells.map((headCell, index) => {
              return (
                <TableHead className={headCell.customStyle ?? ""} key={index}>
                  {headCell.label}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentData.map((row, index) => {
            if (index <= 9) {
              return (
                <TableRow key={row.id}>
                  {row.contents.map((content, index) => (
                    <TableCell key={index}>{content.value}</TableCell>
                  ))}
                </TableRow>
              );
            }
          })}
        </TableBody>
      </Table>
      <div className="w-full flex items-end justify-end p-1">
        <TablePagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          itemsPerPage={10}
          data={entities}
        />
      </div>
    </div>
  );
}
