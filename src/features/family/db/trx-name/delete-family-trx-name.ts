'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const deleteFamilyTrxName = async (id: string, familyId: string) => {

    const [deletedFamilyTrxName] = await db.update(familyTrxNameTable).
        set({
            isDeleted: true
        })
        .where(
            and(
                eq(familyTrxNameTable.id, id),
                eq(familyTrxNameTable.familyId, familyId)
            )
        ).returning()
    return deletedFamilyTrxName
}