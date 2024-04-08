import { MoreHorizontal, Workflow } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ClientProps {
  clientId: number;
  clientName: string;
}

const Client = ({ clientId, clientName }: ClientProps) => {
  return (
    <DropdownMenu>
      <div className="flex flex-row items-center justify-between gap-4 p-4  hover:bg-secondary">
        <div className="flex flex-row items-center gap-2">
          <Workflow />
          <span>{clientName}</span>
        </div>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Client;
