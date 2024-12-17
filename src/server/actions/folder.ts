"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import {
  actions,
  fileRelations,
  files,
  Folder,
  InsertFolder,
} from "../db/schema";
import { and, eq } from "drizzle-orm";
import { getServerAuthSession } from "../auth";
import { getServerSession } from "next-auth";

export async function getFolders() {
  const folderData = await db.query.files.findMany({
    orderBy: (files, { asc }) => [asc(files.name)],
    with: {
      actions: {
        with: {
          user: {
            columns: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return folderData as Folder[];
}

export async function createNewFolder(folderName: string) {
  const session = await getServerAuthSession();

  const existingFolder = (
    await db
      .select()
      .from(files)
      .where(and(eq(files.name, folderName), eq(files.isFile, false)))
  )[0];
  if (folderName.length > 0 && !existingFolder) {
    await db.insert(files).values({
      name: folderName,
      isFile: false,
      size: 0,
      modifyTimestamp: new Date(),
      createTimestamp: new Date(),
      insertTimestamp: new Date(),
    });

    const newFile = await db.query.files.findFirst({
      where: (files, { eq }) => eq(files.name, folderName),
    });

    await db.insert(actions).values({
      fileId: newFile?.id!,
      type: "create",
      timestamp: new Date(),
      userId: session?.user.id!,
    });
  } else {
    return { error: "Folder name length to small." };
  }
  revalidatePath("/cloud/drive");
}
