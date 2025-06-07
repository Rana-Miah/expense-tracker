'use client'
import { Modal } from '../modal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { onClose } from '@/lib/redux/slice/modal-slice'
import { MODAL_TYPE } from '@/constant'
import { CardWrapper } from '../card-wrapper'
import { MemberLoginForm } from '@/features/family-member/components/member-login-form'

export const MemberLoginModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen, type } = useAppSelector(state => state.modal)

    const open = isOpen && type === MODAL_TYPE.MEMBER_LOGIN
    return (
        <Modal
            open={open}
            onClose={() => dispatch(onClose())}
            title="Member Login Form"
            description='Login to your expense account to manage your expense'
        >

            <CardWrapper
                title='Welcome Back'
                description='Please fill your credentials to proceed'
            >
                <MemberLoginForm />
            </CardWrapper>
        </Modal>
    )
}
