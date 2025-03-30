'use client'

import React from 'react'
import WireframeGlobe from './wireframeGlobe'

interface GlobeSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function GlobeSection({ 
  title = "Global Digital Presence", 
  subtitle = "Connecting businesses worldwide through innovative digital solutions", 
  className = "" 
}: GlobeSectionProps) {
  return (
    <section className={`relative overflow-hidden py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Text content */}
          <div className="w-full lg:w-1/2 lg:pr-12 mb-12 lg:mb-0">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">{title}</h2>
            <p className="text-lg text-gray-300 mb-8">{subtitle}</p>
            <p className="text-gray-400">
              Our services reach clients across different time zones and markets. 
              We provide comprehensive digital solutions tailored to meet the unique 
              needs of businesses globally.
            </p>
          </div>
          
          {/* Globe visualization */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full h-[400px] md:h-[500px]">
              <WireframeGlobe 
                connectionCount={20}
                color="#9333ea" // Purple to match site theme
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 