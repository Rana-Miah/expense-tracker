import { z } from 'zod'
export const familyLoginSchema = z.object({
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid Email!' }),
    password: z.string().min(1, { message: 'Password is required!' }),
    verificationCode:z.string().optional()
})

export type FamilyLoginFormValue = z.infer<typeof familyLoginSchema>
