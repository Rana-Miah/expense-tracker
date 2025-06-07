import { ComponentType } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks"




export type WithAuthProps = {
    user: Record<string, unknown>
}

export const withAuth = <P extends WithAuthProps>(
    WrappedComponent: ComponentType<P>
) => {
    return (props: Omit<P, keyof WithAuthProps>) => {
        const user = useAuth()
        const router = useRouter()

        if (!user) {
            return router.push('/auth/login')
        }

        return <WrappedComponent {...(props as P)} user={user} />
    }
}