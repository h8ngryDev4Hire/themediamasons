'use client'

import React from 'react'

interface MobileMenuButtonProps {
  isOpen: boolean
  onClick: () => void
}

export default function MobileMenuButton({ isOpen, onClick }: MobileMenuButtonProps) {
  return (
    <button 
      id="mobile-menu-button" 
      className={`
        md:hidden relative p-2 rounded-lg transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'bg-gradient-to-br from-media-mason-purple/20 to-media-mason-orange/20 backdrop-blur-md border border-white/20' 
          : 'hover:bg-white/10'
        }
      `}
      onClick={onClick}
    >
      <div className="relative w-6 h-6">
        {/* Animated hamburger/close icon */}
        <span 
          className={`
            absolute left-0 top-1 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? 'rotate-45 translate-y-2 bg-gradient-to-r from-media-mason-purple to-media-mason-orange' : ''}
          `}
        />
        <span 
          className={`
            absolute left-0 top-3 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? 'opacity-0' : ''}
          `}
        />
        <span 
          className={`
            absolute left-0 top-5 w-6 h-0.5 bg-white transition-all duration-300 ease-in-out
            ${isOpen ? '-rotate-45 -translate-y-2 bg-gradient-to-r from-media-mason-orange to-media-mason-green' : ''}
          `}
        />
      </div>
    </button>
  )
}