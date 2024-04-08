import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clients } from "@/server/db/schema";

export const clientRouter = createTRPCRouter({
  getClients: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(clients);
  }),
});
