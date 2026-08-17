'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Perfume } from '@/lib/types'

interface PerfumeCardProps {
  perfume: Perfume
  index: number
  onClick: () => void
  layoutId: string
}

function ImageSkeleton() {
  return (
    <div className="absolute inset-0 skeleton-shimmer" />
  )
}

export default function PerfumeCard({ perfume, index, onClick, layoutId }: PerfumeCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false)
  const topAccords = perfume.main_accords.slice(0, 3)

  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="group cursor-pointer relative"
    >
      <div
        className="
          relative overflow-hidden rounded-2xl border border-gold/15
          bg-surface transition-all duration-400 ease-in-out
          hover:border-gold/50 hover:shadow-[0_0_32px_rgba(200,160,60,0.18)]
          active:border-gold/60
        "
      >
        {/* Image area */}
        <div className="relative aspect-[3/4] overflow-hidden">
          {!imgLoaded && <ImageSkeleton />}
          <Image
            src={perfume.image_url}
            alt={perfume.name}
            fill
            className={`object-contain transition-all  duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
            // sizes="(max-width: 768px) 50vw, 25vw"
            onLoad={() => setImgLoaded(true)}
            // crossOrigin="anonymous"
          />

          {/* Gender badge */}
          <div className="absolute top-2 right-2 z-10">
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-background/70 border border-gold/30 text-gold-light backdrop-blur-sm">
              {perfume.gender}
            </span>
          </div>

          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
        </div>

        {/* Card footer */}
        <div className="p-3 space-y-2">
          {/* Brand */}
          <p className="text-[11px] font-light tracking-widest text-muted-foreground uppercase">
            {perfume.brand}
          </p>

          {/* Name */}
          <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2 text-balance">
            {perfume.name}
          </h3>

          {/* Accord color dots */}
          <div className="flex items-center gap-1.5 pt-1">
            {topAccords.map((accord) => (
              <div key={accord.name} className="flex items-center gap-1">
                <div
                  className="w-2.5 h-2.5 rounded-full border border-white/10 shadow-sm flex-shrink-0"
                  style={{ backgroundColor: accord.color_hex }}
                  title={accord.name}
                />
              </div>
            ))}
            {topAccords.length > 0 && (
              <div
                className="h-1.5 rounded-full flex-1 overflow-hidden"
                style={{
                  background: `linear-gradient(to left, ${topAccords.map(a => a.color_hex).join(', ')})`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
