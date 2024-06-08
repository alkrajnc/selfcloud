import { checkClientSecret } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: { secret: string; clientId: string } = await request.json();
  if (!body.secret) {
    return NextResponse.json(
      { message: "Secret is required" },
      { status: 400 },
    );
  }

  if (await checkClientSecret(request)) {
    return NextResponse.json({ message: "Valid secret" });
  } else {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }
}
