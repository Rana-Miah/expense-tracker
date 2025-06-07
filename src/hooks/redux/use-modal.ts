import { useAppSelector } from ".";

export const useModal = ()=>useAppSelector(state=>state.modal)
export const useAlertModal = ()=>useAppSelector(state=>state.alertModal)