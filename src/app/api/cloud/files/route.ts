import { verifyToken } from "@/lib/crypto";
import { db } from "@/server/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const token: string = req.headers.get("X-Auth-Token") as string;
  const verification = await verifyToken(token);
  if (!verification.auth) {
    return NextResponse.json("unauthorized", { status: 403 });
  }

  const fileData = await db.query.files.findMany({
    orderBy: (files, { asc }) => [asc(files.name)],
    with: {
      actions: {
        with: {
          user: {
            columns: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(fileData);
}
