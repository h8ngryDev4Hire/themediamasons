'use client'

import { oswald, raleway } from '../../lib/fonts'
import ServiceCard from '../services/ServiceCard'
import { useInView } from '../../hooks/useInView'
import { Code, Globe, Paintbrush, Wrench } from 'lucide-react'
import TextStream from '../common/text-stream/TextStream'
import { useEffect, useState } from 'react'

export default function ServicesSection() {
  const { ref, isInView } = useInView(0.1);
  const [resetKey, setResetKey] = useState(0);
  
  // Single subtitle text
  const serviceSubtitle = "I am your trusted digital partner for all your web service needs.";
  
  // Reset the animation when the section goes out of view and comes back
  useEffect(() => {
    if (!isInView) {
      // Increment key to force component remount when section comes back into view
      setResetKey(prev => prev + 1);
    }
  }, [isInView]);
  
  return (
    <section 
      id="services" 
      ref={ref as React.RefObject<HTMLElement>}
      className="min-h-screen snap-start flex flex-col items-center justify-start p-8 pt-24 pb-32 relative overflow-hidden"
    >
      {/* Content container */}
      <div className="max-w-7xl mx-auto w-full pt-16 flex flex-col">
        <div className="flex flex-col lg:flex-row justify-center items-center w-full">
          <h2 
            id="services-title" 
            className={`${oswald.className} text-3xl md:text-5xl font-bold mb-6 text-center transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'
            }`}
          >
            What I Do
          </h2>
        </div>
        
        {/* Services subtitle with animation */}
        <div 
          id="services-subtitle" 
          className={`text-center mx-auto max-w-2xl mb-16 transition-all duration-1000 ${raleway.className} text-xl md:text-2xl ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {isInView && (
            <TextStream 
              key={resetKey}
              text={serviceSubtitle}
              typingSpeed={25}
            />
          )}
        </div>
        
        <div id="services-grid" className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          <div className={`w-full transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '0ms' }}>
            <ServiceCard 
              id="service-web-development"
              title="Web Development" 
              description="Custom websites built with modern technologies that load fast and convert visitors."
              icon={<Code size={42} strokeWidth={1.5} />}
            />
          </div>
          <div className={`w-full transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '150ms' }}>
            <ServiceCard 
              id="service-web-applications"
              title="Web Applications" 
              description="Powerful, scalable applications with robust functionality that solve business problems."
              icon={<Globe size={42} strokeWidth={1.5} />}
            />
          </div>
          <div className={`w-full transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '300ms' }}>
            <ServiceCard 
              id="service-web-design"
              title="Web Design" 
              description="Beautiful, intuitive designs that captivate your audience and prioritize user experience."
              icon={<Paintbrush size={42} strokeWidth={1.5} />}
            />
          </div>
          <div className={`w-full transition-all duration-700 ${isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} style={{ transitionDelay: '450ms' }}>
            <ServiceCard 
              id="service-web-maintenance"
              title="Website Management + Maintenance" 
              description="Ongoing support, updates, and improvements to keep your website secure, fast, and up-to-date."
              icon={<Wrench size={42} strokeWidth={1.5} />}
            />
          </div>
        </div>
      </div>
    </section>
  )
} 