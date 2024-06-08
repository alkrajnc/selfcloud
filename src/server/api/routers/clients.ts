import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { clients } from "@/server/db/schema";

export const clientRouter = createTRPCRouter({
  getClients: publicProcedure.query(({ ctx }) => {
    return ctx.db.select().from(clients);
  }),
  addNewClient: publicProcedure.mutation<{ name: string; platform: string }>(
    async ({ ctx, input }) => {
      const data = input;
      console.log(data);
      //await ctx.db.insert(data).into(clients);
    },
  ), // Add a comma here
});
