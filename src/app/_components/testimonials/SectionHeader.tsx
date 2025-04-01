'use client'

import React from 'react'
import { bangers, gudeaBold } from '@ui/fonts'

const SectionHeader = () => {
  return (
    <div className="text-center mb-10 md:mb-16">
      <h2 className={`
        text-5xl 
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
  )
}

export default SectionHeader 