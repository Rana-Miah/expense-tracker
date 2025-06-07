'use server'

import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "../../db/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getFamilyTrxNameByIdAndFamilyId } from "../../db/trx-name/get-family-trx-name"
import { revalidatePath } from "next/cache"
import { FamilyTrxName } from "@/drizzle/type"
import { updateFamilyTrxName } from "../../db/trx-name/update-family-trx-name"
import { familyTrxNameUpdateFormSchema } from "../../schema/trx-name/family-trx-name-schema"


export const familyTrxNameUpdateAction = async (trxNameId:string,payload:Partial<FamilyTrxName>) => {
    try {
        const loggedFamily = await currentFamily()
        if (!loggedFamily) return {
            success: false,
            message: 'Unauthenticated Access!',
            data: null,
            error: null
        }

        const validation = familyTrxNameUpdateFormSchema.safeParse(payload)

         if (!validation.success) return {
            success: false,
            message: 'Invalid Fields!',
            data: null,
            error: null
        }

        const existFamily = await getFamilyById(loggedFamily.id)

        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
            return {
                success: false,
                message: 'Unauthenticated Access!',
                data: null,
                error: null
            }
        }

        const existFamilyTrxName = await getFamilyTrxNameByIdAndFamilyId(trxNameId, existFamily.id)

        if (!existFamilyTrxName) return {
            success: false,
            message: 'Trx Name not exist!',
            data: null,
            error: null
        }

        const updatedFamilyTrxName = await updateFamilyTrxName(trxNameId, existFamily.id,payload)


        revalidatePath(`/${existFamily.id}/trx`)

        return {
            success: true,
            message: 'Transaction Name updated!',
            data: updatedFamilyTrxName,
            error: null
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'Failed to update family trx name',
            data: null,
            error
        }
    }
}