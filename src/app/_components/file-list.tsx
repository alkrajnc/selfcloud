import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Folder as FolderInterface, SelectFolder } from "@/server/db/schema";
import { Folder, MoreVertical, User } from "lucide-react";
import Link from "next/link";

interface FileListProps {
  folders: FolderInterface[];
}

const FileList = ({ folders }: FileListProps) => {
  return (
    <Table className="">
      <TableCaption>List of files</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left">File name</TableHead>
          <TableHead className="">Uploaded by</TableHead>
          <TableHead className="">Last modified</TableHead>
          <TableHead className="text-right">More</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {folders.map((folder, idx) => {
          return (
            <TableRow key={idx}>
              <>
                <TableCell className="flex min-w-96 max-w-fit flex-row items-center justify-start gap-2 font-medium">
                  <div className="rounded bg-accent p-2">
                    <Folder />
                  </div>
                  {folder.name}
                </TableCell>
                <TableCell className="">
                  <div className="flex flex-row items-center gap-2">
                    <div className="max-w-fit rounded-lg bg-accent p-2">
                      <User />
                    </div>
                    <div className="">
                      <p>
                        {folder.actions[0]?.user && folder.actions[0].user.name}
                      </p>
                      <p className="text-neutral-400">
                        {folder.actions[0]?.user &&
                          folder.actions[0].user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="">
                  {new Date(folder.modifyTimestamp).toLocaleString()}
                </TableCell>
                <TableCell className="flex flex-row justify-end">
                  <Button className="" variant={"ghost"}>
                    <MoreVertical />
                  </Button>
                </TableCell>
              </>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default FileList;
