import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyLoansTable } from "./family-loan";
import { familyLoanProviderBillsTable } from "./family-loan-provider-bill";


export const familyLoanProviderTable = pgTable('family_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const familyLoanProviderRelation = relations(familyLoanProviderTable, ({ one ,many}) => ({
    family: one(familyTable, {
        fields: [familyLoanProviderTable.familyId],
        references: [familyTable.id]
    }),
    providedLoans:many(familyLoansTable),
    payments:many(familyLoanProviderBillsTable)
}))