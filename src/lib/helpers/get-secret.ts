export const getJWTSecret = (secret: string) => new TextEncoder().encode(secret)
