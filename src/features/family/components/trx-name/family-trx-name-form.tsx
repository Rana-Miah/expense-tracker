'use client'

import { useAppDispatch } from "@/hooks/redux"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import {  useForm } from "react-hook-form"
import { familyTrxNameCreateFormSchema, FamilyTrxNameFormValue } from "../../schema/trx-name/family-trx-name-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { trxNameVariant } from "@/drizzle/schema-helpers"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { onClose } from "@/lib/redux/slice/modal-slice"
import { familyTrxNameCreateAction } from "../../action/trx-name/family-trx-name-create-action"

export const FamilyTrxNameForm = () => {
    const [pending, startTransition] = useTransition()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const familyTrxNameForm = useForm<FamilyTrxNameFormValue>(
        {
            resolver: zodResolver(familyTrxNameCreateFormSchema),
            defaultValues: {
                name: ''
            }
        }
    )

    const { control, reset, handleSubmit } = familyTrxNameForm

    const onSubmit = handleSubmit(value => {
        startTransition(
            async () => {
                const { success, message} = await familyTrxNameCreateAction(value)

                if (!success) {
                    toast.error(message)
                    return
                }
                reset()
                router.refresh()
                dispatch(onClose())
                toast.success(message)
            }
        )
    })

    return <Form {...familyTrxNameForm}>
        <form className='space-y-4' onSubmit={onSubmit}>
            <FormField
                control={control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g. EXPENSE' {...field} disabled={pending} />
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
                            <Select onValueChange={field.onChange} defaultValue={field.value} disabled={pending} >
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
                Continue
            </Button>
        </form>
    </Form>
}