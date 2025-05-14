import { sql } from "drizzle-orm";
import {
  integer,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";

export const userTypeEnum = pgEnum("userType", ["admin", "user"]);

export const UserTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity({ startWith: 1000 }),
  name: varchar({ length: 50 }).notNull(),
  email: varchar({ length: 150 }).notNull(),
  password: varchar({ length: 150 }).notNull(),
  role: userTypeEnum().notNull(),
  username: varchar({ length: 150 }).notNull(),
  lastLoggedAt: timestamp("last_logged_at"),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const selectUserSchema = createSelectSchema(UserTable);
export const updateUserSchema = createUpdateSchema(UserTable);
export const insertUserSchema = createInsertSchema(UserTable);
