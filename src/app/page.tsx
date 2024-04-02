import { api } from "@/trpc/server";
import { Progress } from "@/components/ui/progress";
import {
  Database,
  Folder,
  FolderSync,
  MoreHorizontal,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const data = await api.cloud.getInfo();
  const folders = await api.cloud.getFolders();
  console.log(data);

  return (
    <main className="flex min-h-screen flex-col p-16">
      <div className="m-4 grid aspect-square w-1/2 grid-cols-3 grid-rows-3 gap-4 self-center md:w-[45%]">
        <div className="relative col-span-1 row-span-2 overflow-hidden rounded-xl border border-neutral-200 p-4 ">
          <h3 className="text-3xl font-medium text-accent-foreground/60">
            Files Synced
          </h3>
          <h2 className="text-5xl  font-semibold text-primary">
            {data[0]?.fileCount ?? 0}
          </h2>
          <div className="  absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 -rotate-[25deg] items-center justify-center ">
            <FolderSync color="rgba(220, 220, 220, 1)" size={200} />
          </div>
        </div>
        <div className="relative col-span-2 row-span-1 flex flex-col justify-between gap-2 rounded-xl border border-neutral-200 p-4">
          <div>
            <h3 className="text-3xl font-medium text-accent-foreground/60">
              Storage Used
            </h3>
            <h2 className="text-5xl font-semibold text-primary">
              {Math.round((Number(data[0]?.fileSize) / 1000000000) * 1000) /
                1000}{" "}
              GB
              <span className="text-accent-foreground/60">/ 10GB</span>
            </h2>
          </div>
          <Progress
            className="self-end"
            value={
              Math.round((Number(data[0]?.fileSize) / 1000000000) * 1000) / 1000
            }
          />
          <div className="absolute  left-1/2 top-1/2 -z-10 flex -translate-y-1/2 -rotate-[5deg] items-center justify-center ">
            <Database color="rgba(220, 220, 220, 1)" size={200} />
          </div>
        </div>
        <div className="col-span-1 row-span-1 rounded-xl border border-neutral-200 p-4">
          <Link href={"/cloud"}>
            <Button>Browse</Button>
          </Link>
        </div>
        <div className="col-span-1 row-span-2 rounded-xl border border-neutral-200 p-4">
          <h2 className="text-2xl font-semibold text-accent-foreground/60">
            Folders
          </h2>
          <div className="flex max-h-[50vh] flex-col divide-y divide-secondary-foreground/10 overflow-y-auto px-2">
            {folders.map((folder, idx) => (
              <Link key={idx} href={`/cloud/folder/${folder.id}`}>
                <div className="flex cursor-pointer flex-row items-center gap-2 rounded-xl p-3  hover:bg-secondary">
                  <Folder />
                  <span>{folder.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="col-span-2 row-span-1 rounded-xl border border-neutral-200 p-4">
          <h2 className="text-2xl font-semibold text-accent-foreground/60">
            Clients
          </h2>
          <div className="grid grid-cols-2  gap-4">
            {Array.from({ length: 5 }, (_, idx) => (
              <div
                key={idx}
                className="flex flex-row items-center justify-between gap-4 p-4  hover:bg-secondary"
              >
                <div className="flex flex-row items-center gap-2">
                  <Workflow />
                  <span>Client</span>
                </div>
                <MoreHorizontal />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
