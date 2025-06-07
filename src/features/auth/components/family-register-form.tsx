
'use client';
import Link from 'next/link'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { familyRegisterSchema } from '../schema';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import { useState, useTransition } from 'react';
import { CardWrapper } from '@/components/card-wrapper';
import { familyRegisterAction } from '../actions/family-register-action';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { REDIRECT_TO } from '@/constant';

export function FamilyRegisterForm() {
  const [isShowPw, setIsShowPw] = useState(false)
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const registerForm = useForm({
    resolver: zodResolver(familyRegisterSchema),
    defaultValues: {
      name: "Happy Family",
      phone: "01569655824",
      email: "my.happy.family@gmail.com",
      password: "123456",
      confirmPassword: "123456",
    }
  });

  const {
    handleSubmit,
    control,
    reset
  } = registerForm

  const onSubmit = handleSubmit((values) => {
    startTransition(
      async () => {
        const { success, message } = await familyRegisterAction(values)
        if (!success) {
          toast.error(message)
          return
        }
        router.push(REDIRECT_TO.LOGIN_PAGE)
        reset()
        toast.success('success!')
        return
      }
    )
  })

  return (
    <CardWrapper
      title='Register Form'
      description='create your family'
    >
      <Form {...registerForm}>
        <form onSubmit={onSubmit} className='space-y-6'>
          <FormField
            control={control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type='text' placeholder='Rana Miah' {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input className='pl-8' type='text' placeholder='01xxxxxxxxx' {...field} disabled={false} />
                    <span className='absolute top-1/2 left-4.5 -translate-y-1/2 -translate-x-1/2'>
                      <Phone size={18} />
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input className='pl-8' type='email' placeholder='example@example.com' {...field} disabled={false} />
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
          <FormField
            control={control}
            name='confirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
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

          <Button type='submit' className='w-full'>Register</Button>
          <div className='flex flex-col w-full items-center justify-center text-sm gap-2'>
            <div className='text-sm'>
              Already have an account?
              <Link href='/auth/login'>
                <span className='font-semibold ml-2'>
                  Login
                </span>
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
}
