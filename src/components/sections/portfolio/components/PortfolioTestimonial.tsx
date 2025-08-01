import { PortfolioItem } from '../../../../definitions/types/portfolio'

interface PortfolioTestimonialProps {
  project: PortfolioItem
  showTestimonial: boolean
  onTestimonialVisibility: (visible: boolean) => void
}

export default function PortfolioTestimonial({
  project,
  showTestimonial,
  onTestimonialVisibility,
}: PortfolioTestimonialProps) {
  // Truncate long testimonials on mobile
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength).trim() + '...'
  }

  return (
    <div
      id="portfolio-testimonial"
      className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${showTestimonial
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-full pointer-events-none'
        }`}
      onMouseEnter={() => onTestimonialVisibility(true)}
      onMouseLeave={() => onTestimonialVisibility(false)}
    >
      <div
        id="portfolio-testimonial-content"
        className="backdrop-blur-2xl p-4 md:p-6 bg-gradient-to-t from-media-mason-purple/90 to-black/85 border-t border-white/20 shadow-2xl relative max-h-[40vh] md:max-h-none overflow-y-auto"
      >
        {/* Additional background layer for stronger opacity */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-xl" />

        {/* Mobile: Add close button */}
        <button
          className="md:hidden absolute top-2 right-2 z-20 w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white/70 hover:text-white"
          onClick={() => onTestimonialVisibility(false)}
          aria-label="Close testimonial"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="relative z-10 flex items-start">
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-media-mason-purple mr-2 md:mr-3 flex-shrink-0 mt-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <div className="flex-1 min-w-0">
            <p id="portfolio-testimonial-quote" className="text-sm md:text-md italic mb-2 leading-relaxed">
              <span className="md:hidden">
                {truncateText(project.testimonial.quote)}
              </span>
              <span className="hidden md:inline">
                {project.testimonial.quote}
              </span>
            </p>
            <div id="portfolio-testimonial-author" className="flex items-center">
              <div className="w-5 h-5 md:w-6 md:h-6 bg-media-mason-purple/30 rounded-full flex items-center justify-center mr-2 flex-shrink-0">
                <span className="text-xs font-bold">
                  {project.testimonial.author[0]}
                </span>
              </div>
              <p className="text-xs md:text-sm truncate">
                <span className="font-medium">{project.testimonial.author}</span>,{" "}
                <span className="text-gray-300">{project.testimonial.position}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}