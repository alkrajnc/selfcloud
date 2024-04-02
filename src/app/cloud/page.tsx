import { api } from "@/trpc/server";
import { columns } from "@/app/_components/file";
import { DataTable } from "@/components/ui/data-table";

export default async function Home() {
  const files = await api.files.getFiles();

  return (
    <main className="flex min-h-screen flex-col">
      <DataTable columns={columns} data={files} />
    </main>
  );
}
