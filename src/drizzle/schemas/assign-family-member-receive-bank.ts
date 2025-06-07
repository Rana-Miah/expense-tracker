import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyMemberTrxNameTable } from "./family-member-trx-name";
import { familyMemberBankAccountsTable } from "./family-member-bank-account";

export const assignFamilyMemberReceiveBankTable = pgTable('assign_member_receive_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyMemberTrxNameId:uuid('family_member_trx_name_id').notNull().references(()=>familyMemberTrxNameTable.id),
    familyMemberReceiveBankId:uuid('family_member_receive_bank_id').notNull().references(()=>familyMemberBankAccountsTable.id),
    createdAt,
    updatedAt,
})

export const assignFamilyMemberReceiveBankRelation = relations(assignFamilyMemberReceiveBankTable, ({ one }) => ({
  familyMemberTrxName:one(familyMemberTrxNameTable,{
    fields:[assignFamilyMemberReceiveBankTable.familyMemberTrxNameId],
    references:[familyMemberTrxNameTable.id]
  }),
  familyMemberReceiveBank:one(familyMemberBankAccountsTable,{
    fields:[assignFamilyMemberReceiveBankTable.familyMemberReceiveBankId],
    references:[familyMemberBankAccountsTable.id],
    relationName:'assignFamilyMemberReceiveBank'
  }),
}))