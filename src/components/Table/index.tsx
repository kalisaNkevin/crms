"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "../ui/input";
import { ICustomerSchema } from "@/types";

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

interface SearchInputProps {
  searchQuery: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchQuery, handleSearchChange }) => {
  return (
    <div className="flex justify-end mb-4 relative">
      <Input
        type="search"
        prefix="search"
        size={20}
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="🔎 Search by name or email"
        className="border border-gray-300 p-2 pl-2 rounded-md"
      />
    </div>
  );
};
interface TableListProps<T extends ICustomerSchema> {
  title: string;
  label: string;
  columns: Array<string>;
  data: Array<T>;
  onClick: () => void;
  renderRow: (row: T) => React.ReactNode;
  totalItems: number;
  itemsPerPage: number;
}

const TableList = <T extends ICustomerSchema,>({
  title,
  label,
  columns,
  data,
  onClick,
  renderRow,
  totalItems,
  itemsPerPage,
}: TableListProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);  // Track current page
  const [searchQuery, setSearchQuery] = useState(""); // Track search query

  const totalPages = Math.ceil(totalItems / itemsPerPage);  // Calculate total pages
  const filteredData = data.filter((item) => {
    const customer = item as ICustomerSchema;
    const searchLower = searchQuery.toLowerCase();
    return (
      customer.email.toLowerCase().includes(searchLower) ||
      customer.first_name.toLowerCase().includes(searchLower) ||
      customer.last_name.toLowerCase().includes(searchLower)
    );
  });

  const filteredTotalItems = filteredData.length; // Total items after filtering
  const filteredTotalPages = Math.ceil(filteredTotalItems / itemsPerPage);

  const paginatedData = useMemo(() => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    return filteredData.slice(startIdx, endIdx); // Slice data based on page
  }, [currentPage, filteredData, itemsPerPage]);


  // Handle page change
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= filteredTotalPages) {
      setCurrentPage(page);
    }
  };

  // Handle search query input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset to the first page on search
  };

  return (
    <div>
      <Header title={title} label={label} onClick={onClick} />
      <SearchInput searchQuery={searchQuery} handleSearchChange={handleSearchChange} />
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
          {paginatedData.map((row: T) => (
            <TableRow key={(row as any)._id}>{renderRow(row)}</TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination controls */}
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => handlePageChange(currentPage - 1)}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, idx) => (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                onClick={() => handlePageChange(idx + 1)}
                className={currentPage === idx + 1 ? "font-bold text-primary hover:text-primary" : ""}
              >
                {idx + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          {totalPages > 5 && <PaginationEllipsis />}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => handlePageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TableList;
