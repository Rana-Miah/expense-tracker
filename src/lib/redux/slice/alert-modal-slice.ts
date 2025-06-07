import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AlertModalInitialState<T = unknown> = {
    payload:T | null;
    isAlertOpen: boolean
}

const initialState: AlertModalInitialState = {
    payload: null,
    isAlertOpen: false
}



export const alertModalSlice = createSlice({
    name: 'alert-modal-slice',
    initialState,
    reducers: {
        onAlertOpen: (state, action: PayloadAction<AlertModalInitialState['payload']>) => {
            state.payload = action.payload
            state.isAlertOpen = true
        },
        onAlertClose: (state) => {
            state.payload = null
            state.isAlertOpen = false
        },
    }
})
const alertModalReduce = alertModalSlice.reducer

export const {onAlertClose,onAlertOpen} = alertModalSlice.actions
export default alertModalReduce
