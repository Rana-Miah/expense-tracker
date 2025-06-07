import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createdAt, familyMemberRelation, role, updatedAt } from "@/drizzle/schema-helpers";
import { relations } from "drizzle-orm";
import { familyTable } from "./family";
import { familyMemberTrxNameTable } from "./family-member-trx-name";
import { familyMemberBankAccountsTable } from "./family-member-bank-account";


export const familyMembersTable = pgTable('family_members', {
    id: uuid('id').primaryKey().unique().defaultRandom().unique(),
    familyId: uuid('family_id').notNull().references(() => familyTable.id),
    name: text('name').notNull(),
    email: text('email').unique().notNull(),
    phone: text('phone').unique().notNull(),
    password: text('password').notNull(),
    relation: text('relation', { enum: familyMemberRelation }).notNull(),
    role: text('role', { enum: role }).notNull(),
    emailVerifiedAt: timestamp('email_verified_at', { withTimezone: true }),
    isDeleted:boolean("is_deleted").default(false),
    createdAt,
    updatedAt,
})

export const familyMembersRelation = relations(familyMembersTable, ({ one, many }) => ({
    family: one(familyTable, {
        fields: [familyMembersTable.familyId],
        references: [familyTable.id]
    }),
    trxNames: many(familyMemberTrxNameTable),
    bankAccounts: many(familyMemberBankAccountsTable)
}))