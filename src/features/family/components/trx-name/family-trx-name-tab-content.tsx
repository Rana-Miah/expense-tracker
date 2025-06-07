'use client'
import { CardWrapper, DataTable } from "@/components"
import { Button } from "@/components/ui/button"
import { MODAL_TYPE } from "@/constant"
import { Family, FamilyTrxName } from "@/drizzle/type"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { Plus } from "lucide-react"
import { FamilyTrxNameTableColumns } from "./family-trx-name-table-columns"
import { pluralize } from "@/lib/helpers/plural"


type TrxNameTabContentProps = {
    familyTrxNames: (FamilyTrxName & { family: Family })[]
}

export const TrxNameTabContent = ({ familyTrxNames }: TrxNameTabContentProps) => {
    const numberOfFamilyTrxName = familyTrxNames.length
    const dispatch = useAppDispatch()

    return <CardWrapper
        title={`${pluralize(numberOfFamilyTrxName, 'Family Transaction')} Name (${numberOfFamilyTrxName})`}
        description='Family Transaction name'
        headerElement={
            <Button
            size={'sm'}
                onClick={() => {
                    dispatch(onOpen(MODAL_TYPE.F_TRX_NAME))
                }}
            >
                <Plus />
                <span>
                    New
                </span>
            </Button>
        }
    >

        <DataTable data={familyTrxNames} columns={FamilyTrxNameTableColumns} />
    </CardWrapper>
}