import { db } from "@/server/db";
import { pbkdf2Sync } from "crypto";
import { NextResponse } from "next/server";
import * as jose from "jose";
import { signToken } from "@/lib/crypto";

export async function POST(req: Request) {
  const { email, password } = (await req.json()) as {
    email: string;
    password: string;
    csrfToken: string;
  };

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.email, email),
  });
  if (!user) {
    return NextResponse.json(
      { state: "unauthorized", message: "Invalid email or password" },
      { status: 402 },
    );
  }
  const hash = pbkdf2Sync(password!, user.salt, 10000, 64, "sha512").toString(
    "hex",
  );

  if (hash === user?.password) {
    const identity = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        image: user.image,
      },
      token: {
        token: await signToken({
          id: user.id!,
          name: user.name!,
          email: user.email!,
          image: user.image!,
        }),
        expires: new Date().getTime() + 864 * 100000,
      },
    };
    return NextResponse.json(
      { identity, state: "authorized" },
      { status: 200 },
    );
  }

  return NextResponse.json(
    { state: "unauthorized", message: "Invalid email or password" },
    { status: 402 },
  );
}
