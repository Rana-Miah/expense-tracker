import { Container } from "@/components/container"
import { NavLink } from "@/components/nav-link"
import { TOKEN_KEY } from "@/constant/token-constant"
import { currentFamily } from "@/lib/current-family"
import { deleteCookie } from "@/lib/helpers"
import Link from "next/link"
import { redirect } from "next/navigation"




export const FamilyNavbar = async () => {
    const loggedFamily = await currentFamily()
    if (!loggedFamily) {
        await deleteCookie(TOKEN_KEY.FAMILY_ACCESS_TOKEN)
        await deleteCookie(TOKEN_KEY.FAMILY_MEMBER_ACCESS_TOKEN)
        redirect('/auth/login')
    }
    const navbarLinks = [
        {
            href: `/${loggedFamily.id}`,
            label: 'Family'
        },
        {
            href: `/${loggedFamily.id}/trx`,
            label: 'Family Transaction'
        },
        {
            href: `/${loggedFamily.id}/bank-account`,
            label: 'Family Bank'
        },
        {
            href: `/${loggedFamily.id}/shopkeeper`,
            label: 'Family Shopkeeper'
        },
        {
            href: `/${loggedFamily.id}/loan`,
            label: 'Family Loan'
        },
    ] 
    return (
            <div>
                <nav>
                    <ul className="flex flex-wrap items-center gap-4 py-6">
                        {
                            navbarLinks.map((link)=>(
                                <NavLink link={link} key={link.label}/>
                            ))
                        }
                    </ul>
                </nav>
            </div>
    )
}