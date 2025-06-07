import { db } from "@/drizzle/db"
import { assignFamilyReceiveBankTable, assignFamilySourceBankTable } from "@/drizzle/schema"
import { and, eq } from "drizzle-orm"

export const getAssignedFamilySourceBank = async (familySourceBankId:string,familyTrxNameId:string)=>(
    await db.query.assignFamilySourceBankTable.findFirst({
        where:and(
            eq(assignFamilySourceBankTable.familySourceBankId,familySourceBankId),
            eq(assignFamilySourceBankTable.familyTrxNameId,familyTrxNameId),
        )
    })
)

export const getAssignedFamilyReceiveBank = async (familyReceiveBankId:string,familyTrxNameId:string)=>(
    await db.query.assignFamilyReceiveBankTable.findFirst({
        where:and(
            eq(assignFamilyReceiveBankTable.familyReceiveBankId,familyReceiveBankId),
            eq(assignFamilyReceiveBankTable.familyTrxNameId,familyTrxNameId),
        )
    })
)


export const getExistAssignedSourceAndReceiveBank = async (
    existFamilySourceBankId:string|undefined,
    existFamilyReceiveBankId:string|undefined,
    existFamilyTrxNameId:string
)=>{

    const [existAssignedFamilySourceBank, existAssignedFamilyReceiveBank] = await Promise.all([
        existFamilySourceBankId
        ? getAssignedFamilySourceBank(existFamilySourceBankId, existFamilyTrxNameId)
        : undefined,
        existFamilyReceiveBankId
        ? getAssignedFamilyReceiveBank(existFamilyReceiveBankId, existFamilyTrxNameId)
        : undefined
    ])
    return {existAssignedFamilySourceBank,existAssignedFamilyReceiveBank}
}