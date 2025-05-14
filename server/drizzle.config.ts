import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { connectionUrl } from "./config/config.env";

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: connectionUrl,
  },
});
