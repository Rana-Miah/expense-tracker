'use server'

import { db } from "@/drizzle/db"
import { familyTrxNameTable } from "@/drizzle/schema"
import { FamilyTrxName } from "@/drizzle/type"
import { and, eq } from "drizzle-orm"

export const updateFamilyTrxName = async (id: string, familyId: string,payload:Partial<FamilyTrxName>) => {

    const [updatedFamilyTrxName] = await db.update(familyTrxNameTable).
        set(payload)
        .where(
            and(
                eq(familyTrxNameTable.id, id),
                eq(familyTrxNameTable.familyId, familyId)
            )
        ).returning()
    return updatedFamilyTrxName
}