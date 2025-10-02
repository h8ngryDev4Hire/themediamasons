'use client'

import React, { useState } from 'react'
import { bangers, oswald, raleway } from '../../lib/fonts'

export default function BrandingOGClient() {
  const [showGrid, setShowGrid] = useState(false)
  const [showSafeArea, setShowSafeArea] = useState(true)

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-start p-6 pt-28 md:pt-36 gap-6">
      {/* Toolbar */}
      <div className="w-full max-w-6xl flex items-center justify-between">
        <h1 className={`${oswald.className} text-xl md:text-2xl font-bold`}>Open Graph Composition</h1>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGrid(v => !v)}
            className={`${oswald.className} px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition`}
          >
            {showGrid ? 'Hide Grid' : 'Show Grid'}
          </button>
          <button
            onClick={() => setShowSafeArea(v => !v)}
            className={`${oswald.className} px-3 py-1.5 rounded-lg border border-white/20 hover:border-white/40 transition`}
          >
            {showSafeArea ? 'Hide Safe Area' : 'Show Safe Area'}
          </button>
        </div>
      </div>

      {/* 1200x630 Canvas */}
      <div
        id="og-canvas"
        data-og-size="1200x630"
        className="relative rounded-2xl overflow-hidden shadow-2xl"
        style={{ width: 1200, height: 630 }}
      >
        {/* Background gradient and glow accents */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        <div className="pointer-events-none absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] opacity-50"
             style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.8) 0%, rgba(124,58,237,0) 70%)' }}
        />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-60"
             style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.8) 0%, rgba(249,115,22,0) 70%)' }}
        />
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-1/3 w-72 h-72 rounded-full blur-[100px] opacity-50"
             style={{ background: 'radial-gradient(circle, rgba(9,212,8,0.7) 0%, rgba(9,212,8,0) 70%)' }}
        />

        {/* Border ring */}
        <div className="absolute inset-0 rounded-2xl border border-white/10" />

        {/* Content */}
        <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-20">
          <div className="mb-4">
            <span className={`${bangers.className} text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-media-mason-purple via-media-mason-orange to-media-mason-green text-transparent bg-clip-text drop-shadow-[0_4px_12px_rgba(124,58,237,0.25)]`}> 
              THE MEDIA MASONS
            </span>
          </div>

          <p className={`${raleway.className} text-2xl md:text-[28px] text-white/90 max-w-3xl leading-snug`}> 
            Professional web development and digital solutions that help your business grow.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="h-[1px] w-16 bg-white/20" />
            <span className={`${oswald.className} text-lg tracking-wide text-white/80`}>
              themediamasons.com
            </span>
            <span className="h-[1px] w-16 bg-white/20" />
          </div>
        </div>

        {/* Grid overlay */}
        {showGrid && (
          <GridOverlay />
        )}

        {/* Safe area (approx. 60px inset) */}
        {showSafeArea && (
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-[60px] rounded-xl border border-white/30" />
          </div>
        )}
      </div>

      {/* Capture tips */}
      <div className="w-full max-w-6xl mt-2">
        <p className={`${raleway.className} text-sm text-white/60`}>
          Tip: Set browser zoom so this canvas displays at 1200×630 px, then take a screenshot. Keep critical text inside the safe area.
        </p>
      </div>
    </div>
  )
}

function GridOverlay() {
  // 60px cell size grid for alignment
  const size = 60
  const cols = Math.floor(1200 / size)
  const rows = Math.floor(630 / size)

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={1200}
      height={630}
      viewBox={`0 0 1200 630`}
    >
      <defs>
        <pattern id="grid" width={size} height={size} patternUnits="userSpaceOnUse">
          <path d={`M ${size} 0 L 0 0 0 ${size}`} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="1200" height="630" fill="url(#grid)" />
      {/* Center crosshairs */}
      <line x1="600" y1="0" x2="600" y2="630" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="0" y1="315" x2="1200" y2="315" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
    </svg>
  )
}


