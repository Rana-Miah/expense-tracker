import { AppDispatch, AppStore, RootState } from '@/interface/redux'
import {useDispatch,useSelector} from 'react-redux'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useSelector.withTypes<AppStore>()