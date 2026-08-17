'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Perfume } from '@/lib/types'

interface PyramidSectionProps {
  pyramid: Perfume['pyramid']
}

const PYRAMID_ORDER = ['الإفتتاحية', 'قلب العطر', 'المكونات الأساسية'] as const

const LEVEL_STYLES = {
  'الإفتتاحية': {
    label: 'الإفتتاحية',
    sublabel: 'Top Notes',
    widthClass: 'w-2/3',
    borderColor: 'border-[#A8D8EA]/50',
    bgColor: 'bg-[#A8D8EA]/10',
    icon: '✦',
  },
  'قلب العطر': {
    label: 'قلب العطر',
    sublabel: 'Heart Notes',
    widthClass: 'w-5/6',
    borderColor: 'border-gold/40',
    bgColor: 'bg-gold/8',
    icon: '❧',
  },
  'المكونات الأساسية': {
    label: 'المكونات الأساسية',
    sublabel: 'Base Notes',
    widthClass: 'w-full',
    borderColor: 'border-[#C4A882]/50',
    bgColor: 'bg-[#C4A882]/10',
    icon: '◆',
  },
}

export default function PyramidSection({ pyramid }: PyramidSectionProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      {PYRAMID_ORDER.map((level, levelIdx) => {
        const notes = pyramid[level]
        if (!notes || notes.length === 0) return null
        const style = LEVEL_STYLES[level]

        return (
          <motion.div
            key={level}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: levelIdx * 0.15, duration: 0.5, ease: 'easeOut' }}
            className={`${style.widthClass} border ${style.borderColor} ${style.bgColor} rounded-2xl p-4 backdrop-blur-sm`}
          >
            {/* Level label */}
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-gold tracking-widest uppercase">
                {style.icon} {style.label}
              </span>
              <p className="text-[10px] text-muted-foreground mt-0.5">{style.sublabel}</p>
            </div>

            {/* Notes */}
            <div className="flex flex-wrap justify-center gap-3">
              {notes.map((note, noteIdx) => (
                <motion.div
                  key={note.note}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: levelIdx * 0.15 + noteIdx * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center gap-1.5"
                >
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/20 bg-surface relative">
                    <Image
                      src={note.image}
                      alt={note.note}
                      fill
                      className="object-cover"
                      sizes="48px"
                      // crossOrigin="anonymous"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </div>
                  <span className="text-[11px] text-center text-muted-foreground max-w-[60px] leading-tight">
                    {note.note}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )
      })}
    </div>
  )
}
