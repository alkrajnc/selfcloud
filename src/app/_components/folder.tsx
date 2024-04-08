import Link from "next/link";
import React from "react";
import { Folder as FolderIcon } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface FolderProps {
  watcherName: string;
  watcherID: number;
  watcherPath: string;
  folderSize: number;
}

const Folder = (watcher: FolderProps) => {
  return (
    <Sheet>
      <ContextMenu>
        <ContextMenuTrigger>
          <Link href={`/cloud/folder/${watcher.watcherID}`}>
            <div className="flex flex-row items-center justify-between rounded-2xl border border-accent-foreground/50 px-4 py-3 transition-colors hover:bg-accent">
              <FolderIcon />
              <p>{watcher.watcherName}</p>
            </div>
          </Link>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem>Download</ContextMenuItem>
          <SheetTrigger>
            <ContextMenuItem>Properties</ContextMenuItem>
          </SheetTrigger>
          <ContextMenuItem className="text-red-500 hover:font-medium hover:text-red-500">
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{watcher.watcherName}</SheetTitle>
          <SheetDescription className="space-y-2">
            <p className="font-medium">
              <span className=" font-normal">Location: </span>
              {watcher.watcherPath}
            </p>
            <p className="font-medium">
              <span className="font-normal">Size: </span>
              {Math.round((Number(watcher.folderSize) / 1000000) * 1000) /
                1000 +
                " MB"}
            </p>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default Folder;
