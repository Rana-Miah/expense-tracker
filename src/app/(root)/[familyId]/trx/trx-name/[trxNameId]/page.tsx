import { ReuseableTab } from '@/components'
import { REDIRECT_TO } from '@/constant'
import {
  FamilyTrxNameDetailsTabContent,
  FamilyTrxNameUpdateTabContent,
  FamilyTrxNameAssignTabContent,
} from '@/features/family/components/trx-name'
import { getAllFamilyBankAccountsByFamilyId } from '@/features/family/db/bank-account/get-bank-account'
import { getOnlyActiveFamilyTrxNameByIdAndFamilyId } from '@/features/family/db/trx-name/get-family-trx-name'
import { TrxNameTabType } from '@/interface/tab'
import { currentFamily } from '@/lib/current-family'
import { uuidValidator } from '@/lib/zod'
import { Info, SquarePen, Cable } from 'lucide-react'
import { redirect } from 'next/navigation'
import React from 'react'

type TrxNameDetailsPageProp = {
  params: Promise<{ familyId: string, trxNameId: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;

}

const TrxNameDetailsPage = async ({ params, searchParams }: TrxNameDetailsPageProp) => {
  const searchParam = await searchParams
  const param = await params
  
  const loggedFamily = await currentFamily()
  if (!loggedFamily) redirect(REDIRECT_TO.LOGIN_PAGE)

  const familyTrxNameId = uuidValidator(param.trxNameId)
  if (!familyTrxNameId) redirect(`/${param.familyId}/trx`)

  const trxName = await getOnlyActiveFamilyTrxNameByIdAndFamilyId(param.trxNameId, param.familyId)
  const familyBankAccounts = await getAllFamilyBankAccountsByFamilyId(param.familyId)

  if (!trxName) redirect(`/${param.familyId}/trx`)


  return (
    <ReuseableTab
      removeKeyOfValues={['assign', 'details', 'update']}
      defaultValue={(searchParam.tab as TrxNameTabType) || 'details'}
      items={[
        {
          value: 'details',
          label: 'Details',
          Icon: <Info />,
          content: <FamilyTrxNameDetailsTabContent />
        },
        {
          value: 'update',
          label: 'Update',
          Icon: <SquarePen />,
          content: <FamilyTrxNameUpdateTabContent trxName={trxName} />
        },
        {
          value: 'assign',
          label: 'Assign',
          Icon: <Cable />,
          content: <FamilyTrxNameAssignTabContent familyBanks={familyBankAccounts} familyTrxName={trxName}/>
        },
      ]}
    />
  )
}

export default TrxNameDetailsPage