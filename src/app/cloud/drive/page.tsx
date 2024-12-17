import { Folder, MoreVertical, User } from "lucide-react";
import { getFolders } from "@/server/actions/folder";
import FileList from "@/app/_components/file-list";
import Image from "next/image";
import { getServerAuthSession } from "@/server/auth";
import { Folder as FolderInterface } from "@/server/db/schema";
import NewFolderButton from "@/app/_components/new-folder-modal";
import Section from "@/app/_components/section";

const Drive = async () => {
  const folders: FolderInterface[] = await getFolders();

  return (
    <div className="w-full space-y-4 p-4">
      <h1 className="text-5xl font-bold">Files</h1>
      <Section title="Recent Files"></Section>
      <Section button={<NewFolderButton />} title="Files">
        <FileList folders={folders} />
      </Section>
    </div>
  );
};
export default Drive;
