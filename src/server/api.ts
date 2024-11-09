import { count, eq, sql, sum } from "drizzle-orm";
import { db } from "./db";
import { clients, files, watcher } from "./db/schema";

const getInfo = async () => {
    const info = await db
        .select({
            fileSize: sum(files.fileSize),
            fileCount: count(files.fileName),
        })
        .from(files)
        .limit(1);
    return info;
};

const getClients = async () => {
    const clientList = await db.select().from(clients);
    return clientList;
};
const getFolders = async () => {
    const folders = await db
        .select({
            watcherID: watcher.watcherID,
            watcherName: watcher.watcherName,
            watcherPath: watcher.watcherPath,
            folderSize: sql<number>`sum(${files.fileSize})`,
        })
        .from(watcher)
        .leftJoin(files, eq(watcher.watcherID, files.watcherID))
        .groupBy(watcher.watcherID);
    return folders;
};

const getFolderData = async (watcherID: string) => {
    const folderData = await db
        .select()
        .from(files)
        .where(eq(files.watcherID, Number(watcherID)));
    return folderData;
};

const getFolderInfo = async (watcherID: string) => {
    const info = await db
        .select()
        .from(watcher)
        .where(eq(watcher.watcherID, Number(watcherID)))
        .limit(1);
    return info[0];
};

export { getClients, getFolderData, getFolderInfo, getFolders, getInfo };
