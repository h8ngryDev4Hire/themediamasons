import { PortfolioState } from './usePortfolioState'
import { PortfolioData } from '../../../../definitions/types/portfolio'

interface UsePortfolioHandlersProps {
  state: PortfolioState
  projects: PortfolioData
}

export function usePortfolioHandlers({ state, projects }: UsePortfolioHandlersProps) {
  const {
    activeProjectIndex,
    transitioning,
    interactionMode,
    setActiveProjectIndex,
    setShowNavigation,
    setInteractionMode,
    setShowTestimonial,
    setIframeLoaded,
    setTransitioning,
  } = state

  const handlePrevious = () => {
    if (transitioning) return // Prevent clicking during transition
    const newIndex = activeProjectIndex === 0 ? projects.length - 1 : activeProjectIndex - 1
    setActiveProjectIndex(newIndex)
  }

  const handleNext = () => {
    if (transitioning) return // Prevent clicking during transition
    const newIndex = activeProjectIndex === projects.length - 1 ? 0 : activeProjectIndex + 1
    setActiveProjectIndex(newIndex)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only show navigation if not in interaction mode
    if (!interactionMode) {
      const { clientX, currentTarget } = e
      const { left, width } = currentTarget.getBoundingClientRect()
      const leftThreshold = width * 0.2
      const rightThreshold = width * 0.8
      const relativeX = clientX - left

      setShowNavigation({
        left: relativeX < leftThreshold,
        right: relativeX > rightThreshold
      })
    }
  }

  const handleInteractionClick = () => {
    setInteractionMode(true)
    setShowNavigation({ left: false, right: false })
    setShowTestimonial(false)

    // Dispatch event to dim background
    window.dispatchEvent(new CustomEvent('portfolioInteraction', {
      detail: { interactionMode: true }
    }))
  }

  const handleTestimonialVisibility = (isVisible: boolean) => {
    // Only show testimonial if not in interaction mode
    if (!interactionMode) {
      setShowTestimonial(isVisible)
    }
  }

  const handleIframeLoad = () => {
    setIframeLoaded(true)
    setTransitioning(false)
  }

  const handleTestimonialMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Show testimonial when hovering near the bottom
    const { clientY, currentTarget } = e
    const { top, height } = currentTarget.getBoundingClientRect()
    const relativeY = clientY - top
    handleTestimonialVisibility(relativeY > height * 0.5)
  }

  return {
    handlePrevious,
    handleNext,
    handleMouseMove,
    handleInteractionClick,
    handleTestimonialVisibility,
    handleIframeLoad,
    handleTestimonialMouseMove,
  }
}