'use client'

import React from 'react'
import DigitalDnaHelix from './digitalDnaHelix'

interface HelixSectionProps {
  title?: string
  subtitle?: string
  className?: string
}

export default function DnaHelixSection({ 
  title = "Digital Transformation DNA", 
  subtitle = "Building blocks of digital innovation and growth", 
  className = "" 
}: HelixSectionProps) {
  return (
    <section className={`relative overflow-hidden py-20 ${className}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* DNA Helix visualization */}
          <div className="w-full lg:w-1/2 flex justify-center order-2 lg:order-1">
            <div className="w-full h-[400px] md:h-[500px]">
              <DigitalDnaHelix 
                primaryColor="#6d28d9"
                secondaryColor="#f472b6"
                backgroundColor="#030712"
                ribbonCount={2}
              />
            </div>
          </div>
          
          {/* Text content */}
          <div className="w-full lg:w-1/2 lg:pl-12 mb-12 lg:mb-0 order-1 lg:order-2">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-white">{title}</h2>
            <p className="text-lg text-gray-300 mb-8">{subtitle}</p>
            <p className="text-gray-400">
              Our digital solutions are built on core principles that form the DNA of successful 
              transformation. Each component connects and builds upon the others, creating 
              a resilient structure that adapts to your business needs and evolves with technology.
            </p>
            <div className="mt-8">
              <h3 className="text-xl text-white mb-4">Key Elements:</h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">1</span>
                  </div>
                  <span>Strategic planning and analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">2</span>
                  </div>
                  <span>Customized implementation</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-purple-600 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">3</span>
                  </div>
                  <span>Continuous optimization</span>
                </li>
                <li className="flex items-start">
                  <div className="h-6 w-6 rounded-full bg-pink-600 flex items-center justify-center mr-3 mt-0.5">
                    <span className="text-white text-sm">4</span>
                  </div>
                  <span>Data-driven evolution</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 