import { CardWrapper, DataTable } from "@/components"

export const TrxTab = ()=>{

    return <CardWrapper
    title="Transaction"
    description="Create your transaction"
    >
        <div>
            <div>create button</div>
            <DataTable
            data={[]}
            columns={[]}
            />
        </div>
    </CardWrapper>
}