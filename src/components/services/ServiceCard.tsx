'use client'

import { oswald, raleway } from '../../lib/fonts'
import { Code, Globe, Paintbrush } from 'lucide-react'
import { LucideIcon } from 'lucide-react'

interface ServiceCardProps {
  id?: string;
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export default function ServiceCard({ id, title, description, icon }: ServiceCardProps) {
  return (
    <div 
      id={id} 
      className="relative overflow-hidden backdrop-blur-lg p-7 rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-lg bg-gradient-to-br from-zinc-800/40 to-zinc-700/30 border border-white/10 shadow-md h-[280px] w-full flex"
    >
      {/* Dark tinted glass effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/30 to-black/20 backdrop-blur-xl rounded-xl"></div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col h-full w-full card-hover">
        {icon && (
          <div className="mb-4 text-purple-400 icon-glow">
            {icon}
          </div>
        )}
        <h3 className={`${oswald.className} text-2xl font-extrabold mb-4 text-white`}>
          {title}
        </h3>
        <p className={`${raleway.className} text-base font-semibold tracking-wide leading-relaxed text-white`}>
          {description}
        </p>
      </div>
    </div>
  )
} 