'use client'

interface PortfolioSkeletonProps {
  isVisible: boolean
}

export default function PortfolioSkeleton({ isVisible }: PortfolioSkeletonProps) {
  if (!isVisible) return null

  return (
    <div className="absolute inset-0 z-[65] bg-black/95 backdrop-blur-sm">
      {/* Header skeleton */}
      <div className="absolute top-0 left-0 right-0 z-30 p-6 flex items-center justify-between">
        <div className="flex items-baseline gap-4">
          {/* Title skeleton */}
          <div className="h-8 w-48 bg-white/20 rounded animate-pulse"></div>
          {/* Client skeleton */}
          <div className="h-5 w-32 bg-white/10 rounded animate-pulse"></div>
        </div>
        
        {/* Technology tags skeleton */}
        <div className="hidden md:flex gap-2">
          <div className="h-6 w-16 bg-media-mason-purple/20 rounded-full animate-pulse"></div>
          <div className="h-6 w-20 bg-media-mason-purple/20 rounded-full animate-pulse"></div>
          <div className="h-6 w-12 bg-media-mason-purple/20 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Main content skeleton */}
      <div className="absolute inset-0 pt-20 pb-16">
        <div className="w-full h-full bg-gradient-to-br from-white/5 via-white/2 to-white/5 rounded-lg animate-pulse">
          {/* Simulated iframe loading area */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-white/20 border-t-media-mason-purple rounded-full animate-spin mx-auto"></div>
              <div className="h-4 w-40 bg-white/20 rounded animate-pulse mx-auto"></div>
              <div className="h-3 w-32 bg-white/10 rounded animate-pulse mx-auto"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom testimonial skeleton */}
      <div className="absolute bottom-16 left-0 right-0 p-6">
        <div className="backdrop-blur-lg bg-white/5 rounded-lg p-4 space-y-3">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-media-mason-purple/30 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-full bg-white/10 rounded animate-pulse"></div>
              <div className="h-4 w-3/4 bg-white/10 rounded animate-pulse"></div>
              <div className="h-3 w-1/2 bg-white/5 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination skeleton */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full bg-white/20 animate-pulse ${
              index === 0 ? 'w-6' : ''
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          ></div>
        ))}
      </div>
    </div>
  )
}