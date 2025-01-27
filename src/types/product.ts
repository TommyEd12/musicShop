export interface Product
{
    id: number | "";
    name: string;
    price: number;
    discountPrice: number;
    count: number;
    description: string;
    categoryId: number;
    brandId: number;
    images: string[];
}
// id: integer().primaryKey().generatedAlwaysAsIdentity(),
// name: varchar({ length: 255 }).notNull(),
// price: integer().default(0),
// discountPrice: integer(),
// count: integer().default(0),
// description: varchar({ length: 255 }),
// categoryId: integer().references(() => categoriesTable.id),
// brandId: integer().references(() => brandsTable.id),
// images: varchar({ length: 255 }).array(),