import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";
import { files } from "@/server/db/schema";

export const fileRouter = createTRPCRouter({
  getFiles: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(files);
  }),
});
