'use client'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Cable, Info, MoreHorizontal, RotateCcw, SquarePen, Trash } from 'lucide-react'
import { FamilyBankAccountColumn } from './family-bank-account-table-columns'
import { useAppDispatch } from '@/hooks/redux'
import toast from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { AlertModal } from '@/components'
import { useAlertModal } from '@/hooks/redux/use-modal'
import { onAlertClose, onAlertOpen } from '@/lib/redux/slice/alert-modal-slice'
import DDMenuItem from '@/components/drop-down-menu-item'
import Link from 'next/link'
import {  familyTab } from '@/constant/tab'

type DeleteActionInfo = Pick<FamilyBankAccountColumn, 'name' | 'familyId' | 'id'>

export const FamilyBankAccountActionCell = ({ familyBankAccount }: { familyBankAccount: FamilyBankAccountColumn }) => {
    const { familyId, id, name } = familyBankAccount
    const {familyBank}=familyTab
    const [isOpenDropdownMenu, setIsOpenDropDownMenu] = useState(false)
    const [pending, startTransition] = useTransition()
    const { isAlertOpen, payload } = useAlertModal()

    const dispatch = useAppDispatch()

    const handleDeleteClick = () => {
        setIsOpenDropDownMenu(false)
        dispatch(onAlertOpen({ familyId, id, name }))
    }

    const onDelete = () => {
        startTransition(
            async () => {
                // const { data, success, message } = await familyBankAccountDeleteAction((payload as DeleteActionInfo)?.id)

                // if (!success) {
                //     toast.error(message)
                //     return
                // }
                // dispatch(onAlertClose())
                // toast.success(message)
                console.log('hello bank account onDelete')
            }
        )
    }

    const onRestore = async () => {
        // const { data, success, message } = await familyBankAccountUpdateAction(familyBankAccount?.id, { isDeleted: false })

        // if (!success) {
        //     toast.error(message)
        //     return
        // }
        // toast.success(message)
    }

    return (
        <>
            <AlertModal
                open={isAlertOpen}
                title={`Are you sure you want to delete ${(payload as DeleteActionInfo)?.name}?`}
                description='This action can not be reverse!'
                onCancel={() => dispatch(onAlertClose())}
                disabled={pending}
                onConfirm={onDelete}
                confirmBtnLabel='Delete'
            />
            <DropdownMenu open={isOpenDropdownMenu} onOpenChange={setIsOpenDropDownMenu} >
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    {
                        !familyBankAccount.isDeleted && (
                            <>
                                <Link href={`/${familyBankAccount.familyId}/trx/trx-name/${familyBankAccount.id}${familyBank.queryString.detailsTab}`}>
                                    <DDMenuItem
                                        label='Details'
                                        Icon={<Info />}
                                    />
                                </Link>
                                <Link href={`/${familyBankAccount.familyId}/trx/trx-name/${familyBankAccount.id}${familyBank.queryString.updateTab}`}>
                                    <DDMenuItem
                                        label='Update'
                                        Icon={<SquarePen />}
                                    />
                                </Link>
                            </>
                        )
                    }
                    <DropdownMenuSeparator />
                    {

                        familyBankAccount.isDeleted
                            ? <DDMenuItem
                                label='Restore'
                                Icon={<RotateCcw />}
                                variant='success'
                                onClick={onRestore}
                                className='flex items-center justify-between'
                            />
                            : <DDMenuItem
                                label='Delete'
                                variant='destructive'
                                onClick={handleDeleteClick}
                                Icon={<Trash />}
                                className='flex items-center justify-between'
                            />
                    }
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}