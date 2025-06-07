import { ReuseableTab } from '@/components/reuseable-tab'
import { familyTab } from '@/constant/tab'
import { TrxNameTabContent } from '@/features/family/components/trx-name/family-trx-name-tab-content'
import { TrxTab } from '@/features/family/components/trx-tab-content'
import { getAllFamilyTrxNameByFamilyId } from '@/features/family/db/trx-name/get-family-trx-name'
import { TrxTabType } from '@/interface/tab'
import { formatLabel } from '@/lib/word-formatter'
import React from 'react'

type TrxPageProps = {
  params: Promise<{ familyId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}


const TrxPage = async ({ params, searchParams }: TrxPageProps) => {

  const { familyId } = await params
  const searParam = await searchParams
  const { familyTrx } = familyTab
  const familyTrxNames = await getAllFamilyTrxNameByFamilyId(familyId)

  return (
    <ReuseableTab
      removeKeyOfValues={[familyTrx.defaultActive.transaction, familyTrx.defaultActive.trxName]}
      defaultValue={(searParam.tab as TrxTabType) ||familyTrx.defaultActive.trxName }
      items={
        [
          {
            value: familyTrx.defaultActive.transaction,
            label: formatLabel(familyTrx.defaultActive.transaction),
            content: <TrxTab />
          },
          {
            value: familyTrx.defaultActive.trxName,
            label: formatLabel(familyTrx.defaultActive.trxName),
            content: <TrxNameTabContent familyTrxNames={familyTrxNames} />
          },
        ] as const}
    />
  )
}

export default TrxPage