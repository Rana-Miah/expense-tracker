'use server'

import { TokenKey } from "@/interface/token-key-type"
import { deleteCookie } from "@/lib/helpers"

export const logOutAction = async (tokenKey:TokenKey) => {
    await deleteCookie(tokenKey)
}