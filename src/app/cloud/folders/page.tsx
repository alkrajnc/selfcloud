import Folder from "@/app/_components/folder";
import { api } from "@/trpc/server";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getFolders } from "@/server/api";

const Folders = async () => {
  const watchers = await getFolders();
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Folders</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-1 gap-6 py-4 md:grid-cols-6">
        {watchers.map((watcher, idx) => {
          return (
            <Folder
              key={idx}
              watcherName={watcher.watcherName}
              watcherID={watcher.watcherID}
              watcherPath={watcher.watcherPath!}
              folderSize={watcher.folderSize}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Folders;
