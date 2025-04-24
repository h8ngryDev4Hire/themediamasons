'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Sanity } from '@def/definitions'

type TestimonialCardProps = {
  testimonial: Sanity.Testimonial
  className?: string
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, className }) => {
  // Generate stars based on rating
  const renderStars = () => {
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg 
          key={i} 
          className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-400'}`}
          fill="currentColor" 
          viewBox="0 0 20 20" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    }
    return stars
  }

  // Helper to get website domain name for display
  const getDisplayUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '')
      return domain
    } catch (e) {
      return url
    }
  }

  return (
    <div
      className={`
        bg-black/40 backdrop-blur-sm
        border border-purple-500/20
        rounded-xl p-6 shadow-lg
        transform transition-all duration-300 
        hover:scale-[1.03] hover:shadow-xl
        hover:border-purple-500/50
        flex flex-col
        min-h-[320px] sm:min-h-[280px] 
        min-w-[300px] sm:min-w-[280px] 
        h-full
        relative
        group
        ${className || ''}
      `}
    >
      {/* Subtle hover effect without text */}
      <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all duration-300 rounded-xl"></div>
      
      <div className="flex items-center mb-4 relative z-10">
        {testimonial.imageUrl ? (
          <div className="relative h-12 w-12 mr-4 overflow-hidden rounded-full border border-purple-500/30 group-hover:border-purple-500/60 transition-all duration-300">
            <Image
              src={testimonial.imageUrl}
              alt={testimonial.name}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div className="min-h-12 min-w-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-500 mr-4 flex items-center justify-center text-white font-bold text-xl group-hover:from-purple-500 group-hover:to-blue-400 transition-all duration-300">
            {testimonial.name.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-all duration-300">{testimonial.name}</h3>
          {testimonial.position && (
            <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-all duration-300">{testimonial.position}</p>
          )}
        </div>
      </div>
      <div className="flex mb-4 relative z-10">{renderStars()}</div>
      <blockquote className="text-gray-300 font-light italic mb-4 flex-grow relative z-10 group-hover:text-gray-200 transition-all duration-300">
        "{testimonial.quote}"
      </blockquote>
      
      {/* Website URL link at the bottom of the card */}
      <div className="mt-auto z-30 relative">
        <Link 
          href={testimonial.websiteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-flex items-center gap-2 
            text-sm text-purple-400 hover:text-purple-300 
            transition-all duration-300
            group-hover:translate-x-1
          "
          onClick={(e) => e.stopPropagation()}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
            />
          </svg>
          <span>{getDisplayUrl(testimonial.websiteUrl)}</span>
        </Link>
      </div>
      
      {/* Separate link component that sits on top of the card - only when sourceUrl is available */}
      {testimonial.sourceUrl && (
        <Link 
          href={testimonial.sourceUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="absolute inset-0 z-20 cursor-pointer"
          aria-label={`View testimonial from ${testimonial.name}`}
        />
      )}
    </div>
  )
}

export default TestimonialCard 