'use client'

import React, { useEffect, useState } from 'react'
import { bangers } from '../../../lib/fonts'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children,
  size = 'md'
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  
  // Handle component mount
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])
  
  // Control modal visibility and animation timing
  useEffect(() => {
    if (isOpen) {
      // First make the modal render in its initial state
      setShouldRender(true)
      setIsAnimating(true)
      
      // Force browser to acknowledge the initial state before animating
      const animationTimer = setTimeout(() => {
        setIsAnimating(false)
      }, 50)
      
      return () => clearTimeout(animationTimer)
    } else {
      // Start closing animation
      setIsAnimating(true)
      
      // Allow animation to complete before removing from DOM
      const removeTimer = setTimeout(() => {
        setShouldRender(false)
      }, 300)
      
      return () => clearTimeout(removeTimer)
    }
  }, [isOpen])
  
  // Don't render anything until mounted or needed
  if (!isMounted || (!shouldRender && !isOpen)) return null
  
  // Size classes
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
    xl: 'max-w-5xl'
  }
  
  return (
    <div 
      id="modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300"
      onClick={(e) => {
        // Close only if the background is clicked directly
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      {/* Semi-transparent backdrop */}
      <div 
        id="modal-backdrop"
        className={`
          fixed inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-300 
          ${!isAnimating ? 'opacity-100' : 'opacity-0'}
        `} 
      />
      
      {/* Modal container */}
      <div 
        id="modal-container"
        className={`
          ${sizeClasses[size]} w-[95%] z-50 
          relative overflow-hidden backdrop-blur-lg rounded-2xl
          bg-gradient-to-br from-zinc-800/40 to-zinc-700/30
          border border-white/10 shadow-md
          transition-all duration-300 ease-out
          transform origin-center 
          ${!isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}
        `}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-2xl" />
        
        {/* Modal header */}
        <div id="modal-header" className="relative z-10 flex justify-between items-center p-4 border-b border-white/10">
          <h2 id="modal-title" className={`${bangers.className} text-3xl text-white`}>{title}</h2>
          <button 
            id="modal-close-button"
            onClick={onClose}
            className="text-white/80 hover:text-white text-3xl font-bold transition-colors"
          >
            &times;
          </button>
        </div>
        
        {/* Modal content */}
        <div id="modal-content" className="relative z-10 p-6">
          {children}
        </div>
      </div>
    </div>
  )
} 