import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5433"),
  database: process.env.POSTGRES_DB!,
  username: process.env.POSTGRES_USER!,
  password: process.env.POSTGRES_PASSWORD!,
});
export const db = drizzle(client);
