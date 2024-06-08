import { Computer, MoreHorizontal, Smartphone, Workflow } from "lucide-react";
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
import Link from "next/link";

interface ClientProps {
  clientId: number;
  clientName: string;
  clientType: "windows" | "linux" | "android";
}

const Client = ({ clientName, clientType, clientId }: ClientProps) => {
  return (
    <DropdownMenu>
      <div className="flex flex-row items-center justify-between gap-4 p-4  hover:bg-secondary">
        <div className="flex flex-row items-center gap-2">
          {clientType === "windows" ? (
            <Computer />
          ) : clientType === "linux" ? (
            <Computer />
          ) : (
            <Smartphone />
          )}
          <span>{clientName}</span>
        </div>
        <DropdownMenuTrigger>
          <MoreHorizontal />
        </DropdownMenuTrigger>
      </div>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/client/${clientId}`}>View</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <span className="cursor-pointer text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Client;
