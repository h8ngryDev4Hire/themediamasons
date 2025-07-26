'use client'

import { oswald, raleway } from '../../lib/fonts'
import { useInView } from '../../hooks/useInView'
import { useEffect, useState } from 'react'
import TextStream from '../common/text-stream/TextStream'
import { Users, Target, Heart } from 'lucide-react'
import { useModal } from '../../hooks'

export default function AboutSection() {
  const { ref, isInView } = useInView(0.1);
  const [resetKey, setResetKey] = useState(0);
  const { openModal } = useModal();

  // Reset animation when section goes out of view and comes back
  useEffect(() => {
    if (!isInView) {
      setResetKey(prev => prev + 1);
    }
  }, [isInView]);
  
  return (
    <section 
      id="about" 
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen snap-start flex flex-col items-center justify-start p-8 pt-24 relative overflow-hidden"
    >
      {/* Content container */}
      <div className="max-w-7xl mx-auto w-full pt-16 flex flex-col">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full">
          <h2 
            id="about-title" 
            className={`${oswald.className} text-3xl md:text-5xl font-bold mb-6 text-center transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            Who We Are
          </h2>
        </div>
        
        {/* About subtitle with animation */}
        <div 
          id="about-subtitle" 
          className={`max-w-3xl mx-auto text-center mb-16 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {isInView && (
            <div className={`${raleway.className} text-xl md:text-2xl text-white`}>
              <TextStream 
                key={resetKey}
                text="Crafting Digital Experiences That Leave Lasting Impressions"
                typingSpeed={25}
              />
            </div>
          )}
        </div>
        
        {/* About cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Mission Card */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} 
            style={{ transitionDelay: '300ms' }}
          >
            <div className="relative overflow-hidden backdrop-blur-lg p-7 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-md h-full w-full flex card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-xl"></div>
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="mb-4 text-purple-400 icon-glow">
                  <Target size={42} strokeWidth={1.5} />
                </div>
                <h3 className={`${oswald.className} text-2xl font-extrabold mb-4 text-white`}>
                  Our Mission
                </h3>
                <p className={`${raleway.className} text-base font-semibold tracking-wide leading-relaxed text-white`}>
                  Our mission is to get as many eyes on your site as possible! That means improving SEO, tailoring your site's design, and implementing effective content strategies that engage your audience and drive action.
                </p>
              </div>
            </div>
          </div>
          
          {/* Values Card */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} 
            style={{ transitionDelay: '450ms' }}
          >
            <div className="relative overflow-hidden backdrop-blur-lg p-7 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-md h-full w-full flex card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-xl"></div>
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="mb-4 text-purple-400 icon-glow">
                  <Heart size={42} strokeWidth={1.5} />
                </div>
                <h3 className={`${oswald.className} text-2xl font-extrabold mb-4 text-white`}>
                  Our Values
                </h3>
                <p className={`${raleway.className} text-base font-semibold tracking-wide leading-relaxed text-white`}>
                  User experience is our top priority. We believe that by prioritizing user experience, we can enhance customer satisfaction, loyalty, and boost your conversion rates. We're committed to creating digital experiences that users love.
                </p>
              </div>
            </div>
          </div>
          
          {/* Approach Card */}
          <div 
            className={`transition-all duration-700 ${
              isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`} 
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative overflow-hidden backdrop-blur-lg p-7 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-md h-full w-full flex card-hover">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-xl"></div>
              <div className="relative z-10 flex flex-col h-full w-full">
                <div className="mb-4 text-purple-400 icon-glow">
                  <Users size={42} strokeWidth={1.5} />
                </div>
                <h3 className={`${oswald.className} text-2xl font-extrabold mb-4 text-white`}>
                  Our Approach
                </h3>
                <p className={`${raleway.className} text-base font-semibold tracking-wide leading-relaxed text-white`}>
                  We develop comprehensive digital strategies that integrate seamless design, consistent messaging, and intuitive navigation to enhance your brand credibility and foster meaningful connections with your target audience.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div 
          className={`text-center mt-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '750ms' }}
        >
          <p className={`${raleway.className} text-lg text-gray-300 mb-6 max-w-2xl mx-auto`}>
            Ready to transform your digital presence with a team that understands your business needs?
          </p>
          <div className="inline-block relative overflow-hidden backdrop-blur-lg rounded-xl transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-md">
            <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-xl" />
            <button 
              onClick={() => openModal({ type: 'contact' })}
              className={`${oswald.className} relative z-10 text-white font-bold py-3 px-8 transition duration-300 ease-in-out`}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  )
} 