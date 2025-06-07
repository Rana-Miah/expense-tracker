import { z } from 'zod'
export const familyRegisterSchema = z.object({
    name: z.string({ required_error: 'Name is required!' }).min(3, { message: 'Name must be at least 3 characters long!' }),
    phone: z.string({ required_error: 'Phone is required!' }).min(11, { message: 'Phone must be at least 11 characters long!' }).max(
        11,
        { message: "Phone should not be more than 11 characters long!" }
    ),
    email: z.string({ required_error: 'Email is required!' }).email({ message: 'Invalid Email!' }),
    password: z.string().min(1, { message: 'Password is required!' }),
    confirmPassword: z.string().min(1, { message: 'Password is required!' }),
}).refine(({ password, confirmPassword }) => {
    return password === confirmPassword
}, {
    message: "Password not matched!",
    path: ['confirmPassword']
})

export type FamilyRegisterFormValue = z.infer<typeof familyRegisterSchema>