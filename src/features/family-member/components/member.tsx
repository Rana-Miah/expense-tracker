'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { MODAL_TYPE, REDIRECT_TO } from "@/constant"
import { TOKEN_KEY } from "@/constant/token-constant"
import { LogOutButton } from "@/features/auth/components/log-out"
import { useAuth } from "@/hooks"
import { useAppDispatch } from "@/hooks/redux"
import { onOpen } from "@/lib/redux/slice/modal-slice"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export const Member = ({ member }: { member: { id: number, name: string, phone: string } }) => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const session = useAuth()
    return (
        <div onClick={(e) => {
            e.stopPropagation()
            if (!session?.member) {
                return dispatch(onOpen(MODAL_TYPE.MEMBER_LOGIN))
            }
            return router.push('/family-page-id/member/member-page-id')
        }}>
            <Card className={cn(session?.member ? "flex flex-row w-full items-center justify-between" : "")}>
                <CardHeader>
                    <CardTitle>{member.name}</CardTitle>
                    <CardDescription>
                        {member.phone}
                    </CardDescription>
                </CardHeader>
                {
                    session?.member && <CardContent>
                        <LogOutButton tokenKey={TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN} redirectTo={REDIRECT_TO.HOME}>Exit</LogOutButton>
                    </CardContent>
                }
            </Card>
        </div>
    )
}