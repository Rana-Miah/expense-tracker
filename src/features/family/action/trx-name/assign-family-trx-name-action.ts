'use server'

import {
    assignFamilyBankFormSchema,
    AssignFamilyBankFormValue
} from "@/features/family/schema/trx-name"
import { SendResponse } from "@/interface"
import { currentFamily } from "@/lib/current-family"
import { getFamilyById } from "@/features/family/db/get-family"
import { deleteCookie } from "@/lib/helpers"
import { TOKEN_KEY } from "@/constant/token-constant"
import {
    getOnlyActiveFamilyTrxNameByIdAndFamilyId,
    getExistAssignedSourceAndReceiveBank
} from "@/features/family/db/trx-name"
import {
    getOnlyActiveExistFamilySourceAndReceiveBankByIdAndFamilyId
} from "@/features/family/db/bank-account"
import { db } from "@/drizzle/db"
import { assignFamilyReceiveBankTable, assignFamilySourceBankTable } from "@/drizzle/schema"
import { trxsNameReceiveByCash, trxsNameSourceByCash } from "@/constant/trx-name"
import { isInclude } from "@/lib/utils"
import { failureResponse, successResponse } from "@/lib/helpers/send-response"

export interface AssignFamilyTrxNameResponse {
    source?: typeof assignFamilySourceBankTable.$inferSelect;
    receive?: typeof assignFamilyReceiveBankTable.$inferSelect;
}



export const assignFamilyTrxNameActions = async <
    E extends Error
>(
    input: AssignFamilyBankFormValue,
    familyTrxNameId: string
): Promise<SendResponse<AssignFamilyTrxNameResponse | null, E>> => {
    try {
        const validation = assignFamilyBankFormSchema.safeParse(input)
        if (!validation.success) return failureResponse('Invalid Fields!')

        const { receiveBankId, sourceBankId } = validation.data
        // if both bank id not provided
        if (!receiveBankId && !sourceBankId) return failureResponse('Please select a bank account!')

        // if family not logged in
        const loggedFamily = await currentFamily()
        if (!loggedFamily) return failureResponse('Unauthenticated Access!')

        // if logged family not register in db
        const existFamily = await getFamilyById(loggedFamily.id)
        if (!existFamily) {
            await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
            await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
            return failureResponse('Unauthorized Access!')
        }

        // if trx name not exist
        const existFamilyTrxName = await getOnlyActiveFamilyTrxNameByIdAndFamilyId(
            familyTrxNameId,
            existFamily.id
        )
        if (!existFamilyTrxName) return failureResponse('Invalid Transaction Name!')

        // getting exist source & receive bank
        const { existFamilySourceBank, existFamilyReceiveBank } = await getOnlyActiveExistFamilySourceAndReceiveBankByIdAndFamilyId(
            sourceBankId,
            receiveBankId,
            existFamily.id
        )

        if (sourceBankId && !existFamilySourceBank) return failureResponse('Invalid source bank account!')
        if (receiveBankId && !existFamilyReceiveBank) return failureResponse('Invalid receive bank account!')

        // getting exist assigned source & receive bank with trx name
        const { existAssignedFamilyReceiveBank, existAssignedFamilySourceBank } = await getExistAssignedSourceAndReceiveBank(
            existFamilySourceBank?.id,
            existFamilyReceiveBank?.id,
            existFamilyTrxName.id
        )

        //check if both bank already assigned under trx name
        if (existAssignedFamilyReceiveBank && existAssignedFamilySourceBank) return failureResponse('Selected Banks Already Assigned!')

        // Assign both
        if (
            existFamilySourceBank
            && existFamilyReceiveBank
            && !existAssignedFamilySourceBank
            && !existAssignedFamilyReceiveBank
        ) {

            if (existFamilySourceBank.id === existFamilyReceiveBank.id) return failureResponse(
                'Source and Receive Bank should not be same!'
            )

            if (
                isInclude(trxsNameReceiveByCash, existFamilyTrxName.name)
                && existFamilyReceiveBank.name.toLocaleLowerCase() !== 'cash'
            ) return failureResponse("Receive Bank must be Cash")

            if (
                isInclude(trxsNameSourceByCash, existFamilyTrxName.name)
                && existFamilySourceBank.name.toLocaleLowerCase() !== 'cash'
            ) return failureResponse("Source Bank must be Cash")

            return await db.transaction(
                async (tx) => {
                    const [newAssignedSource] = await tx
                        .insert(assignFamilySourceBankTable)
                        .values({
                            familySourceBankId: existFamilySourceBank.id,
                            familyTrxNameId: existFamilyTrxName.id
                        })
                        .returning()

                    const [newAssignedReceive] = await tx
                        .insert(assignFamilyReceiveBankTable)
                        .values({
                            familyReceiveBankId: existFamilyReceiveBank.id,
                            familyTrxNameId: existFamilyTrxName.id
                        })
                        .returning()

                    if (!newAssignedSource || !newAssignedReceive) {
                        tx.rollback()
                        return failureResponse('Failed to assign both bank!')
                    }

                    return successResponse('Assigned both source and receive banks.', {
                        source: newAssignedSource,
                        receive: newAssignedReceive
                    })
                })
        }

        // Assign only source
        if (existFamilySourceBank && !existAssignedFamilySourceBank) {
            const [newAssignedSource] = await db
                .insert(assignFamilySourceBankTable)
                .values({
                    familySourceBankId: existFamilySourceBank.id,
                    familyTrxNameId: existFamilyTrxName.id
                })
                .returning()

            if (!newAssignedSource) return failureResponse('Failed to assign source bank!')

            return successResponse('Assigned source bank.', { source: newAssignedSource })
        }

        // Assign only receive
        if (existFamilyReceiveBank && !existAssignedFamilyReceiveBank) {
            const [newAssignedReceive] = await db
                .insert(assignFamilyReceiveBankTable)
                .values({
                    familyReceiveBankId: existFamilyReceiveBank.id,
                    familyTrxNameId: existFamilyTrxName.id
                })
                .returning()

            if (!newAssignedReceive) return failureResponse('Failed to assign receive bank!')

            return successResponse('Assigned receive bank.', { receive: newAssignedReceive })
        }

        return failureResponse('Already assigned!')
    } catch (error) {
        return failureResponse('Something went wrong!')
    }
}
