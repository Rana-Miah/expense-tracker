import { ComponentType } from "react"
import { redirect } from "next/navigation"
import { currentFamily } from "@/lib/current-family"

export type WithAuthProps = {
    user : Record<string,unknown>
}

export const withAuth = <P extends WithAuthProps>(
    WrappedComponent: ComponentType<P>,redirectTo?:string
) => {
    return async (props: Omit<P, keyof WithAuthProps>) => {
        const user = await currentFamily()

        if (!user) {
            redirect(redirectTo||'/auth/login')
        }

        return <WrappedComponent {...(props as P)} user={user}/>
    }
}