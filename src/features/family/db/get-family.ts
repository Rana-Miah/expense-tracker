'use server'

import { db } from "@/drizzle/db"
import { familyTable } from "@/drizzle/schema"
import { eq } from "drizzle-orm"

export const getFamilyById = async (id:string)=>await db.query.familyTable.findFirst({
    where:eq(familyTable.id,id)
})