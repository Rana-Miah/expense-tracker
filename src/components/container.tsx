import { ReactNode } from "react"

export const Container = ({ children }: { children: ReactNode }) => {
    return (
        <section className="w-full h-full max-w-[1280px] md:mx-auto py-6 px-5">
            {children}
            </section>
    )
}
