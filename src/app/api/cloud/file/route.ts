import { checkClientSecret } from "@/lib/auth";
import { db } from "@/server/db";
import { files, watcher } from "@/server/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

interface File {
  fileName: string;
  fileSize: number;
  isFile: boolean;
  modifyTimestamp: string;
  createTimestamp: string;
  insertTimestamp: string;
  watcherID: number;
}

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: { file: File } = await request.json();

  if (!(await checkClientSecret(request))) {
    return NextResponse.json({ message: "Invalid secret" });
  }
  console.log(body);
  await db.insert(files).values({
    fileName: body.file.fileName,
    fileSize: body.file.fileSize,
    isFile: body.file.isFile,
    modifyTimestamp: new Date(body.file.modifyTimestamp),
    createTimestamp: new Date(body.file.createTimestamp),
    insertTimestamp: new Date(body.file.insertTimestamp),
    watcherID: body.file.watcherID,
  });
  return NextResponse.json({ message: "File added" });
}

export async function GET(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  if (!(await checkClientSecret(request))) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
  const watchers = db
    .select({ watcherId: watcher.watcherID })
    .from(watcher)
    .where(eq(watcher.clientID, Number(request.headers.get("X-Client-Id"))));

  const fileList = await db
    .select()
    .from(files)
    .where(inArray(files.watcherID, watchers));

  return NextResponse.json({ fileList }, { status: 200 });
}
