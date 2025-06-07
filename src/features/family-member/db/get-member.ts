'use server'

import { db } from "@/drizzle/db"
import { familyMembersTable } from "@/drizzle/schema"
import { and, eq, or } from "drizzle-orm"

export const getMemberByFamilyId = async (familyId: string) => (
    await db.query.familyMembersTable.findFirst({
        where: eq(familyMembersTable.familyId, familyId)
    }))

export const getMemberByIdAndFamilyId = async (id: string, familyId: string) => (
    await db.query.familyMembersTable.findFirst({
        where: and(
            eq(familyMembersTable.id, id),
            eq(familyMembersTable.familyId, familyId)
        )
    }))

export const getMemberByPhoneOrEmail = async (phone: string, email: string) => (
    await db.query.familyMembersTable.findFirst({
        where: or(
            eq(familyMembersTable.phone, phone),
            eq(familyMembersTable.email, email)
        )
    }))