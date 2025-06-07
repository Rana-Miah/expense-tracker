'use client'
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ComponentProps, FormEvent } from "react"
import { TokenKey } from "@/interface/token-key-type"
import { logOutAction } from "../actions"

type LogoutButtonProps = ComponentProps<'button'>&{ tokenKey: TokenKey,redirectTo?:string }

export const LogOutButton = ({tokenKey,redirectTo,children,...props}:LogoutButtonProps) => {

    const router = useRouter()

    const onSubmit = async (e: FormEvent) => {
        e.preventDefault()
        e.stopPropagation()
        await logOutAction(tokenKey)
        router.push(redirectTo||'/auth/login')
        router.refresh()
    }

    return (
        <form onSubmit={onSubmit}>
            <Button type="submit"{...props}>{children||'Log out'}</Button>
        </form>
    )
}