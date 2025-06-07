'use client'

import toast from "react-hot-toast"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form"
import {
  familyTrxNameUpdateFormSchema,
  FamilyTrxNameUpdateFormValue,
} from "@/features/family/schema/trx-name/family-trx-name-schema"
import { useAppDispatch } from "@/hooks/redux"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { CardWrapper } from "@/components"
import { Button } from "@/components/ui/button"
import { trxNameVariant } from "@/drizzle/schema-helpers"
import { familyTrxNameUpdateAction } from "@/features/family/action/trx-name"
import { FamilyTrxName } from "@/drizzle/type"
import { defaultActiveTab } from "@/constant/tab"

type FamilyTrxNameUpdateTabContentProp = {
  trxName:FamilyTrxName | undefined
}

export const FamilyTrxNameUpdateTabContent = ({trxName}:FamilyTrxNameUpdateTabContentProp) => {
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const familyTrxNameUpdateForm = useForm<FamilyTrxNameUpdateFormValue>(
    {
      resolver: zodResolver(familyTrxNameUpdateFormSchema),
      defaultValues: {
        name: trxName?.name,
        variant:trxName?.variant
      }
    }
  )

  const { control, reset, handleSubmit } = familyTrxNameUpdateForm

  const onSubmit = handleSubmit(value => {
    startTransition(
      async () => {
        const { success, message } = await familyTrxNameUpdateAction(trxName?.id!,value)

        if (!success) {
          toast.error(message)
          return
        }
        reset()
        router.push(`/${trxName?.familyId}/trx?tab=trx-name`)
        toast.success(message)
      }
    )
  })

  return (
    <CardWrapper
      title="Transaction Name Update Form"
      description="Update your transaction name!"
    >
      <Form {...familyTrxNameUpdateForm}>
        <form className='space-y-4' onSubmit={onSubmit}>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder='Rohan Hamid' {...field} disabled={pending} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='variant'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Name Variant</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending}>
                    <FormControl className="w-full">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a transaction Variant?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className='w-full'>
                      {trxNameVariant.map(
                        variant => (
                          <SelectItem value={variant} key={variant}>{variant}</SelectItem>
                        )
                      )
                      }
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='w-full' type='submit' disabled={pending}>
            {pending?"Saving...":"Save"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}