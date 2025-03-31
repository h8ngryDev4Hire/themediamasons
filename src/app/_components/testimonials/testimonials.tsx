'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Sanity } from '@def/definitions'
import { FetchRequest, UnknownResponse } from '@def/routes.ts'
import TestimonialCard from '@components/common/testimonials/TestimonialCard'
import { useReveal } from '@lib/hooks/useReveal'
import { bangers, gudeaBold } from '@ui/fonts'

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Sanity.Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sectionRef, revealed] = useReveal({
    threshold: 0.1
  })
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  // Fetch testimonials from API
  useEffect(() => {
    (async () => {
      try {
        const payload: FetchRequest = {
          content: 'testimonial'
        }

        const response = await fetch('/api/fetch/', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        })

        const data: UnknownResponse = await response.json()

        if (!response.ok || !data.successful) {
          throw new Error(data.error || 'Failed to fetch testimonials')
        }

        const testimonialData: Sanity.Testimonial[] = data.data

        if (!testimonialData || testimonialData.length === 0) {
          // No testimonials found, setTestimonials to empty array
          setTestimonials([])
        } else {
          setTestimonials(testimonialData)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        
        // Set to empty array on error instead of using placeholders
        setTestimonials([])
        setLoading(false)
      }
    })()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    if (testimonials.length === 0) return; // Don't run carousel if no testimonials
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Render coming soon content if no testimonials
  const renderComingSoon = () => (
    <div className="w-full max-w-3xl mx-auto text-center">
      <div className="relative p-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-sm border border-purple-500/20 rounded-xl shadow-lg">
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 blur-lg"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-70 blur-lg"></div>
        
        <h3 className={`text-2xl sm:text-3xl md:text-4xl mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ${bangers.className}`}>
          Client Testimonials Coming Soon!
        </h3>
        
        <div className="w-32 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded mb-6"></div>
        
        <p className={`text-gray-300 mb-6 max-w-xl mx-auto ${gudeaBold.className}`}>
          We're collecting feedback from our amazing clients. Check back soon to hear their success stories.
        </p>
        
        {/* Replacing button-like design with a decorative status indicator */}
        <div className="flex flex-col items-center">
          <div className="text-gray-400 mb-2">
            <span className={`text-sm italic ${gudeaBold.className}`}>Status</span>
          </div>
          <div className="relative">
            <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 text-lg ${gudeaBold.className}`}>
              Stay Tuned
            </span>
            <span className="inline-flex ml-1">
              <span className="animate-pulse text-purple-500 opacity-75" style={{ animationDelay: '0ms' }}>.</span>
              <span className="animate-pulse text-pink-500 opacity-75" style={{ animationDelay: '300ms' }}>.</span>
              <span className="animate-pulse text-indigo-500 opacity-75" style={{ animationDelay: '600ms' }}>.</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section 
      id="testimonials" 
      ref={sectionRef}
      className={`
        w-full py-12 md:py-20
        flex flex-col items-center
        transition-all duration-1000 ease-in-out
        ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
      `}
    >
      <div className="text-center mb-10 md:mb-16">
        <h2 className={`
          text-3xl md:text-4xl lg:text-5xl 
          font-bold mb-4
          bg-clip-text text-transparent 
          bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
          ${bangers.className}
        `}>
          What Our Clients Say
        </h2>
        <p className={`text-gray-300 max-w-2xl mx-auto text-2xl ${gudeaBold.className}`}>
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </p>
      </div>

      {testimonials.length === 0 ? (
        renderComingSoon()
      ) : (
        <>
          {/* Mobile view - Single carousel */}
          <div className="md:hidden w-full px-4 pb-8">
            <div className="relative w-full">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial._id}
                  ref={(el) => {
                    if (itemsRef.current) {
                      itemsRef.current[index] = el;
                    }
                  }}
                  className={`
                    transition-all duration-500 ease-in-out
                    ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 absolute top-0 left-0 z-0'}
                  `}
                >
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
            
            {/* Dots for mobile carousel */}
            <div className="flex justify-center mt-4 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentIndex === index ? 'bg-purple-500 scale-125' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Desktop view - Grid layout */}
          <div className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 w-full max-w-7xl px-4">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial._id} testimonial={testimonial} />
            ))}
          </div>
        </>
      )}
    </section>
  )
}

export default TestimonialsSection 