import { validateEmail } from "@/lib/utils";
import { db } from "@/server/db";
import { accounts, users } from "@/server/db/schema";
import { pbkdf2Sync, randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = (await request.json()) as {
      password: string;
      email: string;
    };

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 },
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password must be at least 8 characters long" },
        { status: 400 },
      );
    }
    if (validateEmail(email) === null) {
      return NextResponse.json({ message: "Invalid email" }, { status: 400 });
    }
    const existingUser = await db
      .select({ email: users.email })
      .from(users)
      .where(eq(users.email, email));

    if (existingUser[0]?.email === email) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 },
      );
    }
    const userID = randomBytes(4).toString("hex");
    const salt = randomBytes(16).toString("hex");

    const hash = pbkdf2Sync(password, salt, 10000, 64, "sha512").toString(
      "hex",
    );

    await db
      .insert(users)
      .values({ email: email, password: hash, id: userID, salt: salt });
    await db.insert(accounts).values({
      userId: userID,
      type: "user",
      provider: "credentials",
      providerAccountId: userID,
    });

    console.log({ email, password });
  } catch (e) {
    console.log({ e });
  }

  return NextResponse.json({ message: "success" });
}
