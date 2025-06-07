import { ReuseableTab } from '@/components/reuseable-tab'
import React from 'react'

const page = () => {
  return (
   <ReuseableTab
   items={[
    {
      value:'loan',
      label:'Loan',
      content:<div>Loan</div>
    },
    {
      value:'loan-provider',
      label:'Loan Provider',
      content:<div>Provider</div>
    },
    {
      value:'loan-provider-bill',
      label:'Loan Provider Bill',
      content:<div>Bill</div>
    },
   ]as const}
   />
  )
}

export default page