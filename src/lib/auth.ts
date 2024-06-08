/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { eq } from "drizzle-orm";

export async function checkClientSecret(request: Request) {
  if (
    !request.headers.get("X-Client-Id") ||
    !request.headers.get("X-Client-Secret")
  ) {
    return false;
  }
  const client = await db
    .select()
    .from(clients)
    .where(eq(clients.clientID, Number(request.headers.get("X-Client-Id"))));
  if (client[0]?.clientAuthToken === request.headers.get("X-Client-Secret")) {
    return true;
  }
  return false;
}
