import { useState, useRef } from 'react'
import { PortfolioData } from '../../../../definitions/types/portfolio'

export interface PortfolioState {
  activeProjectIndex: number
  setActiveProjectIndex: (index: number) => void
  showNavigation: { left: boolean; right: boolean }
  setShowNavigation: (nav: { left: boolean; right: boolean }) => void
  showTestimonial: boolean
  setShowTestimonial: (show: boolean) => void
  isHovered: boolean
  setIsHovered: (hovered: boolean) => void
  isVisible: boolean
  setIsVisible: (visible: boolean) => void
  iframeLoaded: boolean
  setIframeLoaded: (loaded: boolean) => void
  transitioning: boolean
  setTransitioning: (transitioning: boolean) => void
  displayedProject: number
  setDisplayedProject: (index: number) => void
  interactionMode: boolean
  setInteractionMode: (mode: boolean) => void
  showInteractionButton: boolean
  setShowInteractionButton: (show: boolean) => void
  dataLoaded: boolean
  setDataLoaded: (loaded: boolean) => void
  sectionRef: React.RefObject<HTMLElement | null>
}

export function usePortfolioState(): PortfolioState {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [showNavigation, setShowNavigation] = useState({ left: false, right: false })
  const [showTestimonial, setShowTestimonial] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const [displayedProject, setDisplayedProject] = useState(0)
  const [interactionMode, setInteractionMode] = useState(false)
  const [showInteractionButton, setShowInteractionButton] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  return {
    activeProjectIndex,
    setActiveProjectIndex,
    showNavigation,
    setShowNavigation,
    showTestimonial,
    setShowTestimonial,
    isHovered,
    setIsHovered,
    isVisible,
    setIsVisible,
    iframeLoaded,
    setIframeLoaded,
    transitioning,
    setTransitioning,
    displayedProject,
    setDisplayedProject,
    interactionMode,
    setInteractionMode,
    showInteractionButton,
    setShowInteractionButton,
    dataLoaded,
    setDataLoaded,
    sectionRef,
  }
}