'use server'
import { familyRegisterSchema, FamilyRegisterFormValue } from "../schema";
import { SendResponse } from "@/interface";
import { db } from "@/drizzle/db";
import { eq, or } from "drizzle-orm";
import { familyTable } from "@/drizzle/schema";
import { encryptPw } from "@/lib/bcrypt";

type Family = typeof familyTable.$inferSelect

export const familyRegisterAction = async <T, E extends Error>(payload: FamilyRegisterFormValue): Promise<SendResponse<Family, E>> => {
  try {
    const validation = familyRegisterSchema.safeParse(payload)
    if (!validation.success) return {
      success: false,
      message: 'Invalid Fields!',
      data: null,
      error: validation.error
    }
    const { name, phone, email, password, confirmPassword } = validation.data

    if (password !== confirmPassword) return {
      success: false,
      message: "Password not Matched!",
      data: null, error: null
    }

    const existFamily = await db.query.familyTable.findFirst({
      where: or(
        eq(familyTable.email, email),
        eq(familyTable.phone, phone),
      )
    })

    if (existFamily) return {
      success: false,
      message: "Email or Phone already taken!",
      data: null,
      error: null
    }

    const hashedPassword = await encryptPw(password)

    const [newFamily] = await db.insert(familyTable).values({
      name,
      email,
      phone,
      password: hashedPassword
    }).returning()

    return { success: true, message: 'Family register successful!', data: newFamily, error: null }
  } catch (error) {
    return { success: false, message: 'Failed to register family', data: null, error }
  }
}