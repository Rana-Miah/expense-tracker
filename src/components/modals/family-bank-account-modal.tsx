'use client'
import { Modal } from '../modal'
import { useAppDispatch } from '@/hooks/redux'
import { onClose } from '@/lib/redux/slice/modal-slice'
import { MODAL_TYPE } from '@/constant'
import { CardWrapper } from '../card-wrapper'
import { useModal } from '@/hooks/redux/use-modal'
import { FamilyBankAccountForm } from '@/features/family/components/bank-account/family-bank-account-form'

export const FamilyBankAccountModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen, type } = useModal()

    const open = isOpen && type === MODAL_TYPE.F_BANK_ACCOUNT
    return (
        <Modal
            open={open}
            onClose={() => dispatch(onClose())}
            title="Family Bank Account Form"
            description='Nothing to say!'
        >
            <CardWrapper
                title='Create Your Family Bank Account'
                description='Provide meaningful name'
            >
                <FamilyBankAccountForm />
            </CardWrapper>
        </Modal>
    )
}
