'use client'

import React, { ReactNode, useState } from 'react'
import { bangers } from "@ui/fonts"

interface InfoContent {
  title?: string;
  description?: string;
}

interface Box3DProps {
  children: ReactNode
  width?: number
  height?: number
  className?: string
  info?: InfoContent
}

export default function Box3D({ 
  children, 
  width = 300, 
  height = 300,
  className = "",
  info = {
    title: "",
    description: ""
  }
}: Box3DProps) {
  const [showInfo, setShowInfo] = useState(false);

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div 
      className={`bg-black/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 overflow-hidden transform transition-all duration-500 hover:shadow-xl cursor-pointer relative ${className} ${showInfo ? 'scale-[1.05] border-purple-500/40' : 'hover:scale-[1.05]'}`}
      style={{ height: `${height}px` }}
      onClick={toggleInfo}
    >
      <div 
        className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${showInfo ? 'opacity-0 scale-90' : 'opacity-100'}`}
        style={{ width: `${width}px`, height: `${height}px`, margin: 'auto' }}
      >
        {children}
      </div>

      <div 
        className={`absolute inset-0 w-full h-full flex flex-col justify-center p-6 transition-all duration-500 ${showInfo ? 'opacity-100 scale-100' : 'opacity-0 scale-110 pointer-events-none'}`}
      >
        <h3 className={`text-xl md:text-2xl font-bold text-white mb-4 ${bangers.className}`}>
          {info.title}
        </h3>
        <p className="text-gray-300 text-base">
          {info.description}
        </p>
        <div className="mt-4 text-sm text-purple-300">
          Click to {showInfo ? 'view 3D' : 'learn more'}
        </div>
      </div>
    </div>
  )
} 