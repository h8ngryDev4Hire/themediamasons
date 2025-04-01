'use client'

import React from 'react'
import { bangers, gudeaBold } from '@ui/fonts'

const ComingSoonSection = () => (
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

export default ComingSoonSection 