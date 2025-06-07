'use client'
import { Modal } from "./modal";
import { DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";

type AlertModalProps = {
    title: string;
    description: string;
    open: boolean;
    disabled?:boolean
    onCancel: () => void;
    onConfirm: () => void;
    cancelBtnLabel?: string;
    confirmBtnLabel?: string;
}

export const AlertModal = ({
    open,
    title,
    description,
    onCancel,
    onConfirm,
    disabled,
    cancelBtnLabel,
    confirmBtnLabel, }: AlertModalProps
) => {

    return (
        <Modal
            title={title}
            description={description}
            open={open}
            onClose={onCancel}

        >
            <DialogFooter>
                <Button onClick={onCancel} variant={'secondary'} disabled={disabled}>{cancelBtnLabel || 'Cancel'}</Button>
                <Button onClick={onConfirm} variant={'destructive'} disabled={disabled}>{confirmBtnLabel || "Continue"}</Button>
            </DialogFooter>
        </Modal>
    )
}