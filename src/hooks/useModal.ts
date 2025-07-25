'use client'

import { useState, useCallback, useEffect } from 'react'

type ModalType = 'contact' | 'custom' | null
type ModalMetadata = Record<string, any> | null

interface OpenModalOptions {
  type: ModalType
  metadata?: ModalMetadata
}

interface CloseModalOptions {
  timeout?: number
}

const OPEN_MODAL_EVENT = 'openModal'
const CLOSE_MODAL_EVENT = 'closeModal'

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [modalType, setModalType] = useState<ModalType>(null)
  const [metadata, setMetadata] = useState<ModalMetadata>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  const lockScroll = useCallback(() => {
    // Store current scroll position
    const scrollPos = window.scrollY
    setScrollPosition(scrollPos)
    
    // Apply styles to body that lock scroll but preserve position
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollPos}px`
    document.body.style.width = '100%'
  }, [])

  const unlockScroll = useCallback(() => {
    // Remove styles from body
    document.body.style.position = ''
    document.body.style.top = ''
    document.body.style.width = ''
    
    // Restore scroll position
    window.scrollTo(0, scrollPosition)
  }, [scrollPosition])

  const openModal = useCallback((options: OpenModalOptions) => {
    window.dispatchEvent(new CustomEvent(OPEN_MODAL_EVENT, { 
      detail: { options } 
    }))
  }, [])

  const closeModal = useCallback((options?: CloseModalOptions) => {
    window.dispatchEvent(new CustomEvent(CLOSE_MODAL_EVENT, { 
      detail: { options } 
    }))
  }, [])

  const handleOpenModal = useCallback((event: Event) => {
    const customEvent = event as CustomEvent
    const { options } = customEvent.detail
    
    setModalType(options.type)
    setMetadata(options.metadata || null)
    setIsOpen(true)
    lockScroll()
  }, [lockScroll])

  const handleCloseModal = useCallback((event: Event) => {
    const customEvent = event as CustomEvent
    const options = customEvent.detail?.options

    const closeAction = () => {
      setIsOpen(false)
      setModalType(null)
      setMetadata(null)
      unlockScroll()
    }

    if (options?.timeout) {
      setTimeout(closeAction, options.timeout)
    } else {
      closeAction()
    }
  }, [unlockScroll])

  useEffect(() => {
    window.addEventListener(OPEN_MODAL_EVENT, handleOpenModal)
    window.addEventListener(CLOSE_MODAL_EVENT, handleCloseModal)

    return () => {
      window.removeEventListener(OPEN_MODAL_EVENT, handleOpenModal)
      window.removeEventListener(CLOSE_MODAL_EVENT, handleCloseModal)
    }
  }, [handleOpenModal, handleCloseModal])

  return {
    isOpen,
    modalType,
    metadata,
    openModal,
    closeModal
  }
} 