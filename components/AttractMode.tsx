'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Perfume } from '@/lib/types'

const IDLE_TIMEOUT = 30_000 // 30 seconds
const SLIDE_DURATION = 4_500 // 4.5s per slide

interface AttractModeProps {
  perfumes: Perfume[]
}

export default function AttractMode({ perfumes }: AttractModeProps) {
  const [isIdle, setIsIdle] = useState(false)
  const [currentIdx, setCurrentIdx] = useState(0)
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shuffled = useRef<Perfume[]>([])

  // Shuffle perfumes on mount
  useEffect(() => {
    shuffled.current = [...perfumes].sort(() => Math.random() - 0.5)
  }, [perfumes])

  const resetIdle = useCallback(() => {
    setIsIdle(false)
    if (idleTimer.current) clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT)
  }, [])

  useEffect(() => {
    const events = ['touchstart', 'touchmove', 'mousemove', 'mousedown', 'keydown', 'scroll', 'click']
    events.forEach(ev => window.addEventListener(ev, resetIdle, { passive: true }))
    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_TIMEOUT)
    return () => {
      events.forEach(ev => window.removeEventListener(ev, resetIdle))
      if (idleTimer.current) clearTimeout(idleTimer.current)
    }
  }, [resetIdle])

  // Carousel rotation while idle
  useEffect(() => {
    if (!isIdle) {
      if (slideTimer.current) clearTimeout(slideTimer.current)
      return
    }
    slideTimer.current = setTimeout(() => {
      setCurrentIdx(prev => (prev + 1) % Math.max(shuffled.current.length, 1))
    }, SLIDE_DURATION)
    return () => {
      if (slideTimer.current) clearTimeout(slideTimer.current)
    }
  }, [isIdle, currentIdx])

  const perfume = shuffled.current[currentIdx]

  if (!perfume) return null

  const heroGradient = `
    radial-gradient(ellipse at 60% 20%, ${perfume.main_accords[0]?.color_hex}35 0%, transparent 55%),
    radial-gradient(ellipse at 20% 80%, ${perfume.main_accords[1]?.color_hex || perfume.main_accords[0]?.color_hex}25 0%, transparent 55%),
    oklch(0.07 0.005 260)
  `

  return (
    <AnimatePresence>
      {isIdle && (
        <motion.div
          key="attract"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 overflow-hidden cursor-pointer"
          style={{ background: heroGradient }}
          onClick={resetIdle}
          aria-label="المس الشاشة للعودة"
        >
          {/* Background glow orbs */}
          <div
            className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-[80px] transition-colors duration-1000"
            style={{ backgroundColor: perfume.main_accords[0]?.color_hex }}
          />
          <div
            className="absolute bottom-1/4 left-1/3 w-72 h-72 rounded-full opacity-15 blur-[60px] transition-colors duration-1000"
            style={{ backgroundColor: perfume.main_accords[1]?.color_hex || '#C8A03C' }}
          />

          {/* Gold particles / sparkles */}
          <Sparkles />

          {/* Main content */}
          <div className="relative z-10 h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIdx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="flex flex-col md:flex-row items-center gap-8 md:gap-16 px-8 max-w-5xl mx-auto"
              >
                {/* Perfume bottle */}
                <div className="relative w-48 md:w-64 h-64 md:h-80 flex-shrink-0">
                  <Image
                    src={perfume.image_url_2x || perfume.image_url}
                    alt={perfume.name}
                    fill
                    className="object-contain drop-shadow-[0_16px_48px_rgba(0,0,0,0.6)]"
                    sizes="256px"
                    // crossOrigin="anonymous"
                  />
                </div>

                {/* Text */}
                <div className="text-center md:text-right space-y-4 flex-1">
                  <p className="text-sm font-light tracking-[0.3em] text-gold uppercase">
                    {perfume.brand}
                  </p>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground leading-tight text-balance">
                    {perfume.name}
                  </h1>
                  <p className="text-sm text-gold font-medium tracking-wide">
                    {perfume.gender}
                  </p>

                  {/* Accord dots */}
                  <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                    {perfume.main_accords.slice(0, 4).map((accord) => (
                      <div key={accord.name} className="flex flex-col items-center gap-1">
                        <div
                          className="w-4 h-4 rounded-full border border-white/20"
                          style={{
                            backgroundColor: accord.color_hex,
                            boxShadow: `0 0 12px ${accord.color_hex}80`,
                          }}
                        />
                        <span className="text-[9px] text-muted-foreground">{accord.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
            {shuffled.current.map((_, i) => (
              <div
                key={i}
                className="h-0.5 rounded-full transition-all duration-500"
                style={{
                  width: i === currentIdx ? '24px' : '8px',
                  backgroundColor: i === currentIdx ? 'oklch(0.78 0.14 82)' : 'oklch(0.78 0.14 82 / 0.3)',
                }}
              />
            ))}
          </div>

          {/* Touch hint */}
          <motion.div
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute bottom-14 left-1/2 -translate-x-1/2 text-xs text-gold/70 tracking-widest uppercase"
          >
            المس الشاشة للتصفح
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Simple floating sparkles
function Sparkles() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 4,
    dur: Math.random() * 3 + 2,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map(s => (
        <motion.div
          key={s.id}
          className="absolute rounded-full bg-gold"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
          }}
          animate={{
            opacity: [0, 0.8, 0],
            y: [0, -30, -60],
            scale: [0.5, 1, 0.2],
          }}
          transition={{
            duration: s.dur,
            delay: s.delay,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
