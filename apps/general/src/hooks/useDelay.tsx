import { useEffect, useRef } from 'react'

type TDelayFunc = (ms: number) => Promise<void>

interface ITimers {
  [key: string]: NodeJS.Timeout
}

export const useDelay = (): [TDelayFunc, ITimers] => {
  const timers = useRef<ITimers>({})

  const delay: TDelayFunc = (ms) => {
    return new Promise<void>((resolve) => {
      const id = `${Date.now()}`
      timers.current[id] = setTimeout(() => {
        resolve()
        delete timers.current[id]
      }, ms)
    })
  }

  useEffect(() => {
    return (): void => {
      Object.values(timers.current).forEach((timer) => {
        clearTimeout(timer)
      })
    }
  }, [])

  return [delay, timers.current]
}
