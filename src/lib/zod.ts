
import z from 'zod'

const uuidSchema = z.string().uuid({message:'Invalid id!'})

export const uuidValidator = (input:unknown)=>{
    const validation = uuidSchema.safeParse(input)
    if(!validation.success)return false
    return validation.data
}