import { Progress } from "@/components/ui/progress";
import { Database, Folder, FolderSync } from "lucide-react";
import Link from "next/link";
import Client from "../_components/client";
import { Button } from "@/components/ui/button";
import { getClients, getFolders, getInfo } from "@/server/api";

export default async function Home() {
  const data = await getInfo();
  const watchers = await getFolders();
  const clients = await getClients();

  return (
    <main className="flex h-full flex-col max-w-[1200px]">
      <div className="grid w-full grid-cols-1 gap-4 self-center md:aspect-square md:grid-cols-3 md:grid-rows-3">
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 p-4 ">
          <h3 className="text-3xl font-medium text-accent-foreground/60">
            Files Synced
          </h3>
          <h2 className="text-5xl  font-semibold text-primary">
            {data[0]?.fileCount ?? 0}
          </h2>
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-y-1/2 translate-x-3/4 -rotate-[25deg] items-center justify-center md:-translate-x-1/2 ">
            <FolderSync
              color="rgba(220, 220, 220, 1)"
              className="hidden md:block"
              size={200}
            />
            <FolderSync
              color="rgba(220, 220, 220, 1)"
              className=" md:hidden"
              size={100}
            />
          </div>
        </div>
        <div className=" relative flex flex-col justify-between gap-2 overflow-hidden rounded-xl border border-neutral-200 p-4 ">
          <div>
            <h3 className="text-3xl font-medium text-accent-foreground/60">
              Storage Used
            </h3>
            <h2 className="text-5xl font-semibold text-primary">
              {Math.round((Number(data[0]?.fileSize) / 1000000000) * 1000) /
                1000} GB
              <span className="text-accent-foreground/60">/ 10GB</span>
            </h2>
          </div>
          <Progress
            className="self-end"
            value={Math.round((Number(data[0]?.fileSize) / 1000000000) * 1000) /
              1000}
          />
          <div className="absolute left-1/2 top-1/2 -z-10 flex -translate-y-1/2 translate-x-3/4 -rotate-[25deg] items-center justify-center md:-translate-x-1/2 ">
            <Database
              color="rgba(220, 220, 220, 1)"
              className="hidden md:block"
              size={200}
            />
            <Database
              color="rgba(220, 220, 220, 1)"
              className=" md:hidden"
              size={100}
            />
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 p-4">
        </div>
        <div className="rounded-xl border border-neutral-200 p-4">
          <h2 className="text-2xl font-semibold text-accent-foreground/60">
            Folders
          </h2>
          <div className="flex max-h-[50vh] flex-col divide-y divide-secondary-foreground/10 overflow-y-auto px-2">
            {watchers.map((folder, idx) => (
              <Link key={idx} href={`/cloud/folder/${folder.watcherID}`}>
                <div className="flex cursor-pointer flex-row items-center gap-2 rounded-xl p-3  hover:bg-secondary">
                  <Folder />
                  <span>{folder.watcherName}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-neutral-200 p-4">
          <div className="flex flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold text-accent-foreground/60">
              Clients
            </h2>
            <Link href={"/add-client"}>
              <Button variant={"link"}>Add Client</Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-4  md:grid-cols-2">
            {clients.map((client, idx) => (
              <Client
                key={idx}
                clientId={client.clientID}
                clientType={client.clientPlatform as
                  | "windows"
                  | "linux"
                  | "android"}
                clientName={client.clientName}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
