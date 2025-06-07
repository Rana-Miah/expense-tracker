import Link from "next/link"
import { currentFamily } from "@/lib/current-family"
import { LogOutButton } from "@/features/auth/components/log-out"
import { TOKEN_KEY } from "@/constant/token-constant"
import { appRoute } from "@/constant"
import { currentMember } from "@/lib/current-member"

export const Navbar = async () => {

    const loggedFamily = await currentFamily()
    const loggedMember = await currentMember()
    const routes = Object.entries(appRoute).map(([key, value]) => {
        if(key==='FAMILY'){
            return {
                href: `/${loggedFamily?.id}`,
                label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
                id:value
            }

        }
        if(key==='MEMBER'){
            return {
                href: `/${loggedFamily?.id}/member/${loggedMember?.id}`,
                label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
                id:value
            }

        }
        return {
            href: value,
            label:`${key.slice(0,1)}${key.slice(1,key.length).toLocaleLowerCase()}`,
            id:value
        }
    })

    return (
        <nav>
            <ul className="flex flex-wrap items-center justify-center gap-4 border py-5 px-4 shadow-sm">
                {
                    routes.map(
                        route => (
                            <li className="border border-indigo-800 px-2 py-1" key={route.id}>
                                <Link href={route.href.toLocaleLowerCase()}>{route.label}</Link>
                            </li>

                        )
                    )
                }
                {
                    loggedFamily && <LogOutButton tokenKey={TOKEN_KEY.FAMILY_ACCESS_TOKEN} redirectTo="/auth/login"/>
                }
                {/* <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/'}>Home</Link>
                </li>
                <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/dashboard'}>Dashboard</Link>
                </li>
                <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/public-route'}>Public</Link>
                </li>
                <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/not-public-route'}>Not Public</Link>
                </li>
                <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/auth/login'}>Login</Link>
                </li>
                <li className="border border-b-indigo-800 px-2 py-1">
                    <Link href={'/auth/register'}>Register</Link>
                </li>
                {!loggedFamily && <>
                    <li className="border border-b-indigo-800 px-2 py-1">
                        <Link href={'/auth/login'}>Login</Link>
                    </li>
                    <li className="border border-b-indigo-800 px-2 py-1">
                        <Link href={'/auth/register'}>Register</Link>
                    </li>

                </>}
                {
                    loggedFamily && <LogOutButton tokenKey={TOKEN_KEY.FAMILY_ACCESS_TOKEN} />
                } */}
            </ul>

        </nav>
    )
}
