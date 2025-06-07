'use client'
import { currentFamily } from '@/lib/current-family';
import { currentMember } from '@/lib/current-member';
import { JWTPayload } from 'jose';
import { createContext, ReactNode, useEffect, useState } from 'react'

type AuthProviderProps = {
    children: ReactNode;
    session: Session
}

export type Session = {
    family: JWTPayload | undefined;
    member: JWTPayload | undefined;
}

export const AuthContext = createContext<Session | null>(null)

export const AuthProvider = ({ children,session }: AuthProviderProps) => {
    
    return (


        <AuthContext.Provider value={session}>
            {children}
        </AuthContext.Provider>
    )
}
