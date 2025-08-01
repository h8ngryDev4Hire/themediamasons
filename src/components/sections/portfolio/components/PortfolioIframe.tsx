import { useState, useEffect } from 'react'
import { PortfolioItem } from '../../../../definitions/types/portfolio'

interface PortfolioIframeProps {
  project: PortfolioItem
  interactionMode: boolean
  showInteractionButton: boolean
  onIframeLoad: () => void
  onInteractionClick: () => void
  onShowInteractionButton: (show: boolean) => void
  onTestimonialVisibility: (visible: boolean) => void
}

export default function PortfolioIframe({
  project,
  interactionMode,
  showInteractionButton,
  onIframeLoad,
  onInteractionClick,
  onShowInteractionButton,
  onTestimonialVisibility,
}: PortfolioIframeProps) {
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
      {/* Liquid glass effect at the top */}
      <div className="absolute top-0 left-0 right-0 h-1/5 z-10 bg-gradient-to-b from-white/15 to-transparent pointer-events-none" />

      {/* Website iframe */}
      <div id="portfolio-iframe-container" className="absolute inset-0 w-full h-full z-0">
        {/* Iframe element */}
        <iframe
          id="portfolio-project-iframe"
          src={project.url}
          title={project.title}
          className="w-full h-full transform scale-95 origin-top pt-20"
          sandbox="allow-same-origin allow-scripts"
          loading="lazy"
          onLoad={onIframeLoad}
        />

        {/* Interactive overlay - only shown when not in interaction mode */}
        {!interactionMode && (
          <>
            {/* Transparent overlay to capture hover events on iframe */}
            <div
              id="portfolio-iframe-overlay"
              className="absolute inset-0 z-20 pointer-events-auto"
              onMouseEnter={() => onTestimonialVisibility(true)}
              onMouseLeave={() => onTestimonialVisibility(false)}
              aria-hidden="true"
            />

            {/* Click to interact overlay - transparent background */}
            <div
              id="portfolio-interaction-overlay"
              className="absolute inset-0 z-30 flex items-center justify-center"
            >
              {/* Mobile: Always show button, Desktop: Show on hover */}
              <div
                className="relative flex items-center justify-center"
                onMouseEnter={() => onShowInteractionButton(true)}
                onMouseLeave={() => onShowInteractionButton(false)}
                style={{ 
                  width: isMobile ? '280px' : '400px', 
                  height: isMobile ? '120px' : '200px' 
                }}
              >
                {/* Click to interact button */}
                <div
                  className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center touch-manipulation ${
                    showInteractionButton || isMobile
                      ? 'opacity-100 scale-100 hover:bg-white/15 hover:scale-105 active:scale-95'
                      : 'opacity-0 scale-75 pointer-events-none'
                  }`}
                  onClick={onInteractionClick}
                >
                  <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 text-white flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                      />
                    </svg>
                    <span className="text-white font-medium text-sm md:text-base whitespace-nowrap">
                      {isMobile ? 'Tap to Interact' : 'Click to Interact'}
                    </span>
                  </div>
                  <p className="text-white/70 text-xs text-center whitespace-nowrap">
                    Explore the live website
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}