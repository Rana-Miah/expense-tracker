import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyShopkeeperBillsTable } from "./family-shopkeeper-bill";


export const familyShopkeepersTable = pgTable('family_shopkeeper', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    isDeleted:boolean("is_deleted").default(false),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    createdAt,
    updatedAt
})


export const familyShopkeepersRelation = relations(familyShopkeepersTable, ({ one ,many}) => ({
    family: one(familyTable, {
        fields: [familyShopkeepersTable.familyId],
        references: [familyTable.id]
    }),
    paidBills:many(familyShopkeeperBillsTable)
}))