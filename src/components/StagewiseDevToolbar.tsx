'use client'

import dynamic from 'next/dynamic'

const StagewiseToolbar = dynamic(
  () => import('@stagewise/toolbar-next').then((mod) => mod.StagewiseToolbar),
  { ssr: false }
)

export default function StagewiseDevToolbar() {
  return (
    <div id="stagewise-toolbar">
      <StagewiseToolbar config={{ plugins: [] }} />
    </div>
  )
}


