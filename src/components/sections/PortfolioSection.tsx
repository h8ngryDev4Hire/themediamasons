'use client'

import { useState, useRef, useEffect } from 'react'
import { raleway } from '../../lib/fonts'
import portfolioData from '../../data/portfolio.json'
import { PortfolioData } from '../../definitions/types/portfolio'

export default function WorkSection() {
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState({ left: false, right: false });
  const [showTestimonial, setShowTestimonial] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [displayedProject, setDisplayedProject] = useState(0);
  const [interactionMode, setInteractionMode] = useState(false);
  const [showInteractionButton, setShowInteractionButton] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Control navigation visibility when this section is active
  useEffect(() => {
    const navElement = document.getElementById('main-navigation');
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (navElement) {
          navElement.style.opacity = entry.isIntersecting ? '0' : '1';
          navElement.style.pointerEvents = entry.isIntersecting ? 'none' : 'auto';
        }

        // Update section visibility state
        setIsVisible(entry.isIntersecting);

        // Reset interaction mode when leaving section
        if (!entry.isIntersecting) {
          setInteractionMode(false);
          // Dispatch event to restore background brightness
          window.dispatchEvent(new CustomEvent('portfolioInteraction', {
            detail: { interactionMode: false }
          }));
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // Handle project transitions with proper animation
  useEffect(() => {
    if (activeProjectIndex !== displayedProject) {
      // Start transition
      setTransitioning(true);
      setIframeLoaded(false);

      // After fade out, update the displayed project
      const timeout = setTimeout(() => {
        setDisplayedProject(activeProjectIndex);
      }, 700); // Match the transition duration

      return () => clearTimeout(timeout);
    }
  }, [activeProjectIndex, displayedProject]);

  // Handle background dimming on hover
  useEffect(() => {
    // Dispatch event to dim/restore background based on hover state
    window.dispatchEvent(new CustomEvent('portfolioInteraction', {
      detail: { interactionMode: isHovered }
    }));
  }, [isHovered]);

  // Use portfolio data from JSON file with type checking
  const projects = portfolioData as PortfolioData;

  const handlePrevious = () => {
    if (transitioning) return; // Prevent clicking during transition
    setActiveProjectIndex(prevIndex =>
      prevIndex === 0 ? projects.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    if (transitioning) return; // Prevent clicking during transition
    setActiveProjectIndex(prevIndex =>
      prevIndex === projects.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only show navigation if not in interaction mode
    if (!interactionMode) {
      const { clientX, currentTarget } = e;
      const { left, width } = currentTarget.getBoundingClientRect();
      const leftThreshold = width * 0.2;
      const rightThreshold = width * 0.8;
      const relativeX = clientX - left;

      setShowNavigation({
        left: relativeX < leftThreshold,
        right: relativeX > rightThreshold
      });
    }
  };

  const handleInteractionClick = () => {
    setInteractionMode(true);
    setShowNavigation({ left: false, right: false });
    setShowTestimonial(false);

    // Dispatch event to dim background
    window.dispatchEvent(new CustomEvent('portfolioInteraction', {
      detail: { interactionMode: true }
    }));
  };

  const handleTestimonialVisibility = (isVisible: boolean) => {
    // Only show testimonial if not in interaction mode
    if (!interactionMode) {
      setShowTestimonial(isVisible);
    }
  };

  const handleIframeLoad = () => {
    setIframeLoaded(true);
    setTransitioning(false);
  };

  const currentProject = projects[displayedProject];

  // Should the black overlay be visible
  const showOverlay = !isVisible || !iframeLoaded || transitioning;

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="h-screen w-full snap-start relative overflow-visible"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Section-to-background gradient transitions */}
      <div id="portfolio-transition-layer-top-half-1" className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none -translate-y-full"></div>
      <div id="portfolio-transition-layer-top-half-2" className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none"></div>

      <div id="portfolio-transition-layer-bottom-half-1" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none"></div>
      <div id="portfolio-transition-layer-bottom-half-2" className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent pointer-events-none translate-y-full"></div>

      {/* Vignette effect */}
      <div className="absolute inset-0 pointer-events-none z-50 shadow-[inset_0_0_150px_rgba(0,0,0,0.7)]"></div>

      {/* Fade overlay for entire section */}
      <div
        className={`absolute inset-0 bg-black z-[60] pointer-events-none transition-opacity duration-700 ${showOverlay ? 'opacity-100' : 'opacity-0'
          }`}
      ></div>

      {/* Full screen portfolio card */}
      <div
        className="absolute inset-0 w-full h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setShowNavigation({ left: false, right: false })}
      >
        {/* Portfolio card */}
        <div className="w-full h-full">
          {/* Interactive Website Preview */}
          <div
            className="relative w-full h-full overflow-hidden bg-gradient-to-br from-black/30 via-transparent to-black/30"
            onMouseMove={(e) => {
              // Show testimonial when hovering near the bottom
              const { clientY, currentTarget } = e;
              const { top, height } = currentTarget.getBoundingClientRect();
              const relativeY = clientY - top;
              handleTestimonialVisibility(relativeY > height * 0.5);
            }}
          >
            {/* Title and subtitle inline at the top */}
            <div id="portfolio-project-header" className={`absolute top-0 left-0 right-0 z-30 p-6 flex items-center justify-between backdrop-blur-md bg-gradient-to-b from-black/70 to-transparent transition-opacity duration-700 ${showOverlay ? 'opacity-0' : 'opacity-100'
              }`}>
              <div id="portfolio-project-info" className="flex items-baseline gap-4">
                <h3 id="portfolio-project-title" className={`${raleway.className} text-2xl font-bold`}>{currentProject.title}</h3>
                <p id="portfolio-project-client" className="text-gray-300">Client: {currentProject.client}</p>
              </div>

              {/* Display technology tags if available */}
              {currentProject.technologies && (
                <div id="portfolio-project-technologies" className="hidden md:flex gap-2">
                  {currentProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs bg-media-mason-purple/30 text-white px-2 py-1 rounded-full"
                    >
                      <b>{tech}</b>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Liquid glass effect at the top */}
            <div className="absolute top-0 left-0 right-0 h-1/5 z-10 bg-gradient-to-b from-white/15 to-transparent pointer-events-none"></div>

            {/* Website iframe */}
            <div id="portfolio-iframe-container" className="absolute inset-0 w-full h-full z-0">
              {/* Iframe element */}
              <iframe
                id="portfolio-project-iframe"
                src={currentProject.url}
                title={currentProject.title}
                className="w-full h-full transform scale-95 origin-top pt-20"
                sandbox="allow-same-origin allow-scripts"
                loading="lazy"
                onLoad={handleIframeLoad}
              />

              {/* Interactive overlay - only shown when not in interaction mode */}
              {!interactionMode && (
                <>
                  {/* Transparent overlay to capture hover events on iframe */}
                  <div
                    id="portfolio-iframe-overlay"
                    className="absolute inset-0 z-20 pointer-events-auto"
                    onMouseEnter={() => handleTestimonialVisibility(true)}
                    onMouseLeave={() => handleTestimonialVisibility(false)}
                    aria-hidden="true"
                  ></div>

                  {/* Click to interact overlay - transparent background */}
                  <div
                    id="portfolio-interaction-overlay"
                    className="absolute inset-0 z-30 flex items-center justify-center"
                  >
                    {/* Hover region - 2.5x the size of the button */}
                    <div
                      className="relative flex items-center justify-center"
                      onMouseEnter={() => setShowInteractionButton(true)}
                      onMouseLeave={() => setShowInteractionButton(false)}
                      style={{ width: '400px', height: '200px' }} // 2.5x the button size
                    >
                      {/* Click to interact button - only visible on hover */}
                      <div
                        className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4 shadow-2xl transition-all duration-300 cursor-pointer flex flex-col items-center justify-center ${showInteractionButton
                          ? 'opacity-100 scale-100 hover:bg-white/15 hover:scale-105'
                          : 'opacity-0 scale-75 pointer-events-none'
                          }`}
                        onClick={handleInteractionClick}
                      >
                        <div className="flex items-center justify-center gap-3 mb-2">
                          <svg
                            className="w-5 h-5 text-white flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                            />
                          </svg>
                          <span className="text-white font-medium text-base whitespace-nowrap">Click to Interact</span>
                        </div>
                        <p className="text-white/70 text-xs text-center whitespace-nowrap">Explore the live website</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Testimonial that appears on hover near the bottom */}
            <div
              id="portfolio-testimonial"
              className={`absolute bottom-0 left-0 right-0 z-30 transition-all duration-500 ${showTestimonial ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full pointer-events-none'
                }`}
              onMouseEnter={() => handleTestimonialVisibility(true)}
              onMouseLeave={() => handleTestimonialVisibility(false)}
            >
              <div id="portfolio-testimonial-content" className="backdrop-blur-2xl p-6 bg-gradient-to-t from-media-mason-purple/90 to-black/85 border-t border-white/20 shadow-2xl relative">
                {/* Additional background layer for stronger opacity */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-xl"></div>
                <div className="relative z-10 flex items-start">
                  <svg className="w-6 h-6 text-media-mason-purple mr-3 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                  <div>
                    <p id="portfolio-testimonial-quote" className="text-md italic mb-2">{currentProject.testimonial.quote}</p>
                    <div id="portfolio-testimonial-author" className="flex items-center">
                      <div className="w-6 h-6 bg-media-mason-purple/30 rounded-full flex items-center justify-center mr-2">
                        <span className="text-xs font-bold">{currentProject.testimonial.author[0]}</span>
                      </div>
                      <p className="text-sm">
                        <span className="font-medium">{currentProject.testimonial.author}</span>,{" "}
                        <span className="text-gray-300">{currentProject.testimonial.position}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Navigation Arrow - Positioned outside iframe in interaction mode */}
        <button
          className={`absolute top-1/2 transform -translate-y-1/2 z-50 p-4 transition-all duration-300 ${interactionMode
            ? 'left-4 opacity-100 translate-x-0' // Always visible and positioned outside iframe
            : showNavigation.left
              ? 'left-0 opacity-100 translate-x-0'
              : 'left-0 opacity-0 -translate-x-full'
            }`}
          onClick={handlePrevious}
          aria-label="Previous project"
        >
          <div className="backdrop-blur-lg p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* Right Navigation Arrow - Positioned outside iframe in interaction mode */}
        <button
          className={`absolute top-1/2 transform -translate-y-1/2 z-50 p-4 transition-all duration-300 ${interactionMode
            ? 'right-4 opacity-100 translate-x-0' // Always visible and positioned outside iframe
            : showNavigation.right
              ? 'right-0 opacity-100 translate-x-0'
              : 'right-0 opacity-0 translate-x-full'
            }`}
          onClick={handleNext}
          aria-label="Next project"
        >
          <div className="backdrop-blur-lg p-4 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/10 shadow-lg">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </button>

        {/* Pagination dots */}
        <div id="portfolio-pagination" className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {projects.map((_, index) => (
            <button
              key={index}
              id={`portfolio-dot-${index}`}
              onClick={() => setActiveProjectIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === activeProjectIndex
                ? 'bg-media-mason-purple w-6'
                : 'bg-white/30 hover:bg-white/50'
                }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
} 