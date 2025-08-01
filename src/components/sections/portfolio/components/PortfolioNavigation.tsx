import { useState, useEffect } from 'react'
import { PortfolioData } from '../../../../definitions/types/portfolio'

interface PortfolioNavigationProps {
  projects: PortfolioData
  activeProjectIndex: number
  showNavigation: { left: boolean; right: boolean }
  interactionMode: boolean
  transitioning: boolean
  onPrevious: () => void
  onNext: () => void
  onSetActiveProject: (index: number) => void
}

export default function PortfolioNavigation({
  projects,
  activeProjectIndex,
  showNavigation,
  interactionMode,
  transitioning,
  onPrevious,
  onNext,
  onSetActiveProject,
}: PortfolioNavigationProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  return (
    <>
      {/* Left Navigation Arrow - Mobile optimized */}
      <button
        className={`absolute top-1/2 transform -translate-y-1/2 z-50 p-3 md:p-4 transition-all duration-300 touch-manipulation ${
          interactionMode
            ? 'left-2 md:left-4 opacity-100 translate-x-0' // Always visible and positioned outside iframe
            : showNavigation.left || isMobile
              ? 'left-0 md:left-0 opacity-100 translate-x-0'
              : 'left-0 opacity-0 -translate-x-full'
        } ${transitioning ? 'pointer-events-none' : ''}`}
        onClick={onPrevious}
        aria-label="Previous project"
        disabled={transitioning}
      >
        <div 
          className={`backdrop-blur-lg p-3 md:p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            transitioning ? 'opacity-50' : 'hover:from-white/20 hover:to-white/10 active:scale-95'
          }`}
        >
          {transitioning ? (
            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>

      {/* Right Navigation Arrow - Mobile optimized */}
      <button
        className={`absolute top-1/2 transform -translate-y-1/2 z-50 p-3 md:p-4 transition-all duration-300 touch-manipulation ${
          interactionMode
            ? 'right-2 md:right-4 opacity-100 translate-x-0' // Always visible and positioned outside iframe
            : showNavigation.right || isMobile
              ? 'right-0 md:right-0 opacity-100 translate-x-0'
              : 'right-0 opacity-0 translate-x-full'
        } ${transitioning ? 'pointer-events-none' : ''}`}
        onClick={onNext}
        aria-label="Next project"
        disabled={transitioning}
      >
        <div 
          className={`backdrop-blur-lg p-3 md:p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg transition-all duration-300 min-w-[44px] min-h-[44px] flex items-center justify-center ${
            transitioning ? 'opacity-50' : 'hover:from-white/20 hover:to-white/10 active:scale-95'
          }`}
        >
          {transitioning ? (
            <div className="w-5 h-5 md:w-6 md:h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </button>

      {/* Pagination dots - Mobile optimized */}
      <div id="portfolio-pagination" className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 md:gap-2 px-4">
        {projects.map((_, index) => (
          <button
            key={index}
            id={`portfolio-dot-${index}`}
            onClick={() => onSetActiveProject(index)}
            className={`rounded-full transition-all touch-manipulation min-w-[32px] min-h-[32px] md:min-w-[16px] md:min-h-[16px] flex items-center justify-center ${
              index === activeProjectIndex
                ? 'bg-media-mason-purple w-8 h-8 md:w-6 md:h-2'
                : 'bg-white/30 hover:bg-white/50 active:bg-white/60 w-8 h-8 md:w-2 md:h-2'
            } ${transitioning ? 'pointer-events-none opacity-50' : ''}`}
            aria-label={`Go to project ${index + 1}`}
            disabled={transitioning}
          >
            {/* Show numbers on mobile for better accessibility */}
            <span className="md:hidden text-xs font-bold text-white">
              {index + 1}
            </span>
          </button>
        ))}
      </div>
    </>
  )
}