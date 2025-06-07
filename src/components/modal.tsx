import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { ReactNode } from "react"


type ModalProp = {
    open: boolean;
    onClose: () => void
    title: string;
    description: string;
    children: ReactNode;
}
export const Modal = ({ title, description, open, onClose, children }: ModalProp) => {

    return <Dialog
        open={open}
        onOpenChange={onClose}
    >
        <DialogContent className="p-2">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            {children}
        </DialogContent>
    </Dialog>
}