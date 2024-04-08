import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { files, watcher } from "@/server/db/schema";
import { count, eq, sql, sum } from "drizzle-orm";

export const cloudRouter = createTRPCRouter({
  getInfo: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({
        fileSize: sum(files.fileSize),
        fileCount: count(files.fileName),
      })
      .from(files)
      .limit(1);
  }),
  getFolders: publicProcedure.query((opts) => {
    return opts.ctx.db
      .select({
        watcherID: watcher.watcherID,
        watcherName: watcher.watcherName,
        watcherPath: watcher.watcherPath,
        folderSize: sql<number>`sum(${files.fileSize})`,
      })
      .from(watcher)
      .leftJoin(files, eq(watcher.watcherID, files.watcherID))
      .groupBy(watcher.watcherID);
  }),
  getFolderData: publicProcedure
    .input((value): string => {
      if (typeof value === "string") {
        return value;
      }
      throw new Error("Input is not a string");
    })
    .query((opts) => {
      const watcherID = Number(opts.input);
      return opts.ctx.db
        .select()
        .from(files)
        .where(eq(files.watcherID, watcherID));
    }),
  getFolderInfo: publicProcedure
    .input((value): string => {
      if (typeof value === "string") {
        return value;
      }
      throw new Error("Input is not a string");
    })
    .query((opts) => {
      const watcherID = Number(opts.input);
      return opts.ctx.db
        .select()
        .from(watcher)
        .where(eq(watcher.watcherID, watcherID))
        .limit(1);
    }),
});
