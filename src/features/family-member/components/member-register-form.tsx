'use client'

import { useTransition } from "react"
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-hot-toast'


import { Input } from '@/components/ui/input'
import { useAppDispatch } from "@/hooks/redux"
import { Button } from '@/components/ui/button'
import { EmailInput } from "@/components/email-input"
import { familyMemberRegisterAction } from "../actions"
import { onClose } from "@/lib/redux/slice/modal-slice"
import { PasswordInput } from "@/components/password-input"
import { familyMemberRelation } from "@/drizzle/schema-helpers"
import { FamilyMemberRegisterFormValue, familyMemberRegisterSchema } from "../schema"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'


export const MemberRegisterForm = () => {
    const [pending, startTransition] = useTransition()
    const dispatch = useAppDispatch()
    const router = useRouter()
    const memberRegisterForm = useForm<FamilyMemberRegisterFormValue>(
        {
            resolver: zodResolver(familyMemberRegisterSchema),
            defaultValues: {
                name: 'Raiyan Hamid',
                email: "raiyan.hamid@gamil.com",
                phone: '01785585238',
                password: "123456789",
                confirmPassword: "123456789",
            }
        }
    )

    const { control, reset, handleSubmit } = memberRegisterForm

    const onSubmit = handleSubmit(value => {
        startTransition(
            async () => {
                const { success, message} = await familyMemberRegisterAction(value)

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

    return <Form {...memberRegisterForm}>
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
                name='phone'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder='01xxxxxxxx' {...field} disabled={pending} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='email'
                render={({ field }) => (
                    <EmailInput field={field} />
                )}
            />

            <FormField
                control={control}
                name='password'
                render={({ field }) => (
                    <PasswordInput field={field} />
                )}
            />
            <FormField
                control={control}
                name='confirmPassword'
                render={({ field }) => (
                    <PasswordInput field={field} label="Confirm Password" />
                )}
            />

            <FormField
                control={control}
                name='relation'
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Relation between you & member</FormLabel>
                        <FormControl>
                            <Select onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl className="w-full">
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Member Relation?" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent className='w-full'>
                                    {familyMemberRelation.map(relation => (<SelectItem value={relation} key={relation}>{relation}</SelectItem>))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />


            <Button className='w-full' type='submit'>
                Continue
            </Button>
        </form>
    </Form>
}
