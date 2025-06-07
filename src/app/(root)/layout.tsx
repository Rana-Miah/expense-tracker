import { ReactNode } from "react"
import { Navbar } from "@/components/navbar";

const SetupLayout = ({ children }: { children: ReactNode }) => {
    return <main className="flex flex-col gap-3">
        <Navbar />
        <section className="h-screen">
            {children}
        </section>
    </main>
}

export default SetupLayout