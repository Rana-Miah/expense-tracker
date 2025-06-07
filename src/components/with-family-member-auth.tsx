import { ComponentType } from "react"
import { redirect } from "next/navigation"
import { currentMember } from "@/lib/current-member"

export type WrappedComponentProp = {
    member : Record<string,unknown>
}

export const withFamilyMemberAuth = <P extends WrappedComponentProp>(
    WrappedComponent: ComponentType<P>,redirectTo?:string
) => {
    return async (props: Omit<P, keyof WrappedComponentProp>) => {
        const member = await currentMember()

        if (!member) {
            redirect(redirectTo||'/')
        }

        return <WrappedComponent {...props as P} member={member}/>
    }
}