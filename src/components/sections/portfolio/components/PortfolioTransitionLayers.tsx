interface PortfolioTransitionLayersProps {
  showOverlay: boolean
}

export default function PortfolioTransitionLayers({ showOverlay }: PortfolioTransitionLayersProps) {
  return (
    <>
      {/* Section-to-background gradient transitions */}
      <div 
        id="portfolio-transition-layer-top-half-1" 
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none -translate-y-full"
      />
      <div 
        id="portfolio-transition-layer-top-half-2" 
        className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"
      />

      <div 
        id="portfolio-transition-layer-bottom-half-1" 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"
      />
      <div 
        id="portfolio-transition-layer-bottom-half-2" 
        className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none translate-y-full"
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]" />

      {/* Fade overlay for entire section */}
      <div
        className={`absolute inset-0 bg-black z-[60] pointer-events-none transition-opacity duration-700 ${
          showOverlay ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </>
  )
}