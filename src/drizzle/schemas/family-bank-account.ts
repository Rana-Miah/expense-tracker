import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import {  relations } from "drizzle-orm";
import { familyTable } from "./family";
import { assignFamilySourceBankTable } from "./assign-family-source-bank";
import { assignFamilyReceiveBankTable } from "./assign-family-receive-bank";

export const familyBankAccountsTable = pgTable('family_bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    lbn:text('local_bank_number').notNull().unique(),
    description: text('description'),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt,
})


export const familyBankAccountsRelation = relations(familyBankAccountsTable, ({ one,many}) => ({
    family: one(familyTable, {
        fields: [familyBankAccountsTable.familyId],
        references: [familyTable.id]
    }),
    assignFamilySourceTrx:many(assignFamilySourceBankTable,{relationName:"assignFamilySourceBank"}),
    assignFamilyReceiveTrx:many(assignFamilyReceiveBankTable,{relationName:"assignFamilyReceiveBank"})
}))