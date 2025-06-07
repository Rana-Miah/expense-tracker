'use client'

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const NavLink = ({link:{href,label}}:{link:{href:string,label:string}}) => {
    const pathname = usePathname()
    return <Link href={href} key={label}>
        <li className={cn("border border-gray-300 rounded-sm px-2 py-1",
        href===pathname&&'bg-gray-500 text-white'
        )} >{label}</li>
    </Link>
}