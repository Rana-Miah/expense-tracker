'use client'
import { Modal } from '../modal'
import { useAppDispatch } from '@/hooks/redux'
import { onClose } from '@/lib/redux/slice/modal-slice'
import { MODAL_TYPE } from '@/constant'
import { CardWrapper } from '../card-wrapper'
import { useModal } from '@/hooks/redux/use-modal'
import { FamilyTrxNameForm } from '@/features/family/components/trx-name/family-trx-name-form'

export const FamilyTrxNameModal = () => {
    const dispatch = useAppDispatch()
    const { isOpen, type } = useModal()

    const open = isOpen && type === MODAL_TYPE.F_TRX_NAME
    return (
        <Modal
            open={open}
            onClose={() => dispatch(onClose())}
            title="Family Transaction Name Form"
            description='Nothing to say!'
        >
            <CardWrapper
                title='Create Your Family Trx Name'
                description='Provide meaningful name'
            >

                <FamilyTrxNameForm />
                <></>
            </CardWrapper>
        </Modal>
    )
}
