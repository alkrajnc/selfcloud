import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { files, folders } from "@/server/db/schema";
import { count, eq, sum } from "drizzle-orm";

export const cloudRouter = createTRPCRouter({
  getInfo: publicProcedure.query(({ ctx }) => {
    return ctx.db
      .select({ fileSize: sum(files.size), fileCount: count(files.name) })
      .from(files)
      .limit(1);
  }),
  getFolders: publicProcedure.query((opts) => {
    return opts.ctx.db.select().from(folders);
  }),
  getFolderData: publicProcedure
    .input((value): string => {
      if (typeof value === "string") {
        return value;
      }
      throw new Error("Input is not a string");
    })
    .query((opts) => {
      const folderID = Number(opts.input);
      return opts.ctx.db
        .select()
        .from(files)
        .where(eq(files.folderId, folderID));
    }),
  getFolderInfo: publicProcedure
    .input((value): string => {
      if (typeof value === "string") {
        return value;
      }
      throw new Error("Input is not a string");
    })
    .query((opts) => {
      const folderID = Number(opts.input);
      return opts.ctx.db
        .select()
        .from(folders)
        .where(eq(folders.id, folderID))
        .limit(1);
    }),
});
