import { NextResponse } from "next/server";
import { logger } from "@/lib/logger";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { message, stack, url, info } = body;

    logger.error(`Client Error at ${url || "Unknown URL"}`, {
      message,
      stack,
      info,
      source: "client-browser",
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    logger.error("Failed to parse client log payload", err);
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
}
