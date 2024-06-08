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
  isFile: boolean;
  fileName: string;
  createTimestamp: Date;
  modifyTimestamp: Date;
  fileSize: number;
  watcherID: number;
  insertTimestamp: Date;
}

export const columns: ColumnDef<FileProps>[] = [
  {
    id: "action",
    cell: ({ row }) => {
      const fileName: string = row.getValue("fileName");
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
            <DropdownMenuItem>
              <a
                href={`https://uinstruktor.sers.si/cloud/${fileName}`}
                download
                target="_blank"
              >
                Download
              </a>
            </DropdownMenuItem>
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
    accessorKey: "fileName",
    header: "Name",
  },
  {
    accessorKey: "createTimestamp",
    header: "Created",
    cell: ({ row }) => {
      const date: string = row.getValue("createTimestamp");
      const formatted = new Date(date);
      return (
        <div className="text-left">{`${formatted.getDate()}. ${formatted.getMonth() + 1}. ${formatted.getFullYear()} ${formatted.getHours()}:${formatted.getMinutes()}:${formatted.getSeconds()}`}</div>
      );
    },
  },
  {
    accessorKey: "modifyTimestamp",
    header: "Modified",
    cell: ({ row }) => {
      const date: string = row.getValue("modifyTimestamp");
      const formatted = new Date(date);
      return (
        <div className="text-left">{`${formatted.getDate()}. ${formatted.getMonth() + 1}. ${formatted.getFullYear()} ${formatted.getHours()}:${formatted.getMinutes()}:${formatted.getSeconds()}`}</div>
      );
    },
  },
  {
    accessorKey: "fileSize",
    header: "Size",
    cell: ({ row }) => {
      const size: string = row.getValue("fileSize");
      const formatted =
        Math.round((Number(size) / 1000000) * 1000) / 1000 + " MB";
      return <div className="text-left">{formatted}</div>;
    },
  },
];
