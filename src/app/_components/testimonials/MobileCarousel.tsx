'use client'

import React, { useRef } from 'react'
import { Sanity } from '@def/definitions'
import TestimonialCard from '@components/common/testimonials/TestimonialCard'
import MoreComingSoonCard from './MoreComingSoonCard'

type MobileCarouselProps = {
  testimonials: Sanity.Testimonial[]
  currentIndex: number
  goToSlide: (index: number) => void
}

const MobileCarousel: React.FC<MobileCarouselProps> = ({ 
  testimonials, 
  currentIndex,
  goToSlide 
}) => {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  return (
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
        
        {/* Show "More Coming Soon" as the last slide if testimonials are fewer than 3 */}
        {testimonials.length < 3 && (
          <div
            ref={(el) => {
              if (itemsRef.current) {
                itemsRef.current[testimonials.length] = el;
              }
            }}
            className={`
              transition-all duration-500 ease-in-out
              ${testimonials.length === currentIndex ? 'opacity-100 z-10' : 'opacity-0 absolute top-0 left-0 z-0'}
            `}
          >
            <MoreComingSoonCard />
          </div>
        )}
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
        
        {/* Add one more dot for the "More Coming Soon" card if testimonials are fewer than 3 */}
        {testimonials.length < 3 && (
          <button
            onClick={() => goToSlide(testimonials.length)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === testimonials.length ? 'bg-purple-500 scale-125' : 'bg-gray-600'
            }`}
          />
        )}
      </div>
    </div>
  )
}

export default MobileCarousel 