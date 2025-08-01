import { useEffect } from 'react'
import { PortfolioState } from './usePortfolioState'
import { PortfolioData } from '../../../../definitions/types/portfolio'

interface UsePortfolioEffectsProps {
  state: PortfolioState
  projects: PortfolioData
}

export function usePortfolioEffects({ state, projects }: UsePortfolioEffectsProps) {
  const {
    activeProjectIndex,
    displayedProject,
    isHovered,
    sectionRef,
    setIsVisible,
    setInteractionMode,
    setTransitioning,
    setDisplayedProject,
    setIframeLoaded,
    setDataLoaded,
  } = state

  // Control navigation visibility when this section is active
  useEffect(() => {
    const navElement = document.getElementById('main-navigation')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (navElement) {
          navElement.style.opacity = entry.isIntersecting ? '0' : '1'
          navElement.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto'
        }

        // Update section visibility state
        setIsVisible(entry.isIntersecting)

        // Reset interaction mode when leaving section
        if (!entry.isIntersecting) {
          setInteractionMode(false)
          // Dispatch event to restore background brightness
          window.dispatchEvent(new CustomEvent('portfolioInteraction', {
            detail: { interactionMode: false }
          }))
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [sectionRef, setIsVisible, setInteractionMode])

  // Handle project transitions with proper animation
  useEffect(() => {
    if (activeProjectIndex !== displayedProject) {
      // Start transition
      setTransitioning(true)
      setIframeLoaded(false)

      // After fade out, update the displayed project
      const timeout = setTimeout(() => {
        setDisplayedProject(activeProjectIndex)
      }, 700) // Match the transition duration

      return () => clearTimeout(timeout)
    }
  }, [activeProjectIndex, displayedProject, setTransitioning, setDisplayedProject, setIframeLoaded])

  // Handle background dimming on hover
  useEffect(() => {
    // Dispatch event to dim/restore background based on hover state
    window.dispatchEvent(new CustomEvent('portfolioInteraction', {
      detail: { interactionMode: isHovered }
    }))
  }, [isHovered])

  // Simulate data loading (in a real app, this would be an API call)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDataLoaded(true)
    }, 800) // Simulate loading time

    return () => clearTimeout(timer)
  }, [setDataLoaded])
}