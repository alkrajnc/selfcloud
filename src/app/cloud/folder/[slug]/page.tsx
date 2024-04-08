import { DataTable } from "@/components/ui/data-table";
import { api } from "@/trpc/server";
import { columns } from "@/app/_components/file";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const SlugFolder = async ({ params }: { params: { slug: string } }) => {
  const data = await api.cloud.getFolderData(params.slug);
  const folderInfo = (await api.cloud.getFolderInfo(params.slug))[0];
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/cloud/folders">Folders</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{folderInfo?.watcherName}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default SlugFolder;
