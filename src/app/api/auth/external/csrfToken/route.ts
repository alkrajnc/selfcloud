import { getCsrfToken } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const csrfToken = await getCsrfToken();

  return NextResponse.json({ crsfToken: csrfToken });
}
