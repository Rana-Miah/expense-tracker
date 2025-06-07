'use client'

import { CardWrapper } from "@/components"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FamilyBankAccount, FamilyTrxName } from "@/drizzle/type"
import { useForm } from "react-hook-form"
import {
  assignFamilyBankFormSchema,
  AssignFamilyBankFormValue
} from "@/features/family/schema/trx-name"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import { assignFamilyTrxNameActions } from "@/features/family/action/trx-name"

type FamilyTrxNameAssignTabContentProp = {
  familyTrxName: FamilyTrxName;
  familyBanks: FamilyBankAccount[];
}

export const FamilyTrxNameAssignTabContent = ({ familyBanks, familyTrxName }: FamilyTrxNameAssignTabContentProp) => {

  const [selectedSourceBankId, setSelectedSourceBankId] = useState('')
  const [pending, startTransition] = useTransition()

  const isBoth = familyTrxName.variant === 'BOTH'
  const isSource = familyTrxName.variant === 'SOURCE'
  const isReceive = familyTrxName.variant === 'RECEIVE'
  const isSelectedSource = !!selectedSourceBankId

  const receiveBanks = familyBanks.filter(({ id }) => id !== selectedSourceBankId)

  const assignFamilyBankForm = useForm<AssignFamilyBankFormValue>({
    resolver: zodResolver(assignFamilyBankFormSchema),
  })

  const { handleSubmit, reset, control } = assignFamilyBankForm

  const onSubmit = handleSubmit((formValue) => {
    startTransition(
      async () => {
        const res = await assignFamilyTrxNameActions(formValue, familyTrxName.id)
        console.log({ res })
      }
    )
  })

  return (
    <CardWrapper
      title={`Assign Bank Form -  [${familyTrxName.name}]`}
      description='Assign your transaction name with bank'
    >
      <Form {...assignFamilyBankForm}>

        <form onSubmit={onSubmit} className='space-y-4'>
          {(isSource || isBoth) && (
            <FormField
              control={control}
              name='sourceBankId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Source Bank Accounts</FormLabel>
                  <FormControl>
                    <Select onValueChange={(value) => {
                      setSelectedSourceBankId(value)
                      field.onChange(value)
                    }}
                      defaultValue={field.value}
                      disabled={pending}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select source bank account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        {familyBanks.map(({ id, name, }) => (<SelectItem value={id} key={id}>{name}</SelectItem>))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {(isReceive || isBoth) && (
            <FormField
              control={control}
              name='receiveBankId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Receive Bank Accounts</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={pending || (isBoth && !isSelectedSource)}>
                      <FormControl className="w-full">
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select receive bank account" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className='w-full'>
                        {receiveBanks.map(({ id, name, }) => (
                          <SelectItem value={id} key={id}>{name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <Button type='submit' disabled={pending}>{pending ? "Assigning..." : "Assign"}</Button>
        </form>
      </Form>
    </CardWrapper>
  )
}
