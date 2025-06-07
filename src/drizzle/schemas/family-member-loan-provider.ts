import { pgTable, uuid, text, numeric, boolean } from "drizzle-orm/pg-core";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { createdAt, updatedAt } from "../schema-helpers";
import { familyMembersTable } from "./family-members";
import { familyMemberLoansTable } from "./family-member-loan";


export const familyMemberLoanProviderTable = pgTable('family_member_loan_provider', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyMemberId: uuid('family_member_id').notNull().references(() => familyMembersTable.id),
    name: text('name').notNull(),
    phone: text('phone').notNull().unique(),
    totalDebt: numeric('total_debt', { precision: 7, scale: 2 }),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})


export const familyMemberLoanProviderRelation = relations(familyMemberLoanProviderTable, ({ one ,many}) => ({
    family: one(familyTable, {
        fields: [familyMemberLoanProviderTable.familyId],
        references: [familyTable.id]
    }),
    familyMember: one(familyMembersTable, {
        fields: [familyMemberLoanProviderTable.familyMemberId],
        references: [familyMembersTable.id]
    }),
    providedLoans:many(familyMemberLoansTable),
}))