import { Mail } from "lucide-react"
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"

export const EmailInput = ({ label, field, disabled }: { label?: string; field: any; disabled?: boolean }) => {
    return (
        <FormItem>
            <FormLabel>{label || "Email"}</FormLabel>
            <FormControl>
                <div className='relative'>
                    <Input className='pl-8' type='email' placeholder='example@example.com' {...field} disabled={disabled} />
                    <span className='absolute top-1/2 left-4.5 -translate-y-1/2 -translate-x-1/2'>
                        <Mail size={18} />
                    </span>
                </div>
            </FormControl>
            <FormMessage />
        </FormItem>
    )
}