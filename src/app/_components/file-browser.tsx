import NewFolderButton from "./new-folder-modal";
import { Folder, MoreVertical, User } from "lucide-react";
import { getFolders } from "@/server/actions/folder";
import FileList from "./file-list";
import Image from "next/image";

const Filebrowser = async () => {
    const folders = await getFolders();

    return (
        <div className="border w-full  p-4 space-y-4">
            <div className="space-x-4 ">
                <NewFolderButton />
                {/* <Button size={"lg"}>New File</Button> */}
            </div>
            <div className="">
                <h2 className="text-3xl font-semibold">Recent</h2>
                <div className=" min-h-72 flex flex-row gap-4">
                    {Array.from({ length: 4 }).map((_, idx) => {
                        return (
                            <div
                                key={idx}
                                className="min-h-44 border-accent border rounded-lg"
                            >
                                <div className="min-w-[25rem] relative overflow-hidden flex flex-row items-center justify-center">
                                    <Image
                                        src={"/test.jpg"}
                                        alt="document render"
                                        width={240}
                                        className=" z-30 backdrop-blur"
                                        objectFit="contain"
                                        height={150}
                                    />
                                    <Image
                                        src={"/test.jpg"}
                                        alt="document render"
                                        width={240}
                                        className="absolute rounded-lg blur-sm scale-[1.75] -z-40"
                                        objectFit="cover"
                                        height={150}
                                    />
                                </div>
                                <div className="bg-background rounded-b-lg border-t p-4">
                                    <p className="text-xl font-medium">
                                        File name
                                    </p>
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
                <h2 className="text-3xl font-semibold mb-2">Files</h2>
                <FileList folders={folders} />
            </div>
        </div>
    );
};
export default Filebrowser;
