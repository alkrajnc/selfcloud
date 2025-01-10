import { getServerAuthSession } from "@/server/auth";
import { db } from "@/server/db";
import { exec } from "child_process";
import { readFileSync } from "fs";
import { readFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

import sharp from "sharp";

export async function GET(req: NextRequest, res: NextResponse) {
  /*  const session = getServerAuthSession();
  if (!session) {
    return NextResponse.json("unauthorized");
  } */

  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id");
  const width = Math.floor(Number(searchParams.get("w")));
  const height = Math.floor(Number(searchParams.get("h")));
  if (!id) {
    return NextResponse.json("id not found");
  }

  const image = await db.query.images.findFirst({
    where: (images, { eq }) => eq(images.id, id),
  });

  const data = await readFile(
    `${process.env.FILE_LOCATION}/photos/${image?.name}`,
  );

  const optimizedImage = await sharp(data)
    .resize({
      kernel: "nearest",
      width: width > 0 ? width : image?.dimensionX,
      height: height > 0 ? height : image?.dimensionY,
    })
    .toBuffer();

  return new Response(optimizedImage, {
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
