'use server'


import { signJwt } from '@/lib/jose/sign';
import { setCookie, } from '@/lib/helpers';
import { TOKEN_KEY } from "@/constant/token-constant";
import { familyMemberLoginSchema } from '../schema';
import { JWTPayload } from 'jose';

export const familyMemberLoginAction = async (payload: { phone: string; password: string; }) => {
  try {

    const existMember:JWTPayload = {
      id:"1",
      name: 'rana miah',
      email: 'rtrana2023@gmail.com',
      role: 'MEMBER',
      phone: '01785585238'
    }

    const validation = familyMemberLoginSchema.safeParse(payload)

    if (!validation.success) return { success: false }

    if (!existMember) return { success: false }

    const familyMemberAccessToken = await signJwt(existMember, { secret: process.env.AUTH_SECRET!,expireIn:'3d' })

    await setCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN, familyMemberAccessToken)

    return { success: true }
  } catch (error) {
    return { success: false }
  }
}