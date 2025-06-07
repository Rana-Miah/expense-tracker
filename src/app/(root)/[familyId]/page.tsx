import { REDIRECT_TO } from '@/constant'
import { FamilyMemberList } from '@/features/family-member/components/member-list'
import { currentFamily } from '@/lib/current-family'
import { redirect, } from 'next/navigation'
import React from 'react'



const FamilyPage = async ({ params }: { params: Promise<{ familyId: string }> }) => {
  const loggedFamily = await currentFamily()
  if (!loggedFamily) redirect(REDIRECT_TO.LOGIN_PAGE)
  const { familyId } = await params
  if (loggedFamily.id !== familyId) redirect(`/${loggedFamily.id}`)
  return (
    <div className='space-y-6'>
      <FamilyMemberList currentFamilyId={loggedFamily.id} />

    </div>
  )
}

export default FamilyPage