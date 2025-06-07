'use server'

import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "../../db/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import { getOnlyActiveFamilyTrxNameByIdAndFamilyId } from "@/features/family/db/trx-name"
import { revalidatePath } from "next/cache"
import { deleteFamilyTrxName } from "../../db/trx-name/delete-family-trx-name"


export const familyTrxNameDeleteAction = async (trxNameId:string) => {
    try {
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
            return {
                success: false,
                message: 'Unauthenticated Access!',
                data: null,
                error: null
            }
        }

        const existFamilyTrxName = await getOnlyActiveFamilyTrxNameByIdAndFamilyId(trxNameId, existFamily.id)

        if (!existFamilyTrxName) return {
            success: false,
            message: 'Trx Name not exist!',
            data: null,
            error: null
        }

        const deletedFamilyTrxName = await deleteFamilyTrxName(trxNameId, existFamily.id)


        revalidatePath(`/${existFamily.id}/trx`)

        return {
            success: true,
            message: 'Transaction Name deleted!',
            data: deletedFamilyTrxName,
            error: null
        }
    } catch (error) {
        return {
            success: false,
            message: 'Failed to delete family trx name',
            data: null,
            error
        }
    }
}