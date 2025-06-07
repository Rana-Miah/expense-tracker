'use server'

import { cookies } from "next/headers"

export const setCookie = async (key: string, value: string) => {

    const cookie = await cookies()

    return cookie.set(key, value, {
        httpOnly: true,
    })
}

export const getCookie = async (key: string) => {
    const cookie = await cookies()
    const token = cookie.get(key)
    if(!token)return null
    return token.value
}

export const hasCookie= async (key:string) => {
    const cookie = await cookies()
    return cookie.has(key)
}

export const deleteCookie= async (key:string) => {
    const cookie = await cookies()
    return cookie.delete(key)
}
