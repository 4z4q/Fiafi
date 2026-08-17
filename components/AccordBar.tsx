'use client'

import { useEffect, useRef, useState } from 'react'
import type { MainAccord } from '@/lib/types'

interface AccordBarProps {
  accord: MainAccord
  index: number
}

export default function AccordBar({ accord, index }: AccordBarProps) {
  const [width, setWidth] = useState(0)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(accord.intensity_percent)
          }, index * 80)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [accord.intensity_percent, index])

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{accord.name}</span>
        <span className="text-xs text-muted-foreground font-mono">{accord.intensity_percent}%</span>
      </div>
      <div className="h-2.5 rounded-full bg-surface overflow-hidden border border-gold/10">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${width}%`,
            backgroundColor: accord.color_hex,
            transitionDelay: `${index * 80}ms`,
            boxShadow: `0 0 8px ${accord.color_hex}80`,
          }}
        />
      </div>
    </div>
  )
}
