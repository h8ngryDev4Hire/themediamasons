'use client'

import { bangers, oswald, raleway } from '../../lib/fonts'
import TextStream from '../common/text-stream/TextStream'
import { useInView } from '../../hooks/useInView'
import { useModal } from '../../hooks'

export default function HeroSection() {
  // Phrases extracted and inspired from the old project
  const heroTexts = [
    "Need a website? We've got you covered.",
    "Looking to increase your online presence?",
    "Our mission is to get as many eyes on your site as possible!",
    "We create digital solutions that help your business grow.",
    "We tailor your site's design to match your branding style.",
    "Implementing effective content strategies that engage your audience."
  ]

  const { ref, isInView } = useInView(0.1);
  const { openModal } = useModal();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  const handleScrollToPortfolio = () => {
    const portfolioSection = document.getElementById('portfolio')
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleContactClick = () => {
    openModal({ type: 'contact' });
  }

  return (
    <section 
      id="hero-section"
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen snap-start flex flex-col items-center justify-center text-center p-4 relative overflow-hidden"
    >
      {/* Content container */}
      <div className="max-w-5xl mx-auto">
        <h1 
          id="hero-title" 
          className={`${bangers.className} text-4xl md:text-6xl font-bold text-white mb-6 cursor-pointer`}
          onClick={handleScrollToTop}
        >
          THE MEDIA MASONS
        </h1>
        <div id="hero-subtitle" className={`${raleway.className} text-xl md:text-2xl max-w-3xl mb-8`}>
          <TextStream 
            texts={heroTexts}
            typingSpeed={22} 
            cycleSpeed={4000}
            fadeDelay={4000}
          />
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          <div 
            className="relative overflow-hidden backdrop-blur-md rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 shadow-md button-glow-hover hover:scale-125 transition-transform duration-300 inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl rounded-2xl" />
            <button 
              id="hero-cta" 
              onClick={handleContactClick}
              className={`${oswald.className} relative z-10 text-white font-bold py-3 px-8 transition duration-300 ease-in-out`}
            >
              <span className="button-text">Get Started</span>
            </button>
          </div>
          
          <div 
            className="relative overflow-hidden backdrop-blur-md rounded-2xl bg-gradient-to-br from-black/40 to-black/20 border border-white/20 shadow-md button-glow-hover hover:scale-125 transition-transform duration-300 inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800/30 to-zinc-700/20 backdrop-blur-xl rounded-2xl" />
            <button 
              id="portfolio-cta" 
              onClick={handleScrollToPortfolio}
              className={`${oswald.className} relative z-10 text-white font-bold py-3 px-8 transition duration-300 ease-in-out`}
            >
              <span className="button-text">View Our Portfolio</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 