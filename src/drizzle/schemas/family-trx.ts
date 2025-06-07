import { boolean, numeric, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { familyTrxNameTable } from "./family-trx-name";
import { familyBankAccountsTable } from "./family-bank-account";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";


export const familyTrxTable = pgTable('family_transaction', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    name: text('trx_name').unique().notNull(),
    amount: numeric('amount', { precision: 7, scale: 2 }).notNull(),
    description: text('description'),
    familyTrxNameId: uuid('family_trx_name_id').notNull().references(() => familyTrxNameTable.id),
    familySourceBankId: uuid('family_source_bank_id').references(() => familyBankAccountsTable.id),
    familyReceiveBankId: uuid('family_receive_bank_id').references(() => familyBankAccountsTable.id),
    isCancel: boolean('isCancel').default(false),
    cancelReason:text('cancel_reason'),
    createdAt,
    updatedAt,
})

export const familyTrxRelation = relations(familyTrxTable, ({ one, many }) => ({
    familyTrxName: one(familyTrxNameTable, {
        fields: [familyTrxTable.familyTrxNameId],
        references: [familyTrxNameTable.id],
    }),

    familySourceBank: one(familyBankAccountsTable, {
        fields: [familyTrxTable.familySourceBankId],
        references: [familyBankAccountsTable.id],
        relationName: 'familyTrxFromSourceBank'
    }),

    receiveBank: one(familyBankAccountsTable, {
        fields: [familyTrxTable.familyReceiveBankId],
        references: [familyBankAccountsTable.id],
        relationName: 'familyTrxToReceiveBank'
    }),
}))