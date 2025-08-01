import { useRef, useCallback } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

interface TouchData {
  startX: number
  startY: number
  startTime: number
}

export function useSwipeGesture(handlers: SwipeHandlers) {
  const touchData = useRef<TouchData | null>(null)
  const minSwipeDistance = 50
  const maxSwipeTime = 300

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchData.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: Date.now(),
    }
  }, [])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchData.current) return

    const touch = e.changedTouches[0]
    const { startX, startY, startTime } = touchData.current
    
    const deltaX = touch.clientX - startX
    const deltaY = touch.clientY - startY
    const deltaTime = Date.now() - startTime

    // Reset touch data
    touchData.current = null

    // Check if swipe was fast enough and far enough
    if (deltaTime > maxSwipeTime) return

    const absDeltaX = Math.abs(deltaX)
    const absDeltaY = Math.abs(deltaY)

    // Determine if this is a horizontal or vertical swipe
    if (absDeltaX > absDeltaY && absDeltaX > minSwipeDistance) {
      // Horizontal swipe
      if (deltaX > 0) {
        handlers.onSwipeRight?.()
      } else {
        handlers.onSwipeLeft?.()
      }
    } else if (absDeltaY > absDeltaX && absDeltaY > minSwipeDistance) {
      // Vertical swipe
      if (deltaY > 0) {
        handlers.onSwipeDown?.()
      } else {
        handlers.onSwipeUp?.()
      }
    }
  }, [handlers, minSwipeDistance, maxSwipeTime])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    // Prevent default to avoid scrolling during swipe
    if (touchData.current) {
      const touch = e.touches[0]
      const { startX, startY } = touchData.current
      const deltaX = Math.abs(touch.clientX - startX)
      const deltaY = Math.abs(touch.clientY - startY)
      
      // Only prevent default if horizontal swipe is more likely
      if (deltaX > deltaY) {
        e.preventDefault()
      }
    }
  }, [])

  return {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchMove: handleTouchMove,
  }
}