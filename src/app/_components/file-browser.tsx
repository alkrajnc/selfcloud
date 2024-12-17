import NewFolderButton from "./new-folder-modal";
import { Folder, MoreVertical, User } from "lucide-react";
import { getFolders } from "@/server/actions/folder";
import FileList from "./file-list";
import Image from "next/image";
import { getServerAuthSession } from "@/server/auth";
import { Folder as FolderInterface } from "@/server/db/schema";

const Filebrowser = async () => {
  const folders: FolderInterface[] = await getFolders();

  const user = await getServerAuthSession();

  console.log(user);

  return (
    <div className="w-full space-y-4 border p-4">
      <div className="space-x-4">
        <NewFolderButton />
        {/* <Button size={"lg"}>New File</Button> */}
      </div>
      <div className="">
        <h2 className="text-3xl font-semibold">Recent</h2>
        <div className="flex min-h-72 flex-row gap-4">
          {Array.from({ length: 4 }).map((_, idx) => {
            return (
              <div
                key={idx}
                className="min-h-44 rounded-lg border border-accent"
              >
                <div className="relative flex min-w-[25rem] flex-row items-center justify-center overflow-hidden">
                  <Image
                    src={"/test.jpg"}
                    alt="document render"
                    width={240}
                    className="z-30 backdrop-blur"
                    objectFit="contain"
                    height={150}
                  />
                  <Image
                    src={"/test.jpg"}
                    alt="document render"
                    width={240}
                    className="absolute -z-40 scale-[1.75] rounded-lg blur-sm"
                    objectFit="cover"
                    height={150}
                  />
                </div>
                <div className="rounded-b-lg border-t bg-background p-4">
                  <p className="text-xl font-medium">File name</p>
                  <p className="text-neutral-400">
                    {new Date().toLocaleString()}
                  </p>
                  <p className="text-neutral-400">type</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="">
        <h2 className="mb-2 text-3xl font-semibold">Files</h2>
        <FileList folders={folders} />
      </div>
    </div>
  );
};
export default Filebrowser;
