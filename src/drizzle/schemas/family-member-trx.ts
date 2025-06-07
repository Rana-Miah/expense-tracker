import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { familyMemberTrxNameTable } from "./family-member-trx-name";
import { familyMemberBankAccountsTable } from "./family-member-bank-account";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";


export const familyMemberTrxTable = pgTable('family_member_member_transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    name: text('trx_name').unique().notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    familyMemberTrxNameId: uuid('family_member_trx_name_id').notNull().references(() => familyMemberTrxNameTable.id),
    familyMemberSourceBankId: uuid('family_member_source_bank_id').references(() => familyMemberBankAccountsTable.id),
    familyMemberReceiveBankId: uuid('family_member_receive_bank_id').references(() => familyMemberBankAccountsTable.id),
    isCancel: boolean('isCancel').default(false),
    cancelReason: text('cancel_reason'),
    createdAt,
    updatedAt,
})

export const familyMemberTrxRelation = relations(familyMemberTrxTable, ({ one }) => ({
    familyMemberTrxName: one(familyMemberTrxNameTable, {
        fields: [familyMemberTrxTable.familyMemberTrxNameId],
        references: [familyMemberTrxNameTable.id],
    }),

    familyMemberSourceBank: one(familyMemberBankAccountsTable, {
        fields: [familyMemberTrxTable.familyMemberSourceBankId],
        references: [familyMemberBankAccountsTable.id],
        relationName: 'familyMemberTrxFromSourceBank'
    }),

    receiveBank: one(familyMemberBankAccountsTable, {
        fields: [familyMemberTrxTable.familyMemberReceiveBankId],
        references: [familyMemberBankAccountsTable.id],
        relationName: 'familyMemberTrxToReceiveBank'
    }),
}))