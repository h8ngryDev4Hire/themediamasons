'use client'

import React from 'react'
import { Sanity } from '@def/definitions'
import TestimonialCard from '@components/common/testimonials/TestimonialCard'
import MoreComingSoonCard from './MoreComingSoonCard'

type DesktopTestimonialsProps = {
  testimonials: Sanity.Testimonial[]
  currentIndex: number
  goToSlide: (index: number) => void
}

const DesktopTestimonials: React.FC<DesktopTestimonialsProps> = ({ 
  testimonials, 
  currentIndex, 
  goToSlide 
}) => {
  const desktopItemsPerPage = 3
  const totalDesktopPages = Math.ceil(testimonials.length / desktopItemsPerPage)
  
  // Get current testimonials for desktop view (md-lg)
  const getCurrentDesktopTestimonials = () => {
    const startIndex = currentIndex * desktopItemsPerPage
    return testimonials.slice(startIndex, startIndex + desktopItemsPerPage)
  }

  return (
    <div className="hidden md:block w-full max-w-7xl px-4">
      {/* Column layout for md-lg screens */}
      <div className="xl:hidden flex flex-col space-y-6">
        {getCurrentDesktopTestimonials().map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
        
        {/* Show "More Coming Soon" if there are fewer than 3 testimonials on the current page 
            and it's the last page */}
        {getCurrentDesktopTestimonials().length < desktopItemsPerPage && 
          currentIndex === totalDesktopPages - 1 && (
          <MoreComingSoonCard />
        )}
      </div>

      {/* Grid layout for xl+ screens */}
      <div className="hidden xl:grid grid-cols-3 grid-rows-2 gap-6 auto-rows-fr">
        {testimonials.slice(0, 6).map((testimonial) => (
          <TestimonialCard key={testimonial._id} testimonial={testimonial} />
        ))}
        
        {/* Show only one "More Coming Soon" card if fewer than 6 testimonials */}
        {testimonials.length < 6 && <MoreComingSoonCard key="coming-soon" />}
      </div>
      
      {/* Desktop navigation controls - only for md-lg screens */}
      {totalDesktopPages > 1 && (
        <div className="xl:hidden flex justify-center mt-8 space-x-3">
          {Array.from({ length: totalDesktopPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-4 h-4 rounded-full transition-all ${
                currentIndex === index 
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to testimonial set ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default DesktopTestimonials 