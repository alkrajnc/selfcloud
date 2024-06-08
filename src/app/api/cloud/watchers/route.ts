import { checkClientSecret } from "@/lib/auth";
import { db } from "@/server/db";
import { clients, watcher } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

  if (!(await checkClientSecret(request))) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const watchers = await db
    .select()
    .from(watcher)
    .where(eq(watcher.clientID, Number(request.headers.get("X-Client-Id"))));

  return NextResponse.json({ watchers }, { status: 200 });
}
