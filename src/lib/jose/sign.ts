import { JWTPayload, SignJWT, jwtVerify } from 'jose';
import { getJWTSecret } from '../helpers';
import { JWTExpired } from 'jose/errors';

// Sign a payload:

type Param = {
    secret: string;
    expireIn?: number | string | Date
}

export async function signJwt<T extends JWTPayload>(payload: T, options: Param) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(options.expireIn ?? '25s')
        .sign(getJWTSecret(options.secret!));
}

// Verify a JWT:
export async function verifyToken(token: string) {
    try {
        const { payload } = await jwtVerify(token,getJWTSecret(process.env.AUTH_SECRET!));
        return payload;
    } catch (error) {
        if(error instanceof JWTExpired){
            
        }
    }
}
