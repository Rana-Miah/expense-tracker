import { pgTable, uuid, timestamp, numeric, text, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyLoanProviderTable } from "./family-loan-provider";
import { familyLoansTable } from "./family-loan";


export const familyMemberLoanProviderBillsTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyLoanProviderId: uuid('family_loan_provider_id').notNull().references(() => familyLoanProviderTable.id),
    familyLoanId: uuid('family_loan_id').notNull().references(() => familyLoansTable.id),
    amount:numeric('total_debt', { precision: 7, scale: 2 }).notNull(),
    description:text('description'),
    paymentDate:timestamp('payment_date',{withTimezone:true}).notNull(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }).notNull(),
    isCancel: boolean('isCancel').default(false),
    cancelReason:text('cancel_reason'),
    createdAt,
    updatedAt
})


export const familyMemberLoanProviderBillsRelation = relations(familyMemberLoanProviderBillsTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [familyMemberLoanProviderBillsTable.familyId],
        references: [familyTable.id]
    }),
    familyLoanProvider:one(familyLoanProviderTable,{
         fields: [familyMemberLoanProviderBillsTable.familyLoanProviderId],
        references: [familyLoanProviderTable.id]
    }),
    familyLoan:one(familyLoansTable,{
         fields: [familyMemberLoanProviderBillsTable.familyLoanId],
        references: [familyLoansTable.id]
    }),
}))