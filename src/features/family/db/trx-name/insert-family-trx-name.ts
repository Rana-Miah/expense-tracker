'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { InsertFamilyTrxName } from "@/drizzle/type"

export const insertFamilyTrxName = async (input: InsertFamilyTrxName) => {
    const [newFamilyTrxName] = await db.insert(familyTrxNameTable).values(input).returning()
    return newFamilyTrxName
}