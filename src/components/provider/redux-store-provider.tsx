'use client'

import { AppStore } from '@/interface/redux'
import { createStore } from '@/lib/redux/store'
import { useRef } from 'react'
import { Provider } from 'react-redux'

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore>(undefined)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = createStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}