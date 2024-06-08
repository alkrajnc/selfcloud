"use server";
import { db } from "@/server/db";
import { clients } from "@/server/db/schema";
import { randomBytes } from "crypto";

export async function addNewClient(
  name: string,
  platform: string,
): Promise<{ message: string; error: boolean }> {
  const authKey = randomBytes(32).toString("hex");

  try {
    await db.insert(clients).values({
      clientName: name,
      clientPlatform: platform,
      clientLastSeen: new Date(),
      clientAuthToken: authKey,
    });
    return {
      message:
        "Successefuly added a new client. You will be redirected in 3 seconds.",
      error: false,
    };
  } catch (error) {
    return { message: "Error adding client. Please try again.", error: true };
  }
}
