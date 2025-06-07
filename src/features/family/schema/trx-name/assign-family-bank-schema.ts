import { z } from "zod";

export const assignFamilyBankFormSchema = z.object({
    sourceBankId:z.string().uuid({message:'Invalid Source Bank Id!'}).optional(),
    receiveBankId:z.string().uuid({message:'Invalid Receive Bank Id!'}).optional(),
})

export type AssignFamilyBankFormValue = z.infer<typeof assignFamilyBankFormSchema>