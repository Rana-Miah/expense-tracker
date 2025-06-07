
import { REDIRECT_TO } from "@/constant"
import { FamilyBankAccountTable } from "@/features/family/components/bank-account/family-bank-account-table"
import { getAllFamilyBankAccountsByFamilyId } from "@/features/family/db/bank-account/get-bank-account"
import { currentFamily } from "@/lib/current-family"
import { redirect } from "next/navigation"

const FamilyBankAccount = async () => {
  const loggedFamily = await currentFamily()
  if (!loggedFamily) redirect(REDIRECT_TO.LOGIN_PAGE)

  const familyBankAccounts = await getAllFamilyBankAccountsByFamilyId(loggedFamily.id)

  return (
    <FamilyBankAccountTable familyBankAccounts={familyBankAccounts} />
  )
}

export default FamilyBankAccount