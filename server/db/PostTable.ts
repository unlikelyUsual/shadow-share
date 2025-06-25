import { sql } from "drizzle-orm";
import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";
import { UserTable } from "./UserTable";

export const PostTable = pgTable("posts", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  userId: integer("user_id")
    .references(() => UserTable.id)
    .notNull(),
  createdAt: timestamp("created_at")
    .notNull()
    .default(sql`now()`),
  updatedAt: timestamp("updated_at")
    .notNull()
    .default(sql`now()`),
});

export const selectPostSchema = createSelectSchema(PostTable);
export const updatePostSchema = createUpdateSchema(PostTable);

export const insertPostSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const getAllPostSchema = z.object({
  limit: z.string().optional(),
  idCursor: z.string().optional(),
  timestampCursor: z.string().optional(),
});

export type GetAllPostType = z.infer<typeof getAllPostSchema>;
