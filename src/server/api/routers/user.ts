import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { files } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export const userRouter = createTRPCRouter({
  /* getUser: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(files);
  }), */
});
