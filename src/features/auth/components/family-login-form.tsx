'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { familyLoginAction } from '../actions';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { FamilyLoginFormValue, familyLoginSchema } from '../schema';
import Link from 'next/link';
import { CardWrapper } from '@/components/card-wrapper';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'
import toast from 'react-hot-toast';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useCoolDown } from '@/hooks/use-coolDown';

export function FamilyLoginForm() {
  const { coolDown, setCoolDown } = useCoolDown()
  const [verificationCode, setVerificationCode] = useState("")
  const [showVerifyForm, setShowVerifyForm] = useState(false)
  const [isShowPw, setIsShowPw] = useState(false)
  const [pending, startTransition] = useTransition()
  const router = useRouter()
  const loginForm = useForm<FamilyLoginFormValue>({
    resolver: zodResolver(familyLoginSchema),
    defaultValues: {
      email: "my.happy.family@gmail.com",
      password: "123456"
    },
  });



  const { handleSubmit, control, reset } = loginForm

  const onSubmit = handleSubmit((v) => {
    startTransition(
      async () => {
        const { data, success, error, message } = await familyLoginAction(v)

        if (!success) {
          toast.error(message)
          reset()
          return
        }
        if (data && data.isSendMail) {
          setShowVerifyForm(data.isSendMail)
          setCoolDown(5)
          toast.success(message)
          return
        }
        toast.success(message)
        router.push(`/${data?.familyId}`)
        console.log('login in action result');
      }
    )

  })


  return (
    <CardWrapper
      title={showVerifyForm ? "Verify Your Email" : 'Welcome Back'}
      description={showVerifyForm ? "Check your Email to get the verification code" : 'Family Expense Tracker'}
    >
      <Form {...loginForm}>
        <form onSubmit={onSubmit} className='space-y-6'>
          {
            showVerifyForm
              ? <FormField
                control={control}
                name='verificationCode'
                render={({ field }) => (
                  <InputOTP maxLength={6} {...field} onChange={(v) => {
                    setVerificationCode(v)
                    field.onChange(v)
                  }}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                )}
              />
              : <>
                <FormField
                  control={control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input className='pl-8' type='email' placeholder='example@example.com' {...field} disabled={pending} />
                          <span className='absolute top-1/2 left-4.5 -translate-y-1/2 -translate-x-1/2'>
                            <Mail size={18} />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <div className='relative'>
                          <Input
                            className='pl-8'
                            type={isShowPw ? "text" : 'password'}
                            placeholder='********' {...field}
                            disabled={pending}
                          />
                          <span className='absolute top-1/2 right-1 -translate-y-1/2 -translate-x-1/2' onClick={
                            () => setIsShowPw(prev => !prev)
                          }>
                            {
                              isShowPw
                                ? <EyeOff size={18} />
                                : <Eye size={18} />
                            }
                          </span>
                          <span className='absolute top-1/2 left-4.5 -translate-y-1/2 -translate-x-1/2'>
                            <Lock size={18} />
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
          }

          <Button type='submit' disabled={pending || showVerifyForm && verificationCode.length === 0} className='w-full'>
            {
              pending
                ? "Logging..."
                : showVerifyForm
                  ? "Verify" : "Login"
            }
          </Button>

          {showVerifyForm && <Button type='submit' disabled={pending || coolDown > 0 || verificationCode.length > 0} className='w-full'>
            {
              coolDown > 0
                ? `Resend in ${coolDown}`
                : "Resend Email"
            }
          </Button>}

          {
            !showVerifyForm && <div className='flex flex-col w-full items-center justify-center text-sm gap-2'>
              <div className='text-sm'>
                Don't have account?
                <Link href='/auth/register'>
                  <span className='font-semibold ml-2'>
                    Register
                  </span>
                </Link>
              </div>
              <span className=''>
                <Link href='/auth/reset-password'>
                  Forgot Password?
                </Link>
              </span>
            </div>
          }
        </form>
      </Form>
    </CardWrapper>
  );
}
