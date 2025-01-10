import { verifyToken } from "@/lib/crypto";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token: string = req.headers.get("X-Auth-Token") as string;

  const searchParams = req.nextUrl.searchParams;
  const userId = searchParams.get("userId");

  const verification = await verifyToken(token);
  if (!verification.auth) {
    return NextResponse.json("unauthorized", { status: 403 });
  }

  if (!userId) {
    return NextResponse.json("no id provided", { status: 500 });
  }

  const passwords = await db.query.passwords.findMany({
    where: (passwords, { eq }) => eq(passwords.userId, userId),
    columns: {
      id: true,
      name: true,
      website: true,
      username: true,
      lastAccessed: true,
    },
  });

  return NextResponse.json(passwords);
}
