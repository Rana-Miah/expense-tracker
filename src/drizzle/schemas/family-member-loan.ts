import { pgTable, uuid, timestamp, numeric, text } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, loanStatus, loanType, updatedAt } from "../schema-helpers";
import { familyMemberLoanProviderTable } from "./family-member-loan-provider";


export const familyMemberLoansTable = pgTable('family_shopkeepers-bill', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyMemberLoanProviderId: uuid('family_member_loan_provider_id').notNull().references(() => familyMemberLoanProviderTable.id),
    loanType: text('loan_type', { enum: loanType }).notNull(),
    loanStatus: text('loan_type', { enum: loanStatus }).notNull(),
    amount: numeric('total_debt', { precision: 7, scale: 2 }).notNull(),
    description:text('description'),
    loanDate: timestamp('loan_date', { withTimezone: true }).notNull(),
    createdAt,
    updatedAt
})


export const familyMemberLoansRelation = relations(familyMemberLoansTable, ({ one }) => ({
    family: one(familyTable, {
        fields: [familyMemberLoansTable.familyId],
        references: [familyTable.id]
    }),
    familyMemberLoanProvider: one(familyMemberLoanProviderTable, {
        fields: [familyMemberLoansTable.familyMemberLoanProviderId],
        references: [familyMemberLoanProviderTable.id]
    })
}))