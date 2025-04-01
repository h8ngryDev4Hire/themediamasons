'use client'

import React, { useEffect, useState } from 'react'
import { Sanity } from '@def/definitions'
import { FetchRequest, UnknownResponse } from '@def/routes.ts'
import { useReveal } from '@lib/hooks/useReveal'
import SectionHeader from './SectionHeader'
import ComingSoonSection from './ComingSoonSection'
import MobileCarousel from './MobileCarousel'
import DesktopTestimonials from './DesktopTestimonials'

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Sanity.Testimonial[]>([])
  const [loading, setLoading] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [sectionRef, revealed] = useReveal({
    threshold: 0.1
  })



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
          // TODO: Remove this once we have real testimonials
          //setTestimonials(testimonialData)
          setTestimonials([])
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
    
    const totalDesktopPages = Math.ceil(testimonials.length / 3); // 3 items per page on desktop
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        // For mobile view (when showing "More Coming Soon" as last slide)
        if (window.innerWidth < 768 && testimonials.length < 3) {
          return (prev + 1) % (testimonials.length + 1);
        }
        // For desktop view, respect page count limits
        else if (window.innerWidth >= 768) {
          return (prev + 1) % totalDesktopPages;
        }
        // Default mobile behavior
        else {
          return (prev + 1) % testimonials.length;
        }
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

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
      <SectionHeader />

      {testimonials.length === 0 ? (
        <ComingSoonSection />
      ) : (
        <>
          <MobileCarousel 
            testimonials={testimonials} 
            currentIndex={currentIndex}
            goToSlide={goToSlide}
          />
          
          <DesktopTestimonials 
            testimonials={testimonials}
            currentIndex={currentIndex}
            goToSlide={goToSlide}
          />
        </>
      )}
    </section>
  )
}

export default TestimonialsSection 