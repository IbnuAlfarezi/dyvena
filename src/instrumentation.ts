import { logger } from "@/lib/logger";

export function register() {
  // Any pre-initialization logic can go here
  if (process.env.NEXT_RUNTIME === "nodejs") {
    logger.info("Next.js Server starting (Node.js runtime)...");
  }
}

export function onRequestError(error: unknown, request: any, context: any) {
  logger.error("Unhandled Server Error", {
    error: error instanceof Error ? error.stack : error,
    requestUrl: request?.url,
    context,
  });
}
