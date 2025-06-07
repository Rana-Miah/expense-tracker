import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "@/interface/modal-slice";

export type ModalInitialState = {
    type: ModalType | null;
    isOpen: boolean
}

const initialState: ModalInitialState = {
    type: null,
    isOpen: false
}

export const modalSlice = createSlice({
    name: 'modal-slice',
    initialState,
    reducers: {
        onOpen: (state, action: PayloadAction<ModalType>) => {
            state.type = action.payload
            state.isOpen = true
        },
        onClose: (state) => {
            state.type = null
            state.isOpen = false
        },
    }
})
const modalReduce = modalSlice.reducer

export const {onClose,onOpen} = modalSlice.actions
export default modalReduce
