import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { db } from "../config/db.config";
import { PostTable } from "./PostTable";
import { UserTable } from "./UserTable";

const main = async () => {
  const pass = await bcrypt.hash("admin1password", 10);
  const users: any[] = [
    {
      name: "Admin User 1",
      email: "admin1@example.com",
      password: pass,
      role: "ADMIN",
      username: "admin1",
      lastLoggedAt: new Date(),
    },
    {
      name: "Regular User 1",
      email: "user1@example.com",
      password: pass,
      role: "USER",
      username: "user1",
      lastLoggedAt: new Date(),
    },
  ];

  console.log("Seeded users.");

  const savedUsers = await db.insert(UserTable).values(users).returning();

  const rows: (typeof PostTable.$inferInsert)[] = [];

  for (let i = 0; i < 10; i++) {
    const row = {
      title: faker.lorem.sentence({ min: 1, max: 2 }),
      content: faker.lorem.paragraphs(3),
      userId: savedUsers[1].id,
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    rows.push(row);
  }

  console.log("Saving posts.");

  await db.insert(PostTable).values(rows);

  console.log("Seeding Done.");
};

main();
