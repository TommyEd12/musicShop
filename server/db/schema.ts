import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["user", "admin"]);
export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  role: roleEnum(),
});
