'use client'

import React, { useState, useEffect } from 'react'
import { bangers, oswald, raleway } from '../../../lib/fonts'

interface NavigatorProps {
  floating?: boolean
}

export default function Navigator({ floating = true }: NavigatorProps) {
  const [isAtTop, setIsAtTop] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero-section')
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
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
  }, [hasScrolled])
  
  // Handle navigation
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault()
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
    
    // Close mobile menu if open
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
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

        {/* Mobile Menu Button */}
        <button 
          id="mobile-menu-button" 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          )}
        </button>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed md:hidden inset-0 top-16 z-layout bg-black/95 backdrop-blur-lg">
            <div className="flex flex-col items-center justify-center h-full gap-8">
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
          </div>
        )}
      </div>
    </nav>
  )
}

function NavLink({ 
  href, 
  isActive, 
  onClick,
  children 
}: { 
  href: string, 
  isActive?: boolean, 
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void,
  children: React.ReactNode 
}) {  
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`${raleway.className} transition duration-300 ease-in-out cursor-pointer
        ${isActive 
          ? 'text-media-mason-purple font-semibold' 
          : 'text-white hover:text-media-mason-purple'}`
      }
    >
      {children}
    </a>
  )
} 