'use client'

interface SpacerProps {
  height?: string;
}

export default function Spacer({ height = "100px" }: SpacerProps) {
  return <div className="w-full snap-start" style={{ height }} />
} 