'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Perfume } from '@/lib/types'
import AccordBar from './AccordBar'
import PyramidSection from './PyramidSection'
import StarRating from './StarRating'

interface PerfumeModalProps {
  perfume: Perfume | null
  onClose: () => void
}

export default function PerfumeModal({ perfume, onClose }: PerfumeModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (perfume && scrollRef.current) {
      scrollRef.current.scrollTop = 0
    }
  }, [perfume])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // خلفية فاخرة ناعمة تعتمد على ألوان الأكوردات
  const heroGradient = perfume
    ? `
      radial-gradient(ellipse 80% 60% at 50% -20%, ${perfume.main_accords[0]?.color_hex}35 0%, transparent 70%),
      radial-gradient(ellipse 60% 50% at 80% 100%, ${perfume.main_accords[1]?.color_hex || perfume.main_accords[0]?.color_hex}25 0%, transparent 60%),
      linear-gradient(180deg, oklch(0.97 0.01 80) 0%, oklch(0.94 0.015 70) 100%)
    `
    : ''

  return (
    <AnimatePresence>
      {perfume && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="
              fixed inset-3 sm:inset-6 md:inset-10 lg:inset-14 z-50
              rounded-3xl overflow-hidden
              bg-gradient-to-b from-white via-[#faf8f5] to-[#f5f1eb]
              shadow-2xl shadow-black/20
              border border-white/60
              flex flex-col
            "
            role="dialog"
            aria-modal="true"
            aria-label={`تفاصيل ${perfume.name}`}
          >
            {/* زر الإغلاق */}
            <button
              onClick={onClose}
              aria-label="إغلاق"
              className="
                absolute top-4 left-4 z-50
                w-10 h-10 rounded-full
                flex items-center justify-center
                bg-white/80 border border-black/8
                text-neutral-600 hover:text-neutral-900
                hover:bg-white hover:border-black/15
                shadow-sm backdrop-blur-sm
                transition-all duration-200 active:scale-95
              "
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* المحتوى القابل للتمرير */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto">
              
              {/* ===== Hero Section ===== */}
              <div
                className="relative pt-14 pb-8 px-5 md:px-8"
                style={{ background: heroGradient }}
              >
                {/* تأثيرات إضاءة ناعمة */}
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-40 rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ backgroundColor: perfume.main_accords[0]?.color_hex }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-10 max-w-4xl mx-auto">
                  
                  {/* صورة العطر - محسّنة جداً */}
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="relative flex-shrink-0"
                  >
                    <div className="relative w-44 sm:w-52 md:w-60 aspect-[3/4]">
                      {/* ظل ناعم تحت الزجاجة */}
                      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-6 bg-black/15 blur-xl rounded-full" />
                      
                      <Image
                        src={perfume.image_url_2x || perfume.image_url}
                        alt={perfume.name}
                        fill
                        className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                        sizes="(max-width: 768px) 208px, 240px"
                        priority
                      />
                    </div>
                  </motion.div>

                  {/* معلومات العطر */}
                  <div className="flex-1 text-center md:text-right space-y-3">
                    {/* البراند */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="flex items-center justify-center md:justify-end gap-2.5"
                    >
                      <div className="relative w-9 h-9 rounded-lg overflow-hidden bg-white shadow-sm border border-black/5">
                        <Image
                          src={perfume.brand_logo}
                          alt={perfume.brand}
                          fill
                          className="object-contain p-1.5"
                          sizes="36px"
                          onError={(e) => {
                            const t = e.target as HTMLImageElement
                            t.style.display = 'none'
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-medium tracking-[0.18em] text-amber-700/80 uppercase">
                        {perfume.brand}
                      </span>
                    </motion.div>

                    {/* اسم العطر */}
                    <motion.h1
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25, duration: 0.5 }}
                      className="text-2xl sm:text-3xl md:text-[2rem] font-bold text-neutral-800 leading-tight text-balance"
                    >
                      {perfume.name}
                    </motion.h1>

                    {/* التفاصيل */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.32, duration: 0.4 }}
                      className="flex flex-wrap items-center justify-center md:justify-end gap-2"
                    >
                      <span className="text-xs px-3 py-1 rounded-full border border-amber-600/25 text-amber-800 bg-amber-50 font-medium">
                        {perfume.gender}
                      </span>
                      <span className="text-xs text-neutral-500 font-medium">
                        {perfume.release_year}
                      </span>
                      {perfume.perfumer && (
                        <span className="text-xs text-neutral-500">
                          · {perfume.perfumer}
                        </span>
                      )}
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* ===== محتوى الجسم ===== */}
              <div className="px-5 md:px-8 pb-8 space-y-8 bg-gradient-to-b from-transparent to-[#f8f5f0]/50">
                
                {/* التقييم */}
                <section className="pt-2">
                  <StarRating value={perfume.rating_value} count={perfume.rating_count} />
                </section>

                {/* الوصف */}
                <section>
                  <SectionTitle icon="✦">الوصف</SectionTitle>
                  <p className="text-neutral-600 leading-relaxed text-sm md:text-[15px]">
                    {perfume.description}
                  </p>
                </section>

                {/* الأكوردات الرئيسية */}
                {perfume.main_accords.length > 0 && (
                  <section>
                    <SectionTitle icon="◈">أكوردات العطر الرئيسية</SectionTitle>
                    <div className="space-y-3">
                      {perfume.main_accords.map((accord, i) => (
                        <AccordBar key={accord.name} accord={accord} index={i} />
                      ))}
                    </div>
                  </section>
                )}

                {/* هرم العطر */}
                <section>
                  <SectionTitle icon="△">هرم العطر</SectionTitle>
                  <PyramidSection pyramid={perfume.pyramid} />
                </section>

                {/* صيغة المتجر */}
                {perfume.shop_formula?.available && (
                  <section>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="
                        relative rounded-2xl p-5 overflow-hidden
                        border border-amber-500/30-
                        bg-gradient-to-br from-amber-50 to-orange-50/60
                      "
                    >
                      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />

                      <div className="flex items-start gap-3.5">
                        <div className="w-11 h-11 rounded-full bg-amber-100 border border-amber-300/50 flex items-center justify-center flex-shrink-0">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-amber-700">
                            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                          </svg>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <h3 className="font-bold text-amber-900 text-sm">
                              متوفر لدينا كزيت عطري مركّز
                            </h3>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">
                              حصري
                            </span>
                          </div>
                          <p className="text-xs text-neutral-600 mb-2">
                            تركيبتنا الخاصة من هذا العطر — زيت عطري خالص بنسبة تركيز
                            <span className="text-amber-800 font-bold mx-1">
                              {perfume.shop_formula.oil_percentage}
                            </span>
                          </p>
                          {perfume.shop_formula.notes && (
                            <p className="text-xs text-neutral-500 leading-relaxed border-t border-amber-200/60 pt-2 mt-2">
                              {perfume.shop_formula.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </section>
                )}

                {/* العطّار */}
                {perfume.noses && perfume.noses.length > 0 && (
                  <section className="pb-2">
                    <SectionTitle icon="◉">العطّار</SectionTitle>
                    <div className="flex flex-wrap gap-2">
                      {perfume.noses.map((nose) => (
                        <span
                          key={nose}
                          className="text-xs px-3 py-1.5 rounded-full border border-neutral-200 text-neutral-600 bg-white shadow-sm"
                        >
                          {nose}
                        </span>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      {icon && <span className="text-amber-600 text-xs">{icon}</span>}
      <h2 className="text-sm font-bold tracking-widest text-amber-800/90 uppercase">
        {children}
      </h2>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300/50 to-transparent" />
    </div>
  )
}