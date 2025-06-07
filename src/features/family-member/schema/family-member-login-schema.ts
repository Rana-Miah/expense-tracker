import { z } from "zod";

export const familyMemberLoginSchema = z.object({
    phone: z.string({ required_error: 'Email is required!' }).min(11, { message: 'Phone number must be at least 11 digit' }).max(11, { message: 'Phone number must be less than 12 digit' }),
    password: z.string().min(1, { message: 'Password is required!' })
})

export type FamilyMemberLoginFormValue = z.infer<typeof familyMemberLoginSchema>