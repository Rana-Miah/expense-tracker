'use client'
import { Eye, EyeOff, Lock, Mail, Phone } from 'lucide-react';
import { FormItem, FormLabel, FormControl, FormMessage } from './ui/form';
import { Input } from './ui/input';
import { useState } from 'react';

export const PasswordInput = ({ label, field, disabled }: { label?: string; field: any; disabled?: boolean }) => {
    const [isShowPw, setIsShowPw] = useState(false)
    return (
        <FormItem>
            <FormLabel>{label || "Password"}</FormLabel>
            <FormControl>
                <div className='relative'>
                    <Input
                        className='pl-8'
                        type={isShowPw ? "text" : 'password'}
                        placeholder='********' {...field}
                        disabled={disabled}
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
    )
}