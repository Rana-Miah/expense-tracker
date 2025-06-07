import 'jose'

declare module 'jose' {
    interface JWTPayload {
            id: string;
            name: string
            email: string;
            phone: string;
            role: 'FAMILY' | 'MEMBER'
    }
}