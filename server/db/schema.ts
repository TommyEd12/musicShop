import { integer, pgTable, varchar, pgEnum } from "drizzle-orm/pg-core";
export const roleEnum = pgEnum("role", ["user", "admin"]);

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: roleEnum().default("user"),
});

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  price: integer().default(0),
  discountPrice: integer(),
  count: integer().default(0),
  description: varchar({length: 255}),
  categoryId: integer().references(() =>categoriesTable.id),
  brandId: integer().references(() =>brandsTable.id),
  images: varchar({length:255}).array(),
  
});

export const brandsTable = pgTable("brands", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  image: varchar({length:255}),
});

export const categoriesTable = pgTable("categories", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
});