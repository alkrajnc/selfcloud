"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { actions, fileRelations, files, InsertFolder } from "../db/schema";
import { and, eq } from "drizzle-orm";

export async function getFolders() {
    //const folderData = await db.select().from(files);
    const folderData = await db.query.files.findMany({
        with: { actions: true },
    });

    return folderData;
}

export async function createNewFolder(folderName: string) {
    const existingFolder = (await db.select().from(files).where(
        and(eq(files.name, folderName), eq(files.isFile, false)),
    ))[0];
    if (folderName.length > 0 && !existingFolder) {
        await db.insert(files).values({
            name: folderName,
            isFile: false,
            size: 0,
            modifyTimestamp: new Date(),
            createTimestamp: new Date(),
            insertTimestamp: new Date(),
        });
        const inserted =
            (await db.select().from(files).where(eq(files.name, folderName)))[
                0
            ];

        await db.insert(actions).values({
            fileId: inserted?.id!,
            type: "create",
            timestamp: new Date(),
        });
    } else {
        return { error: "Folder name length to small." };
    }
    revalidatePath("/browser");
}
