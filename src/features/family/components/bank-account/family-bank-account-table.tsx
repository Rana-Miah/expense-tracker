'use client'
import { CardWrapper, DataTable } from "@/components"
import { Button } from "@/components/ui/button"
import { Family, FamilyBankAccount } from "@/drizzle/type"
import { pluralize } from "@/lib/helpers/plural"
import { familyBankAccountTableColumns } from "./family-bank-account-table-columns"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { MODAL_TYPE } from "@/constant"

type FamilyBankAccountTableProps = {
    familyBankAccounts: (FamilyBankAccount & { family: Family })[]
}

export const FamilyBankAccountTable = ({ familyBankAccounts }: FamilyBankAccountTableProps) => {
    const numberOfFamilyBankAccounts = familyBankAccounts.length
    const dispatch = useAppDispatch()


    return (
        <CardWrapper
            title={`${pluralize(numberOfFamilyBankAccounts, 'Family Bank Account')} (${numberOfFamilyBankAccounts})`}
            description="Family bank accounts"
            headerElement={
                <Button 
                size={'sm'}
                 className="px-2"
                onClick={()=>{dispatch(onOpen(MODAL_TYPE.F_BANK_ACCOUNT))}}
                
                >Create Bank</Button>
            }
        >
            <DataTable data={familyBankAccounts} columns={familyBankAccountTableColumns} />
        </CardWrapper>
    )
}