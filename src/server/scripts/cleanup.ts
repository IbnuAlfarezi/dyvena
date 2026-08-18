
import { eq, lt, and } from "drizzle-orm";
import { db } from "@/db";
import { user } from "@/db/schema";

async function runCleanup() {
  try {
    console.log("Starting unverified accounts cleanup...");
    
    // Get time 24 hours ago
    const yesterday = new Date();
    yesterday.setHours(yesterday.getHours() - 24);

    const result = await db.delete(user)
      .where(
        and(
          eq(user.emailVerified, false),
          lt(user.createdAt, yesterday)
        )
      )
      .returning({ id: user.id, email: user.email });

    console.log(`Cleanup completed. Deleted ${result.length} unverified accounts.`);
  } catch (error) {
    console.error("Cleanup failed:", error);
  } finally {
    process.exit(0);
  }
}

runCleanup();
