'use server'

import { SendResponse } from "@/interface"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/features/family/db/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { familyBankAccountCreateFormSchema } from "@/features/family/schema/bank-account"
import { getFamilyBankAccountByLbnAndFamilyId } from "@/features/family/db/bank-account"
import { insertFamilyBankAccount } from "@/features/family/db/bank-account"
import { FamilyBankAccount } from "@/drizzle/type"
import { revalidatePath } from "next/cache"

export const familyBankAccountCreateAction = async < E extends Error>(input: unknown): Promise<SendResponse<NonNullable<FamilyBankAccount>, E>> => {
    try {
        const validation = familyBankAccountCreateFormSchema.safeParse(input)
        if (!validation.success) return {
            success: false,
            message: 'Invalid Fields!',
            data: null,
            error: null
        }
        const { balance, lbn, name } = validation.data

        const loggedFamily = await currentFamily()
        if (!loggedFamily) return {
            success: false,
            message: 'Unauthenticated Access!',
            data: null,
            error: null
        }

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
            return {
                success: false,
                message: 'Unauthorized Access!',
                data: null,
                error: null
            }
        }

        const existFamilyBankAccountByLbn = await getFamilyBankAccountByLbnAndFamilyId(lbn, existFamily.id)

        if (existFamilyBankAccountByLbn) return {
            success: false,
            message: 'Local Bank Number already taken!',
            data: null,
            error: null
        }

        const newFamilyBankAccount = await insertFamilyBankAccount({ name, lbn, balance, familyId: existFamily.id })

        revalidatePath(`/${existFamily.id}/bank-account`)

        return {
            success: true,
            message: 'Unauthenticated Access!',
            data: newFamilyBankAccount,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create family bank account!',
            data: null,
            error
        }
    }

}