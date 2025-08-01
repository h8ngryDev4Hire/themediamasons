import { PortfolioItem } from '../../../../definitions/types/portfolio'
import PortfolioHeader from './PortfolioHeader'
import PortfolioIframe from './PortfolioIframe'
import PortfolioTestimonial from './PortfolioTestimonial'

interface PortfolioContentProps {
  project: PortfolioItem
  showOverlay: boolean
  interactionMode: boolean
  showInteractionButton: boolean
  showTestimonial: boolean
  onIframeLoad: () => void
  onInteractionClick: () => void
  onShowInteractionButton: (show: boolean) => void
  onTestimonialVisibility: (visible: boolean) => void
  onTestimonialMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void
}

export default function PortfolioContent({
  project,
  showOverlay,
  interactionMode,
  showInteractionButton,
  showTestimonial,
  onIframeLoad,
  onInteractionClick,
  onShowInteractionButton,
  onTestimonialVisibility,
  onTestimonialMouseMove,
}: PortfolioContentProps) {
  return (
    <div className="w-full h-full">
      {/* Interactive Website Preview */}
      <div
        className="relative w-full h-full overflow-hidden bg-gradient-to-br from-black/30 via-transparent to-black/30"
        onMouseMove={onTestimonialMouseMove}
      >
        <PortfolioHeader project={project} showOverlay={showOverlay} />

        <PortfolioIframe
          project={project}
          interactionMode={interactionMode}
          showInteractionButton={showInteractionButton}
          onIframeLoad={onIframeLoad}
          onInteractionClick={onInteractionClick}
          onShowInteractionButton={onShowInteractionButton}
          onTestimonialVisibility={onTestimonialVisibility}
        />

        <PortfolioTestimonial
          project={project}
          showTestimonial={showTestimonial}
          onTestimonialVisibility={onTestimonialVisibility}
        />
      </div>
    </div>
  )
}