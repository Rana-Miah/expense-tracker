'use server'


import { FamilyLoginFormValue, familyLoginSchema } from "../schema";
import { signJwt } from '@/lib/jose/sign';
import { setCookie, } from '@/lib/helpers';
import { TOKEN_KEY } from "@/constant/token-constant";
import { JWTPayload } from "jose";
import { db } from "@/drizzle/db";
import { eq } from "drizzle-orm";
import { familyTable } from "@/drizzle/schema";
import bcrypt from "bcryptjs";
import { SendResponse } from "@/interface";
import { comparePw } from "@/lib/bcrypt";

type LoginResponse = {
  isSendMail: boolean;
  familyId: string | null;
} | null

export const familyLoginAction = async <FR extends Error>(payload: FamilyLoginFormValue): Promise<SendResponse<LoginResponse, FR>> => {
  try {
    const validation = familyLoginSchema.safeParse(payload)
    if (!validation.success) return {
      success: false,
      message: 'Invalid Fields!',
      data: null,
      error: validation.error
    }
    const { email, password, verificationCode } = validation.data


    const existFamily = await db.query.familyTable.findFirst({
      where: eq(familyTable.email, email)
    })

    if (!existFamily) return { success: false, message: "Family Not Found!", data: null, error: null }

    const isMatchedPw = await comparePw(password, existFamily.password)
    if (!isMatchedPw) return { success: false, message: "Invalid Credentials", data: null, error: null }

    const { id, name, email: existFamilyEmail, phone, role, emailVerifiedAt } = existFamily
    //TODO: send verification mail and verify the email
    // if (!emailVerifiedAt) {

    //   // console.log({
    //   //   emailVerifiedAt,
    //   //   Msg: 'Email not verify!'
    //   // })

    //   if (verificationCode) {
    //     // console.log({
    //     //   emailVerifiedAt,
    //     //   verificationCode,
    //     //   Msg: 'verification code Received & started checking!'
    //     // })
    //     // verify the code
    //     if (dbVerificationCode !== verificationCode) {
    //       // console.log({
    //       //   emailVerifiedAt,
    //       //   verificationCode,
    //       //   Msg: 'verification code not matched!'
    //       // })
    //       return {
    //         success: true,
    //         message: "Invalid Verification Code",
    //         data: {
    //           familyId: null,
    //           isSendMail: false
    //         },
    //         error: null
    //       }
    //     }
    //   } else {
    //     // send verification mail
    //     // console.log({
    //     //   emailVerifiedAt,
    //     //   verificationCode,
    //     //   Msg: 'verification code send!'
    //     // })
    //     return {
    //       success: true,
    //       message: "Verification Code sent!",
    //       data: { isSendMail: true, familyId: null },
    //       error: null
    //     }
    //   }
    // }

    // after verify the code
    // console.log({
    //   emailVerifiedAt,
    //   verificationCode,
    //   isCodeMatched:dbVerificationCode === verificationCode,
    //   Msg: 'verification code matched!'
    // })

    const cookiePayload = { id, name, email: existFamilyEmail, phone, role }

    const familyAccessToken = await signJwt(cookiePayload, { secret: process.env.AUTH_SECRET!, expireIn: '7d' })

    await setCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN, familyAccessToken)

    return {
      success: true,
      message: "Login Successful!",
      data: {
        isSendMail:false,
        familyId:existFamily.id
      },
      error: null
    }
  } catch (error) {
    console.log({error})
    return {
      success: false,
      message: "Failed to login!",
      data: null,
      error: null
    }
  }
}