import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { connectionUrl } from "./config.env";

const pool = new Pool({
  connectionString: connectionUrl,
});

export const db = drizzle({
  client: pool,
  logger: true,
});
