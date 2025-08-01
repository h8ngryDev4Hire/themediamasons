'use client'

import { useEffect, useState } from 'react'

interface PortfolioLoaderProps {
  isVisible: boolean
  projectTitle?: string
  isTransitioning?: boolean
}

export default function PortfolioLoader({ isVisible, projectTitle, isTransitioning = false }: PortfolioLoaderProps) {
  const [dots, setDots] = useState('')
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) {
      setProgress(0)
      return
    }

    // Animate dots
    const dotsInterval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    // Simulate progress for iframe loading
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) return prev
        return prev + Math.random() * 15
      })
    }, 200)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(progressInterval)
    }
  }, [isVisible])

  if (!isVisible) return null

  const loadingText = isTransitioning 
    ? `Switching to ${projectTitle ? `"${projectTitle}"` : 'next project'}`
    : `Loading ${projectTitle ? `"${projectTitle}"` : 'Portfolio'}`

  const subText = isTransitioning 
    ? 'Preparing new experience'
    : 'Preparing interactive experience'

  return (
    <div className="absolute inset-0 z-[70] flex items-center justify-center bg-black/90 backdrop-blur-sm">
      <div className="flex flex-col items-center space-y-6">
        {/* Animated loading rings */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-20 h-20 border-4 border-white/20 rounded-full animate-spin border-t-media-mason-purple"></div>
          
          {/* Middle ring */}
          <div className="absolute top-2 left-2 w-16 h-16 border-4 border-white/10 rounded-full animate-spin border-t-white/60" 
               style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
          
          {/* Inner ring */}
          <div className="absolute top-4 left-4 w-12 h-12 border-4 border-white/5 rounded-full animate-spin border-t-media-mason-purple/60"
               style={{ animationDuration: '0.8s' }}></div>
          
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-media-mason-purple rounded-full animate-pulse"></div>
        </div>

        {/* Loading text */}
        <div className="text-center space-y-2">
          <p className="text-white text-lg font-medium">
            {loadingText}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
          <p className="text-white/60 text-sm">
            {subText}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-media-mason-purple to-white transition-all duration-300 ease-out"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>

        {/* Loading percentage */}
        <p className="text-white/40 text-xs font-mono">
          {Math.round(Math.min(progress, 100))}%
        </p>
      </div>
    </div>
  )
}