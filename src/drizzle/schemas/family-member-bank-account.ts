import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { familyMembersTable } from "./family-members";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { assignFamilyMemberReceiveBankTable } from "./assign-family-member-receive-bank";
import { assignFamilyMemberSourceBankTable } from "./assign-family-member-source-bank";
import { familyMemberTrxTable } from "./family-member-trx";

export const familyMemberBankAccountsTable = pgTable('family_member_bank_accounts', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyMemberId: uuid('family_member_id').notNull().references(() => familyMembersTable.id),
    name: text('name').unique().notNull(),
    balance: numeric('balance', { precision: 7, scale: 2 }).notNull(),
    lbn:text('local_bank_number').notNull().unique(),
    isDeleted:boolean("is_deleted").default(false),
    description: text('description'),
    createdAt,
    updatedAt,
})



export const familyMemberBankAccountsRelation = relations(familyMemberBankAccountsTable, ({ one,many }) => ({
    family: one(familyTable, {
        fields: [familyMemberBankAccountsTable.familyId],
        references: [familyTable.id]
    }),
    familyMember: one(familyMembersTable, {
        fields: [familyMemberBankAccountsTable.familyMemberId],
        references: [familyMembersTable.id]
    }),
    assignedFamilyMemberReceiveTrx:many(assignFamilyMemberReceiveBankTable,{relationName:'assignFamilyMemberReceiveBank'}),
    assignedFamilyMemberSourceTrx:many(assignFamilyMemberSourceBankTable,{relationName:'assignFamilyMemberSourceBank'}),
    familyMemberSourceTrx:many(familyMemberTrxTable,{relationName:'familyMemberTrxFromSourceBank'}),
    familyMemberReceiveTrx:many(familyMemberTrxTable,{relationName:'familyMemberTrxToReceiveBank'}),
}))