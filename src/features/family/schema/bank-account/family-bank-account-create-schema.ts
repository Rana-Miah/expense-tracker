import { z } from "zod";

export const familyBankAccountCreateFormSchema = z.object({
    name: z.string().nonempty({message:'Name is required!'}),
    balance: z.string().nonempty({message:'Balance is required!'}),
    lbn: z.string().nonempty({message:'Local Bank Number is required!'}),
})

export type FamilyBankAccountCreateFormValue = z.infer<typeof familyBankAccountCreateFormSchema>
