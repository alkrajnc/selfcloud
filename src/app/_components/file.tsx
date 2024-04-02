"use client";
import { type ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

interface FileProps {
  name: string;
  filePath: string;
  createdAt: Date;
  modifiedAt: Date;
  size: number;
  isFile: boolean;
  isFolder: boolean;
  extensions: string;
}

export const columns: ColumnDef<FileProps>[] = [
  {
    id: "action",
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>

            <DropdownMenuSeparator />
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Properties</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500 hover:font-medium hover:text-red-500">
              Delete file
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },

  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      const date: string = row.getValue("createdAt");
      const formatted = new Date(date);
      return (
        <div className="text-left">{`${formatted.getDate()}. ${formatted.getMonth() + 1}. ${formatted.getFullYear()} ${formatted.getHours()}:${formatted.getMinutes()}:${formatted.getSeconds()}`}</div>
      );
    },
  },
  {
    accessorKey: "modifiedAt",
    header: "Modified",
    cell: ({ row }) => {
      const date: string = row.getValue("modifiedAt");
      const formatted = new Date(date);
      return (
        <div className="text-left">{`${formatted.getDate()}. ${formatted.getMonth() + 1}. ${formatted.getFullYear()} ${formatted.getHours()}:${formatted.getMinutes()}:${formatted.getSeconds()}`}</div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ row }) => {
      const size: string = row.getValue("size");
      const formatted =
        Math.round((Number(size) / 1000000) * 1000) / 1000 + " MB";
      return <div className="text-left">{formatted}</div>;
    },
  },
  {
    accessorKey: "extensions",
    header: "Extension",
  },
];
