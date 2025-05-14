import { faker } from "@faker-js/faker";
import { db } from "../config/db.config";
import { PostTable } from "./PostTable";

const main = async () => {
  const rows: (typeof PostTable.$inferInsert)[] = [];
  for (let i = 0; i < 100; i++) {
    const row = {
      title: faker.lorem.sentence({ min: 1, max: 2 }),
      content: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
    rows.push(row);
  }
  await db.insert(PostTable).values(rows);
  console.log("Seeding Done.");
};

main();
