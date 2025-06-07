import { ReactNode } from "react"

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return <div className="flex items-center justify-center mx-auto h-screen">{children}</div>
}

export default AuthLayout