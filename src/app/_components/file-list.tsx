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
import { SelectFolder } from "@/server/db/schema";
import { Folder, MoreVertical, User } from "lucide-react";
import Link from "next/link";

interface FileListProps {
    folders: SelectFolder[];
}

const FileList = ({ folders }: FileListProps) => {
    console.log(folders);
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
                                <TableCell className="flex-row max-w-fit min-w-96 justify-start flex items-center gap-2 font-medium">
                                    <div className="p-2 bg-accent rounded">
                                        <Folder />
                                    </div>
                                    {folder.name}
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex flex-row  items-center gap-2">
                                        <div className=" max-w-fit bg-accent p-2 rounded-lg">
                                            <User />
                                        </div>
                                        <div className="">
                                            <p>Firstname Lastname</p>
                                            <p className="text-neutral-400">
                                                first.last@mailprovider.com
                                            </p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    {new Date(folder.modifyTimestamp)
                                        .toLocaleString()}
                                </TableCell>
                                <TableCell className="flex flex-row  justify-end">
                                    <Button
                                        className=""
                                        variant={"ghost"}
                                    >
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
