import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { usersTable } from "./schema";

const db = drizzle("postgres://postgres:postgres@localhost:5432/postgres");

async function Main() {
  await db.insert(usersTable).values({
    email: "@mail.com",
    password: "123",
  });

  const users = await db.select().from(usersTable);
  console.log(users);
}

Main();
