import { db } from "@/server/db";
import { pbkdf2Sync } from "crypto";
import { NextResponse } from "next/server";
import * as jose from "jose";

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

const signToken = async (user: User) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const token = await new jose.SignJWT({ user })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setIssuer("selfcloud")
    .setExpirationTime("24h")
    .sign(secret);

  return token;
};

const verifyToken = async (token: string) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  const verified = await jose.jwtVerify(token, secret, { issuer: "selfcloud" });
  if (verified.payload && verified.protectedHeader) {
    return true;
  }
  return false;
};

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
