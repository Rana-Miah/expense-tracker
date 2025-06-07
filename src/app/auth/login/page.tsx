'use server'

import { FamilyLoginForm } from "@/features/auth/components/family-login-form"

const LoginPage = async () => {
    return (
        <div>
            <FamilyLoginForm />
        </div>
    )
}

export default LoginPage

