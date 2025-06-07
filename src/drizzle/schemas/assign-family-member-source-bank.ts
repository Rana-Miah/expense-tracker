import { pgTable, uuid } from "drizzle-orm/pg-core";
import { createdAt, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyMemberTrxNameTable } from "./family-member-trx-name";
import { familyMemberBankAccountsTable } from "./family-member-bank-account";

export const assignFamilyMemberSourceBankTable = pgTable('assign_member_source_bank', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyMemberTrxNameId:uuid('family_member_trx_name_id').notNull().references(()=>familyMemberTrxNameTable.id),
    familyMemberSourceBankId:uuid('family_member_source_bank_id').notNull().references(()=>familyMemberBankAccountsTable.id),
    createdAt,
    updatedAt,
})

export const assignFamilyMemberSourceBankRelation = relations(assignFamilyMemberSourceBankTable, ({ one, many }) => ({
  familyMemberTrxName:one(familyMemberTrxNameTable,{
    fields:[assignFamilyMemberSourceBankTable.familyMemberTrxNameId],
    references:[familyMemberTrxNameTable.id]
  }),
  familyMemberSourceBank:one(familyMemberBankAccountsTable,{
    fields:[assignFamilyMemberSourceBankTable.familyMemberSourceBankId],
    references:[familyMemberBankAccountsTable.id],
    relationName:'assignFamilyMemberSourceBank'
  }),
}))