import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { exec } from "child_process";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function GET(req: NextRequest, res: NextResponse) {
  /*  const session = getServerAuthSession();
  if (!session) {
    return NextResponse.json("unauthorized");
  } */

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json("id not found");
  }

  const image = await db.query.images.findFirst({
    where: (images, { eq }) => eq(images.id, id),
  });

  const data = await readFile(
    `${process.env.FILE_LOCATION}/photos/${image?.name}`,
  );

  return new Response(data, {
    headers: { "content-type": "image/png" },
  });
}

/* export async function POST(req: Request, res: NextResponse) {
  const data = await new Promise((resolve, reject) => {
    const form = new IncomingForm();
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
  return NextResponse.json(data);
}
 */
