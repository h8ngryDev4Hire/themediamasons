'use client'

import React from 'react'
import { raleway } from '../../../lib/fonts'

interface NavLinkProps {
  href: string
  isActive?: boolean
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
  children: React.ReactNode
}

export default function NavLink({ 
  href, 
  isActive, 
  onClick,
  children 
}: NavLinkProps) {  
  return (
    <a 
      href={href}
      onClick={onClick}
      className={`${raleway.className} transition duration-300 ease-in-out cursor-pointer
        ${isActive 
          ? 'text-media-mason-purple font-semibold' 
          : 'text-white hover:text-media-mason-purple'}`
      }
    >
      {children}
    </a>
  )
}