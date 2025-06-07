import { configureStore } from '@reduxjs/toolkit'
import modalReduce from './slice/modal-slice'
import alertModalReduce from './slice/alert-modal-slice'

export const createStore = () => configureStore({
    reducer: {
        modal: modalReduce,
        alertModal:alertModalReduce
    }
})