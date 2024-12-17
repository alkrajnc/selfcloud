"use server";
import { decrypt, encrypt } from "@/lib/crypto";
import { getServerAuthSession } from "../auth";
import { db } from "../db";
import { passwords } from "../db/schema";
import { revalidatePath } from "next/cache";
import { exec } from "child_process";

export async function getPasswordList() {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const passwordList = await db.query.passwords.findMany({
    where: (passwords, { eq }) => eq(passwords.userId, session.user.id),
  });
  return passwordList;
}

export async function newPassword(
  username: string,
  website: string,
  password: string,
  entryName: string,
) {
  const session = await getServerAuthSession();
  if (!session) {
    console.log("ni seje");
    return null;
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });
  if (!user) {
    return null;
  }

  const encryptedPassword = encrypt(user.password, user.salt, password);

  await db.insert(passwords).values({
    password: encryptedPassword,
    website,
    username,
    name: entryName,
    lastAccessed: new Date(),
    userId: session.user.id,
  });
  revalidatePath("/cloud/vault");
  return "ok";
}

export async function revealPassword(passwordId: string) {
  const session = await getServerAuthSession();
  if (!session) {
    return null;
  }

  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, session.user.id),
  });
  if (!user) {
    return null;
  }

  const password = await db.query.passwords.findFirst({
    where: (passwords, { eq }) => eq(passwords.id, passwordId),
  });

  return decrypt(user?.password, user.salt, password?.password!);
}

export async function downloadWebsiteIcon(name: string, url: string) {
  const session = await getServerAuthSession();

  if (!session) {
    return null;
  }

  url.replaceAll("&", "");
  url.replaceAll("|", "");
  url.replaceAll(";", "");
  url.replaceAll(">", "");
  url.replaceAll("<", "");

  const { stdout, stderr } = exec(
    `curl ${url}/favicon.ico --output ./public/icons/${name}_icon`,
  );

  console.log(await stdout?.toArray(), await stderr?.toArray());
}
