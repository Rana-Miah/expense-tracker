'use client'

import { useAppDispatch } from "@/hooks/redux"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import toast from "react-hot-toast"
import { onClose } from "@/lib/redux/slice/modal-slice"
import {
    familyBankAccountCreateFormSchema,
    FamilyBankAccountCreateFormValue
} from "@/features/family/schema/bank-account"
import { familyBankAccountCreateAction } from "@/features/family/action/bank-account"

export const FamilyBankAccountForm = () => {
    const [pending, startTransition] = useTransition()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const familyBankAccountForm = useForm<FamilyBankAccountCreateFormValue>(
        {
            resolver: zodResolver(familyBankAccountCreateFormSchema),
            defaultValues: {
                name: '',
                balance: '0',
                lbn:""
            }
        }
    )

    const { control, reset, handleSubmit } = familyBankAccountForm

    const onSubmit = handleSubmit(formValue => {
        startTransition(
            async () => {
                const {data, success, message} = await familyBankAccountCreateAction(formValue)

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

    return <Form {...familyBankAccountForm}>
        <form className='space-y-4' onSubmit={onSubmit}>
            <FormField
                control={control}
                name='name'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bank Account Name</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g. BKASH' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='balance'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Bank Account Balance</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder='e.g. 1500' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='lbn'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Local Bank Number</FormLabel>
                        <FormControl>
                            <Input placeholder='e.g. BKASH-01xxxxxxxxx' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
           
            <Button className='w-full' type='submit' disabled={pending}>
                Create Account
            </Button>
        </form>
    </Form>
}