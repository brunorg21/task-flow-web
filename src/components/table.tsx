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

interface TableListProps {
  headCells: HeadCells[];
  entities: EntityTable[];
}

export function TableList({ headCells, entities }: TableListProps) {
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
          {entities.map((row) => (
            <TableRow key={row.id}>
              {row.contents.map((content, index) => (
                <TableCell key={index}>{content.value}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="w-full flex items-end justify-end p-1">
        <TablePagination data={entities} />
      </div>
    </div>
  );
}
