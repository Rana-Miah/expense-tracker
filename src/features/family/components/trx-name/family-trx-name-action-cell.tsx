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
import { FamilyTrxNameColumn } from './family-trx-name-table-columns'
import { useAppDispatch } from '@/hooks/redux'
import { familyTrxNameDeleteAction } from '../../action/trx-name/family-trx-name-delete-action'
import toast from 'react-hot-toast'
import { useState, useTransition } from 'react'
import { AlertModal } from '@/components'
import { useAlertModal } from '@/hooks/redux/use-modal'
import { onAlertClose, onAlertOpen } from '@/lib/redux/slice/alert-modal-slice'
import { familyTrxNameUpdateAction } from '../../action/trx-name/family-trx-name-update-action'
import DDMenuItem from '@/components/drop-down-menu-item'
import Link from 'next/link'
import {  familyTab } from '@/constant/tab'

type DeleteActionInfo = Pick<FamilyTrxNameColumn, 'name' | 'familyId' | 'id'>

export const FamilyTrxNameActionCell = ({ trxName }: { trxName: FamilyTrxNameColumn }) => {
    const { familyId, id, name } = trxName
    const {familyTrxName}=familyTab
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
                const { data, success, message } = await familyTrxNameDeleteAction((payload as DeleteActionInfo)?.id)

                if (!success) {
                    toast.error(message)
                    return
                }
                dispatch(onAlertClose())
                toast.success(message)
            }
        )
    }

    const onRestore = async () => {
        const { data, success, message } = await familyTrxNameUpdateAction(trxName?.id, { isDeleted: false })

        if (!success) {
            toast.error(message)
            return
        }
        toast.success(message)
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
                        !trxName.isDeleted && (
                            <>
                                <Link href={`/${trxName.familyId}/trx/trx-name/${trxName.id}${familyTrxName.queryString.detailsTab}`}>
                                    <DDMenuItem
                                        label='Details'
                                        Icon={<Info />}
                                    />
                                </Link>
                                <Link href={`/${trxName.familyId}/trx/trx-name/${trxName.id}${familyTrxName.queryString.updateTab}`}>
                                    <DDMenuItem
                                        label='Update'
                                        Icon={<SquarePen />}
                                    />
                                </Link>
                                <Link href={`/${trxName.familyId}/trx/trx-name/${trxName.id}${familyTrxName.queryString.assignTab}`}>
                                    <DDMenuItem
                                        label='Assign'
                                        Icon={<Cable />}
                                    />
                                </Link>
                            </>
                        )
                    }
                    <DropdownMenuSeparator />
                    {

                        trxName.isDeleted
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