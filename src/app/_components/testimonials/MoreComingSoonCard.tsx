'use client'

import React from 'react'
import { bangers, gudeaBold } from '@ui/fonts'

const MoreComingSoonCard = () => (
  <div 
   className={`
   relative p-6 
   bg-gradient-to-br from-purple-900/30 to-indigo-900/30 
   backdrop-blur-sm 
   border border-purple-500/20 
   rounded-xl shadow-lg 
   min-h-[320px] sm:min-h-[280px] 
   min-w-[300px] sm:min-w-[280px] 
   h-full 
   transform transition-all duration-300 
   hover:scale-[1.02] hover:shadow-xl
   flex flex-col items-center justify-center
  `}>
    {/* Decorative elements */}
    <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-70 blur-lg"></div>
    <div className="absolute -bottom-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-70 blur-lg"></div>
    
    <div className="flex flex-col items-center justify-center h-full py-8">
      <h3 className={`text-xl sm:text-2xl mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 ${bangers.className} text-center`}>
        More Testimonials Coming Soon!
      </h3>
      
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 rounded mb-4"></div>
      
      <p className={`text-gray-300 mb-4 text-center ${gudeaBold.className}`}>
        We're collecting more feedback from our amazing clients.
      </p>
      
      {/* Status indicator with animated dots */}
      <div className="relative">
        <span className={`text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 ${gudeaBold.className}`}>
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
);

export default MoreComingSoonCard 