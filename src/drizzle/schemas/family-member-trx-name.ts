import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";
import { createdAt, trxNameVariant, updatedAt } from "@/drizzle/schema-helpers";
import { familyTable } from "./family";
import { relations } from "drizzle-orm";
import { familyMembersTable } from "./family-members";
import { assignFamilyMemberReceiveBankTable } from "./assign-family-member-receive-bank";
import { assignFamilyMemberSourceBankTable } from "./assign-family-member-source-bank";
import { familyMemberTrxTable } from "./family-member-trx";

export const familyMemberTrxNameTable = pgTable('family_member_trx_name', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    familyMemberId: uuid('family_member_id').notNull().references(() => familyMembersTable.id),
    name: text('name').notNull(),
    variant: text('variant', { enum: trxNameVariant }).notNull(),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt
})

export const familyMemberTrxNameRelations = relations(familyMemberTrxNameTable, ({ one,many }) => ({
    family: one(familyTable, {
        fields: [familyMemberTrxNameTable.familyId],
        references: [familyTable.id]
    }),
    member: one(familyMembersTable, {
        fields: [familyMemberTrxNameTable.familyMemberId],
        references: [familyMembersTable.id]
    }),
    familyMemberMemberTrx:many(familyMemberTrxTable),
    familyMemberReceiveBanks:many(assignFamilyMemberReceiveBankTable,{relationName:'assignFamilyMemberReceiveBank'}),
    familyMemberSourceBanks:many(assignFamilyMemberSourceBankTable,{relationName:'assignFamilyMemberSourceBank'}),
}))