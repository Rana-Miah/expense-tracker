import React from 'react'
import {ReuseableTab} from '@/components/reuseable-tab'

const page = () => {
  return (
    <ReuseableTab
     items={[
      {
        value:"shopkeeper",
        label:"Shopkeeper",
        content:<div>
          shopkeeper
        </div>
      }
      ,
      {
        value:"shopkeeper-bill",
        label:"Shopkeeper Bill",
        content:<div>shopkeeper bill</div>
      }
    ] as const} 
    />
  )
}

export default page