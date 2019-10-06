import { useEffect, useRef } from 'react'
import throttle from '@utils/functions/throttle'

/**
 * Executes a callback on viewport change (window resize).
 * Callback calls are throttled by default.
 */
const useViewportChange = (
  callback: () => void,
  throttleInterval: number = 70,
) => {
  const handleWindowResize = useRef<(...args: any[]) => any>()

  function handleResizeEvent() {
    handleWindowResize.current()
  }

  useEffect(() => {
    handleWindowResize.current = throttle(callback, throttleInterval)
  })

  useEffect(() => {
    handleResizeEvent()
    window.addEventListener('resize', handleResizeEvent)
    return () => {
      window.removeEventListener('resize', handleResizeEvent)
    }
  }, [])
}

export default useViewportChange
