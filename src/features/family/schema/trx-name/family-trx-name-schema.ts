import { trxNameVariant } from "@/drizzle/schema-helpers";
import { z } from "zod";

export const familyTrxNameCreateFormSchema = z.object(
    {
        name:z.string().min(1,{message:'Name is required!'}),
        variant:z.enum(trxNameVariant)
    }
)
export const familyTrxNameUpdateFormSchema = z.object(
    {
        name:z.string().min(1,{message:'Name is required!'}).optional(),
        variant:z.enum(trxNameVariant).optional(),
        isDeleted:z.boolean().optional()
    }
)

export type FamilyTrxNameFormValue = z.infer<typeof familyTrxNameCreateFormSchema>
export type FamilyTrxNameUpdateFormValue = z.infer<typeof familyTrxNameUpdateFormSchema>