'use client'

import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Search, X } from 'lucide-react'
import type { Perfume } from '@/lib/types'
import PerfumeCard from './PerfumeCard'
import PerfumeModal from './PerfumeModal'
import ThemeToggle from './ThemeToggle'

interface GalleryProps { perfumes: Perfume[] }
const GENDERS = ['الكل', 'للنساء', 'للرجال', 'للجنسين']

export default function Gallery({ perfumes }: GalleryProps) {
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('الكل')
  const [selectedGender, setSelectedGender] = useState('الكل')
  const [activePerfume, setActivePerfume] = useState<Perfume | null>(null)
  const brandScrollRef = useRef<HTMLDivElement>(null)

  const brands = useMemo(() => ['الكل', ...Array.from(new Set(perfumes.map((p) => p.brand)))], [perfumes])
  const heroPerfume = perfumes[0]
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return perfumes.filter((p) => {
      const matchSearch = !q || p.name.toLowerCase().includes(q) || p.name_arabic_variants.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      return matchSearch && (selectedBrand === 'الكل' || p.brand === selectedBrand) && (selectedGender === 'الكل' || p.gender === selectedGender)
    })
  }, [perfumes, search, selectedBrand, selectedGender])

  const resetFilters = () => { setSearch(''); setSelectedBrand('الكل'); setSelectedGender('الكل') }

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          <a href="#top" className="group flex items-center gap-3" aria-label="فيافي الرئيسية">
            <span className="font-display text-2xl font-bold tracking-[0.18em] text-primary">فيافي</span>
            <span className="hidden border-r border-border pr-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:block">PERFUMERY</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex" aria-label="التنقل الرئيسي">
            <a className="transition-colors hover:text-primary" href="#collection">المجموعة</a>
          </nav>
          <div className="flex items-center gap-3"><span className="hidden text-xs text-muted-foreground lg:block">{filtered.length} عطر</span><ThemeToggle /></div>
        </div>
      </header>

      <main id="top">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-20 pt-14 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="order-2 lg:order-1">
            <p className="mb-5 text-xs font-semibold tracking-[0.28em] text-primary">عطور تُشبهك</p>
            <h1 className="max-w-xl font-display text-5xl font-light leading-[1.2] text-pretty sm:text-6xl lg:text-7xl">اكتشف عطرك،<br /><span className="font-bold text-primary">اكتب حضورك.</span></h1>
            <p className="mt-7 max-w-md text-base leading-8 text-muted-foreground">مجموعة مختارة من أرقى العطور العالمية، صُممت لترافق لحظاتك وتترك أثرًا لا يُنسى.</p>
            <div className="mt-9 flex flex-wrap items-center gap-4"><a href="#collection" className="inline-flex items-center gap-3 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5">تصفّح المجموعة <ArrowLeft data-icon="inline-start" /></a></div>
            <div className="mt-14 flex gap-10 border-t border-border pt-5"><div><p className="font-display text-2xl text-primary">{perfumes.length}+</p><p className="mt-1 text-xs text-muted-foreground">عطر مختار</p></div><div><p className="font-display text-2xl text-primary">{brands.length - 1}+</p><p className="mt-1 text-xs text-muted-foreground">ماركة عالمية</p></div></div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9 }} className="relative order-1 min-h-[420px] overflow-hidden rounded-[2rem] bg-secondary lg:order-2 lg:min-h-[560px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,hsl(var(--primary)/0.18),transparent_58%)]" />
            <div className="absolute right-7 top-7 text-[10px] tracking-[0.32em] text-primary">FIAFI / 2024</div>
            <div className="absolute bottom-8 left-8 text-xs tracking-[0.18em] text-muted-foreground">THE ART OF SCENT</div>
            {heroPerfume && <button onClick={() => setActivePerfume(heroPerfume)} className="absolute inset-16 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"><img src={heroPerfume.image_url} alt={heroPerfume.name} className="h-[78%] w-[78%] object-contain drop-shadow-[0_26px_24px_hsl(var(--primary)/0.2)] transition-transform duration-700 hover:scale-105" /></button>}
          </motion.div>
        </section>

        <section id="collection" className="bg-secondary/50"><div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end"><div><p className="text-xs tracking-[0.22em] text-primary">THE COLLECTION</p><h2 className="mt-3 font-display text-4xl font-semibold">اختيارات فيافي</h2></div><div className="relative w-full max-w-sm"><Search className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" /><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ابحث عن عطر أو ماركة..." aria-label="ابحث عن عطر أو ماركة" className="h-11 w-full rounded-full border border-border bg-background pr-10 pl-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />{search && <button onClick={() => setSearch('')} aria-label="مسح البحث" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"><X /></button>}</div></div><div className="flex items-center gap-2 overflow-x-auto py-6" ref={brandScrollRef} style={{ scrollbarWidth: 'none' }}>{GENDERS.map((g) => <button key={g} onClick={() => setSelectedGender(g)} className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${selectedGender === g ? 'bg-primary text-primary-foreground' : 'border border-border text-muted-foreground hover:border-primary hover:text-primary'}`}>{g}</button>)}<span className="mx-2 h-5 w-px bg-border" />{brands.map((brand) => <button key={brand} onClick={() => setSelectedBrand(brand)} className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${selectedBrand === brand ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-primary'}`}>{brand}</button>)}</div>{filtered.length === 0 ? <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center"><p className="text-sm text-muted-foreground">لا توجد عطور تطابق البحث</p><button onClick={resetFilters} className="text-xs text-primary underline underline-offset-4">إعادة ضبط الفلاتر</button></div> : <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">{filtered.map((perfume, i) => <PerfumeCard key={perfume.name + perfume.brand} perfume={perfume} index={i} layoutId={`perfume-${perfume.name}`} onClick={() => setActivePerfume(perfume)} />)}</div>}<p className="mt-8 text-center text-xs text-muted-foreground">عرض {filtered.length} من {perfumes.length} عطر</p></div></section>

        <section className="bg-primary text-primary-foreground"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 sm:flex-row sm:items-center lg:px-8"><div><p className="text-xs tracking-[0.25em] opacity-70">A SCENT TO REMEMBER</p><h2 className="mt-3 font-display text-3xl font-semibold">ابدأ حكايتك من هنا.</h2></div><a href="#collection" className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5">اكتشف العطور <ArrowLeft data-icon="inline-start" /></a></div></section>
      </main>
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8"><span className="font-display text-lg font-bold text-primary">فيافي</span><span>عطور تُشبهك، حضور لا يُنسى.</span><span>© 2024 FIAFI</span></footer>
      <PerfumeModal perfume={activePerfume} onClose={() => setActivePerfume(null)} />
    </div>
  )
}
