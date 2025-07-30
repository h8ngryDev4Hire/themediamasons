'use client'

import React from 'react'
import { createPortal } from 'react-dom'
import { bangers, oswald, raleway } from '../../../lib/fonts'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => void
  onScrollToTop: (e: React.MouseEvent) => void
}

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  onNavClick,
  onScrollToTop
}: MobileMenuProps) {
  if (!isOpen) return null

  const menuContent = (
    <div
      id="mobile-menu-overlay-clickable-zone"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        display: window.innerWidth < 768 ? 'block' : 'none'
      }}
      onClick={onClose}
    >
      {/* Menu Content */}
      <div
        id="mobile-menu-content-zone"
        className="h-full flex flex-col items-center justify-center"
      >
        {/* Logo in mobile menu */}
        <div
          id="mobile-menu-logo-clickable"
          className={`
            ${bangers.className} text-2xl mb-12 cursor-pointer
            bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green 
            bg-clip-text text-transparent
            transform transition-all duration-300 hover:scale-105
          `}
          onClick={onScrollToTop}
        >
          THE MEDIA MASONS
        </div>

        {/* Navigation Links - Ordered by actual website flow */}
        <div id="mobile-menu-nav-links-container" className="flex flex-col items-center gap-6">
          <MobileNavLink
            href="#about"
            isActive={activeSection === 'about'}
            onClick={(e) => onNavClick(e, 'about')}
            delay="0ms"
          >
            About
          </MobileNavLink>
          <MobileNavLink
            href="#services"
            isActive={activeSection === 'services'}
            onClick={(e) => onNavClick(e, 'services')}
            delay="100ms"
          >
            Services
          </MobileNavLink>
          <MobileNavLink
            href="#portfolio"
            isActive={activeSection === 'portfolio'}
            onClick={(e) => onNavClick(e, 'portfolio')}
            delay="200ms"
          >
            Portfolio
          </MobileNavLink>
          <MobileNavLink
            href="#products"
            isActive={activeSection === 'products'}
            onClick={(e) => onNavClick(e, 'products')}
            delay="300ms"
          >
            Products
          </MobileNavLink>
        </div>

        {/* Close hint */}
        <div id="mobile-menu-close-hint" className={`${raleway.className} text-white/60 text-sm mt-12 animate-pulse`}>
          Tap anywhere to close
        </div>
      </div>
    </div>
  )

  // Render to document.body using portal to bypass any parent positioning
  return typeof window !== 'undefined' ? createPortal(menuContent, document.body) : null
}

function MobileNavLink({
  href,
  isActive,
  onClick,
  children,
  delay = "0ms"
}: {
  href: string,
  isActive?: boolean,
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
  children: React.ReactNode,
  delay?: string
}) {
  return (
    <div
      id={`mobile-nav-link-${href.replace('#', '')}-container`}
      className="relative group animate-mobile-nav-item-fade-in"
      style={{ animationDelay: delay }}
    >
      {/* Glass morphism background */}
      <div
        id={`mobile-nav-link-${href.replace('#', '')}-background`}
        className={`
          absolute inset-0 rounded-2xl transition-all duration-300 ease-in-out
          ${isActive
            ? 'bg-gradient-to-r from-media-mason-purple/30 to-media-mason-orange/30 backdrop-blur-md border border-white/30 shadow-lg shadow-media-mason-purple/20'
            : 'bg-white/5 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 group-hover:bg-white/10 group-hover:shadow-md group-hover:shadow-white/10'
          }
        `}
      />

      {/* Link content */}
      <a
        id={`mobile-nav-link-${href.replace('#', '')}-clickable`}
        href={href}
        onClick={onClick}
        className={`
          ${oswald.className} relative z-10 block px-8 py-4 text-xl font-medium
          transition-all duration-300 ease-in-out cursor-pointer
          ${isActive
            ? 'text-white font-bold'
            : 'text-white/90 hover:text-white group-hover:scale-105'
          }
        `}
      >
        {children}

        {/* Active indicator */}
        {isActive && (
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-media-mason-purple to-media-mason-orange rounded-full animate-pulse" />
        )}

        {/* Hover glow effect */}
        <div
          className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300
            bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green
            blur-sm
          `}
        />
      </a>
    </div>
  )
}