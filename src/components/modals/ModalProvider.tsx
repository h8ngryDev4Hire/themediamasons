'use client'

import React from 'react'
import useModal from '../../hooks/useModal'
import ContactModal from './ContactModal'

export default function ModalProvider() {
  const { isOpen, modalType, closeModal } = useModal()
  
  return (
    <>
      <ContactModal 
        isOpen={isOpen && modalType === 'contact'} 
        onClose={() => closeModal()}
      />
      
      {/* Add other modal types here as needed */}
    </>
  )
} 