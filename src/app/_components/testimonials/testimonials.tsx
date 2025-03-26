'use client'

import React, { useRef, useEffect, useState } from 'react'
import { Sanity } from '@def/definitions'
import { FetchRequest, UnknownResponse } from '@def/routes.ts'
import TestimonialCard from '@components/common/testimonials/TestimonialCard'
import { useReveal } from '@lib/hooks/useReveal'

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
          // Fallback placeholders if no data from API
          setTestimonials([
            {
              _id: '1',
              name: 'John Doe',
              position: 'CEO, TechCorp',
              quote: 'The Media Masons transformed our online presence with their exceptional web design and development skills.',
              rating: 5
            },
            {
              _id: '2',
              name: 'Jane Smith',
              position: 'Marketing Director, CreativeAgency',
              quote: 'Their attention to detail and creative approach made our project stand out from the competition.',
              rating: 5
            },
            {
              _id: '3',
              name: 'Mark Johnson',
              position: 'Founder, StartupX',
              quote: 'Working with The Media Masons was a game-changer for our brand. Highly recommended!',
              rating: 4
            }
          ])
        } else {
          setTestimonials(testimonialData)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Error fetching testimonials:', error)
        
        // Use fallback data on error
        setTestimonials([
          {
            _id: '1',
            name: 'John Doe',
            position: 'CEO, TechCorp',
            quote: 'The Media Masons transformed our online presence with their exceptional web design and development skills.',
            rating: 5
          },
          {
            _id: '2',
            name: 'Jane Smith',
            position: 'Marketing Director, CreativeAgency',
            quote: 'Their attention to detail and creative approach made our project stand out from the competition.',
            rating: 5
          },
          {
            _id: '3',
            name: 'Mark Johnson',
            position: 'Founder, StartupX',
            quote: 'Working with The Media Masons was a game-changer for our brand. Highly recommended!',
            rating: 4
          }
        ])
        
        setLoading(false)
      }
    })()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (testimonials.length || 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Manual navigation
  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }


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
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 mb-4">
          What Our Clients Say
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </p>
      </div>

      {/* Mobile view - Single carousel */}
      <div className="md:hidden w-full px-4 pb-8">
        <div className="relative w-full">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial._id}
              ref={el => itemsRef.current[index] = el}
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
    </section>
  )
}

export default TestimonialsSection 