import { z } from "zod";

import { familyMemberRelation } from "@/drizzle/schema-helpers";


export const familyMemberRegisterSchema = z.object({
    name: z.string({ required_error: "Name is required!" }),
    phone: z.string({ required_error: "Phone is required!" })
        .min(11, { message: 'Phone must be at least 11 characters long!' })
        .max(11, { message: "Phone should not be more than 11 characters long!" }),
    email: z.string({ required_error: "Email is required!" }).email(),
    password: z.string({ required_error: "Password is required!" }),
    confirmPassword: z.string({ required_error: "Confirm password is required!" }),
    relation: z.enum(familyMemberRelation),
})

export type FamilyMemberRegisterFormValue = z.infer<typeof familyMemberRegisterSchema>