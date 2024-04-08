import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { files } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(files);
  }),
  deleteFile: publicProcedure
    .input((value): string => {
      if (typeof value === "string") {
        return value;
      }
      throw new Error("Input is not a string");
    })
    .mutation(async (opts) => {
      await opts.ctx.db.delete(files).where(eq(files.fileName, opts.input));
      return;
    }),
});
