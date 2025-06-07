import { db } from "@/drizzle/db";
import { familyBankAccountsTable } from "@/drizzle/schema";

export const insertFamilyBankAccount = async (values:typeof familyBankAccountsTable.$inferInsert) => {
    const [newFamilyBankAccount]=await db.insert(familyBankAccountsTable).values(values).returning()
    return newFamilyBankAccount
}