'use client'
import { Modal } from '../modal'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { onClose } from '@/lib/redux/slice/modal-slice'
import { MODAL_TYPE } from '@/constant'
import { CardWrapper } from '../card-wrapper'
import { MemberRegisterForm } from '@/features/family-member/components/member-register-form'

export const MemberRegisterModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen, type } = useAppSelector(state => state.modal)

    const open = isOpen && type === MODAL_TYPE.MEMBER_REGISTER
    return (
        <Modal
            open={open}
            onClose={() => dispatch(onClose())}
            title="Member Register Form"
            description='Connect your family members with expense tracker.'
        >
            <CardWrapper
                title='Create Your Family Member'
                description='Please fill your family member information'
            >
                <MemberRegisterForm />
                {/* <MemberLoginForm /> */}
                
            </CardWrapper>
        </Modal>
    )
}
