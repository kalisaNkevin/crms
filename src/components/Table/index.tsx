"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface SyndicateHeaderProps {
  title: string;
  label: string;
  onClick: () => void;
}
const Header = ({ title, label, onClick }: SyndicateHeaderProps) => (
  <div className="flex mx-4 lg:mx-0 items-center justify-between pt-5 pb-10">
    <h1 className="text-lg">{title}</h1>
    <Button size="lg" onClick={onClick} className="flex items-center gap-2">
      <Plus />
      <span>{label}</span>
    </Button>
  </div>
);

interface TableListProps<T> {
  title: string;
  label: string;
  columns: Array<string>;
  data: Array<T>;
  onClick: () => void;
  renderRow: (row: T) => React.ReactNode;
}
const TableList = <T,>({
  title,
  label,
  columns,
  data,
  onClick,
  renderRow,
}: TableListProps<T>) => {
  return (
    <div>
      <div>
        <Header title={title} label={label} onClick={onClick} />
      </div>
      <Table className="table-auto ">
        <TableHeader>
          <TableRow>
            {columns.map((column: string) => (
              <TableCell key={column} className="text-[#8c8c8c] px-4">
                {column}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: T) => (
            <TableRow key={(row as any)._id}>{renderRow(row)}</TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableList;
