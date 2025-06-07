'use server'
import { familyMemberRegisterSchema, FamilyMemberRegisterFormValue } from '../schema';
import { currentFamily } from '@/lib/current-family';
import { getMemberByPhoneOrEmail } from '../db';
import { encryptPw } from '@/lib/bcrypt';
import { insertMember } from '../db/insert-member';
import { revalidatePath } from 'next/cache';

export const familyMemberRegisterAction = async (payload: FamilyMemberRegisterFormValue) => {
  try {
    const loggedFamily = await currentFamily()

    if (!loggedFamily) return { success: false, message: 'Unauthenticated Access', data: null }

    if (loggedFamily.role !== 'FAMILY') return { success: false, message: 'Unauthorized Access!' }

    const validation = familyMemberRegisterSchema.safeParse(payload)
    if (!validation.success) return { success: false, message: 'Invalid Fields!', data: null }

    const { email, phone, password, confirmPassword, name, relation } = validation.data

    if (password !== confirmPassword) return { success: false, message: 'Confirm password not matched!', data: null }

    const existMember = await getMemberByPhoneOrEmail(phone, email)

    if (existMember) return { success: false, message: 'Email or Phone already taken!', data: null }

    const hashedPw = await encryptPw(password)

    const newMember = await insertMember({
      name,
      phone,
      email,
      relation,
      role: 'MEMBER',
      password: hashedPw,
      familyId: loggedFamily.id
    })

    revalidatePath(`/${loggedFamily.id}`)


    return { success: true, message: "Member registered successful!", data: newMember }
  } catch (error) {
    return { success: false, message: "Member registered successful!", error }
  }
}