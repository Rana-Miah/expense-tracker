import { useEffect, useState } from "react"

export const useCoolDown = () => {
  const [coolDown, setCoolDown] = useState(0)

  // Timer
  useEffect(() => {
    if (coolDown === 0) return
    const interval = setInterval(
      () => {
      setCoolDown(
        prev => {
        if (prev <= 1) {
          clearInterval(interval)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [coolDown])

  return { coolDown, setCoolDown }
}