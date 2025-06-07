'use server'

import { db } from "@/drizzle/db"
import { familyMembersTable } from "@/drizzle/schema"

export const insertMember = async (member: typeof familyMembersTable.$inferInsert) => {
    const [newMember] = await db.insert(familyMembersTable).values(member).returning()
    return newMember
}