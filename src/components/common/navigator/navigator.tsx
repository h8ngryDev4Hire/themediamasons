'use client'

import React, { useState, useEffect } from 'react'
import { bangers, oswald } from '../../../lib/fonts'
import MobileMenu from './MobileMenu'
import MobileMenuButton from './MobileMenuButton'
import NavLink from './NavLink'

interface NavigatorProps {
  floating?: boolean
}

export default function Navigator({ floating = true }: NavigatorProps) {
  // Suppress unused parameter warning
  void floating
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero-section')
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Don't update navigation state when mobile menu is open
      if (isMobileMenuOpen) {
        return
      }
      
      const scrollY = window.scrollY
      setIsAtTop(scrollY < 50)
      
      // Set hasScrolled to true once the user has scrolled
      if (scrollY >= 50 && !hasScrolled) {
        setHasScrolled(true)
      }
      
      // Simple section detection
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + window.innerHeight / 3
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(section.id)
        }
      })
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initialize on mount
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled, isMobileMenuOpen])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])
  
  // Handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    
    // Close mobile menu first if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
    
    // Temporarily restore body scroll for navigation
    document.body.style.overflow = 'unset'
    
    // Navigate to section after a brief delay to allow menu to close
    setTimeout(() => {
      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' })
      }
    }, 100)
  }

  // Handle scroll to top
  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav 
      id="main-navigation" 
      className={`
        fixed top-0 left-0 w-full z-layout
        py-4 px-6 md:px-10
        transition-all duration-300
        ${isAtTop ? 'bg-transparent' : 'backdrop-blur-lg bg-black/30 border-b border-white/10 shadow-lg'}
      `}
    >
      <div id="nav-container" className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left Navigation Links */}
        <div id="left-nav-links" className={`${oswald.className} hidden md:flex items-center gap-8`}>
          <NavLink 
            href="#products" 
            isActive={activeSection === 'products'} 
            onClick={(e) => handleNavClick(e, 'products')}
          >
            Products
          </NavLink>
          <NavLink 
            href="#services" 
            isActive={activeSection === 'services'} 
            onClick={(e) => handleNavClick(e, 'services')}
          >
            Services
          </NavLink>
        </div>

        {/* Logo container - always present to maintain layout */}
        <div className="flex-1 flex justify-center">
          {/* When at top, we don't show anything in the center */}
          {isAtTop ? (
            <div className="opacity-0">
              <span className="invisible">THE MEDIA MASONS</span>
            </div>
          ) : (
            /* When scrolled, we show the animated logo */
            <div 
              id="site-logo-scrolled" 
              className={`
                ${bangers.className} text-xl md:text-2xl 
                transform transition-all duration-500 ease-out
                scale-100 opacity-100 cursor-pointer
              `}
              style={{ animation: 'scaleIn 0.5s ease-out' }}
              onClick={handleScrollToTop}
            >
              <span className="bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green bg-clip-text">
                THE MEDIA MASONS
              </span>
              <style jsx global>{`
                @keyframes scaleIn {
                  from { transform: scale(0); opacity: 0; }
                  to { transform: scale(1); opacity: 1; }
                }
              `}</style>
            </div>
          )}
        </div>

        {/* Right Navigation Links */}
        <div id="right-nav-links" className={`${oswald.className} hidden md:flex items-center gap-8`}>
          <NavLink 
            href="#about" 
            isActive={activeSection === 'about'} 
            onClick={(e) => handleNavClick(e, 'about')}
          >
            About
          </NavLink>
          <NavLink 
            href="#portfolio" 
            isActive={activeSection === 'portfolio'} 
            onClick={(e) => handleNavClick(e, 'portfolio')}
          >
            Portfolio
          </NavLink>
        </div>

        <MobileMenuButton 
          isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        />
        
        <MobileMenu 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          activeSection={activeSection}
          onNavClick={handleNavClick}
          onScrollToTop={handleScrollToTop}
        />
      </div>
    </nav>
  )
} 