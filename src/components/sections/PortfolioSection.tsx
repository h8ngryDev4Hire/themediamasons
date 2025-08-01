'use client'

import portfolioData from '../../data/portfolio.json'
import { PortfolioData } from '../../definitions/types/portfolio'
import PortfolioLoader from '../common/loading/PortfolioLoader'
import PortfolioSkeleton from '../common/loading/PortfolioSkeleton'
import PortfolioTransitionLayers from './portfolio/components/PortfolioTransitionLayers'
import PortfolioContent from './portfolio/components/PortfolioContent'
import PortfolioNavigation from './portfolio/components/PortfolioNavigation'
import { usePortfolioState } from './portfolio/hooks/usePortfolioState'
import { usePortfolioEffects } from './portfolio/hooks/usePortfolioEffects'
import { usePortfolioHandlers } from './portfolio/hooks/usePortfolioHandlers'

export default function WorkSection() {
  // Use portfolio data from JSON file with type checking
  const projects = portfolioData as PortfolioData

  // Initialize state and hooks
  const state = usePortfolioState()
  usePortfolioEffects({ state, projects })
  const handlers = usePortfolioHandlers({ state, projects })

  // Destructure state for easier access
  const {
    activeProjectIndex,
    showNavigation,
    showTestimonial,
    isVisible,
    iframeLoaded,
    transitioning,
    displayedProject,
    interactionMode,
    showInteractionButton,
    dataLoaded,
    sectionRef,
    setIsHovered,
    setShowNavigation,
    setActiveProjectIndex,
    setShowInteractionButton,
  } = state

  const currentProject = projects[displayedProject]

  // Should the black overlay be visible
  const showOverlay = !isVisible || !iframeLoaded || transitioning
  
  // Show skeleton while data is loading
  const showSkeleton = !dataLoaded

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="h-screen w-full snap-start relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <PortfolioTransitionLayers showOverlay={showOverlay} />

      {/* Portfolio Skeleton Loader */}
      <PortfolioSkeleton isVisible={showSkeleton} />

      {/* Portfolio Loading Animation */}
      <PortfolioLoader 
        isVisible={showOverlay && dataLoaded} 
        projectTitle={currentProject.title}
        isTransitioning={transitioning}
      />

      {/* Full screen portfolio card */}
      <div
        className="absolute inset-0 w-full h-full"
        onMouseMove={handlers.handleMouseMove}
        onMouseLeave={() => setShowNavigation({ left: false, right: false })}
      >
        <PortfolioContent
          project={currentProject}
          showOverlay={showOverlay}
          interactionMode={interactionMode}
          showInteractionButton={showInteractionButton}
          showTestimonial={showTestimonial}
          onIframeLoad={handlers.handleIframeLoad}
          onInteractionClick={handlers.handleInteractionClick}
          onShowInteractionButton={setShowInteractionButton}
          onTestimonialVisibility={handlers.handleTestimonialVisibility}
          onTestimonialMouseMove={handlers.handleTestimonialMouseMove}
        />

        <PortfolioNavigation
          projects={projects}
          activeProjectIndex={activeProjectIndex}
          showNavigation={showNavigation}
          interactionMode={interactionMode}
          transitioning={transitioning}
          onPrevious={handlers.handlePrevious}
          onNext={handlers.handleNext}
          onSetActiveProject={setActiveProjectIndex}
        />
      </div>
    </section>
  )
} 