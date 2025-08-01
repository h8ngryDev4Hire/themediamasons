import { raleway } from '../../../../lib/fonts'
import { PortfolioItem } from '../../../../definitions/types/portfolio'

interface PortfolioHeaderProps {
  project: PortfolioItem
  showOverlay: boolean
}

export default function PortfolioHeader({ project, showOverlay }: PortfolioHeaderProps) {
  return (
    <div 
      id="portfolio-project-header" 
      className={`absolute top-0 left-0 right-0 z-30 p-4 md:p-6 backdrop-blur-md bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-700 ${
        showOverlay ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Mobile: Stack vertically, Desktop: Side by side */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4">
        <div id="portfolio-project-info" className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
          <h3 
            id="portfolio-project-title" 
            className={`${raleway.className} text-lg sm:text-xl md:text-2xl font-bold leading-tight`}
          >
            {project.title}
          </h3>
          <p id="portfolio-project-client" className="text-gray-300 text-sm md:text-base">
            Client: {project.client}
          </p>
        </div>

        {/* Display technology tags if available */}
        {project.technologies && (
          <div id="portfolio-project-technologies" className="flex flex-wrap gap-1 md:gap-2 max-w-full">
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-xs bg-media-mason-purple/30 text-white px-2 py-1 rounded-full whitespace-nowrap"
              >
                <b>{tech}</b>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}