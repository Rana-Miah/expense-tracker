import { Container } from '@/components/container'
import { FamilyNavbar } from '@/features/family/components/family-navbar'
import React, { ReactNode } from 'react'

const FamilyLayout = ({ children }: { children: ReactNode }) => {
    return (
        <Container>
            <FamilyNavbar />
            {children}
        </Container>
    )
}

export default FamilyLayout