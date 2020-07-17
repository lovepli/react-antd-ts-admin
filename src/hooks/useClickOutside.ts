import { RefObject, useEffect, useCallback } from 'react'

type EventType = MouseEvent | TouchEvent

const useClickOutside = (
  target: RefObject<HTMLElement | null>,
  onClickOutside: (event: EventType) => void,
  eventName: string = 'click'
) => {
  const handler = useCallback(
    (event) => {
      const el = target.current
      if (!el || el.contains(event.target)) {
        return
      }
      onClickOutside(event)
    },
    [onClickOutside, target]
  )

  useEffect(() => {
    document.addEventListener(eventName, handler)
    return () => {
      document.removeEventListener(eventName, handler)
    }
  })
}

export default useClickOutside
