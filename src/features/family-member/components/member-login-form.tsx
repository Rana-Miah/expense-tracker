'use client'

import { useTransition } from "react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useAppDispatch } from "@/hooks/redux"
import { onClose } from "@/lib/redux/slice/modal-slice"
import { FamilyMemberLoginFormValue, familyMemberLoginSchema } from "../schema"
import { familyMemberLoginAction } from "../actions/family-member-login-action"


export const MemberLoginForm = () => {
    const [pending,startTransition] = useTransition()
    const dispatch=useAppDispatch()
    const router = useRouter()
    const memberLoginForm = useForm<FamilyMemberLoginFormValue>(
        {
            resolver: zodResolver(familyMemberLoginSchema),
            defaultValues: {
                phone: '01785585238',
                password: "123456789"
            }
        }
    )

    const { control, reset, handleSubmit } = memberLoginForm

    const onSubmit =handleSubmit(value=>{
        startTransition(
            async()=>{
                const res = await familyMemberLoginAction(value)
                dispatch(onClose())
                router.push('/family-page-id/member/member-page-id')
            }
        )
    })

    return <Form {...memberLoginForm}>
        <form className='space-y-4' onSubmit={onSubmit}>
            <FormField
                control={control}
                name='phone'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input placeholder='01xxxxxxxx' {...field} disabled={pending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <FormField
                control={control}
                name='password'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                            <Input type='password' placeholder='********' {...field} disabled={pending}/>
                        </FormControl>
                        <FormMessage/>
                    </FormItem>
                )}
            />
            <Button className='w-full' type='submit'>
                Continue
            </Button>
        </form>
    </Form>
}
