"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createNewFolder } from "@/server/actions/folder";
import { Folder } from "lucide-react";
import { ChangeEvent, useState } from "react";

const NewFolderButton = () => {
    const [name, setName] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleCreateNewFolder = () => {
        setIsOpen(false);
        createNewFolder(name);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(isOpen) => setIsOpen(isOpen)}>
            <DialogTrigger asChild>
                <Button className="gap-2" size={"lg"}>
                    <Folder /> New Folder
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[40%]">
                <DialogHeader>
                    <DialogTitle>New Folder</DialogTitle>
                    <DialogDescription>
                        Add a new folder.
                    </DialogDescription>
                </DialogHeader>
                <div className="max-w-72">
                    <Label htmlFor="folderName">Folder name:</Label>
                    <Input
                        value={name}
                        onChange={handleNameChange}
                        id="folderName"
                    />
                </div>
                <DialogFooter className="sm:justify-start">
                    <Button onClick={handleCreateNewFolder}>Create</Button>
                    <DialogClose asChild>
                        <Button variant="destructive">Discard</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
export default NewFolderButton;
