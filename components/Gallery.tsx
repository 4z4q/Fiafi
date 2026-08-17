"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import type { Perfume } from "@/lib/types";
import PerfumeCard from "./PerfumeCard";
import PerfumeModal from "./PerfumeModal";
import ThemeToggle from "./ThemeToggle";

interface GalleryProps {
  perfumes: Perfume[];
}

const GENDERS = ["الكل", "للنساء", "للرجال", "للجنسين"];

export default function Gallery({ perfumes }: GalleryProps) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("الكل");
  const [selectedGender, setSelectedGender] = useState("الكل");
  const [activePerfume, setActivePerfume] = useState<Perfume | null>(null);
  const brandScrollRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(() => {
    const unique = Array.from(new Set(perfumes.map((p) => p.brand)));
    return ["الكل", ...unique];
  }, [perfumes]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return perfumes.filter((p) => {
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.name_arabic_variants.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q);
      const matchBrand = selectedBrand === "الكل" || p.brand === selectedBrand;
      const matchGender =
        selectedGender === "الكل" || p.gender === selectedGender;
      return matchSearch && matchBrand && matchGender;
    });
  }, [perfumes, search, selectedBrand, selectedGender]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* ===== HEADER ===== */}
      <header className="flex-shrink-0 glass-heavy border-b border-gold/15 z-30 sticky top-0">
        {/* الصف الرئيسي: شعار + بحث + مبدّل الثيم
            - جوال: عمودي (شعار/مبدّل بصف، ثم بحث بصف مستقل)
            - سطح المكتب: صف أفقي واحد، البحث يتمدد بالنص */}
        <div className="flex flex-col md:flex-row md:items-center gap-3 px-4 md:px-6 pt-3">
          <div className="flex items-center justify-between md:justify-start gap-3 md:flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex-shrink-0 flex items-center gap-2 gold-pulse rounded-xl px-3 py-1.5 border border-gold/30"
            >
              <span className="text-gold text-lg leading-none">◈</span>
              <div>
                <p className="text-xs font-bold text-gold tracking-[0.15em] uppercase leading-none">
                  فيافي
                </p>
                <p className="text-[10px] font-light text-gold/60 tracking-[0.1em] leading-none mt-0.5">
                  زيوت عطرية
                </p>
              </div>
            </motion.div>

            {/* بالجوال: مبدّل الثيم بجانب الشعار مباشرة. بسطح المكتب: يترحّل لآخر الصف */}
            <div className="md:hidden">
              <ThemeToggle />
            </div>
          </div>

          {/* البحث */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 relative order-3 md:order-none"
          >
            <div className="relative">
              <svg
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gold/50 pointer-events-none"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="ابحث عن عطر أو ماركة..."
                aria-label="ابحث عن عطر أو ماركة"
                className="
                  w-full h-11 pr-10 pl-4 rounded-xl
                  bg-surface border border-gold/20
                  text-foreground placeholder:text-muted-foreground
                  text-sm focus:outline-none focus:border-gold/60 focus:ring-2 focus:ring-gold/20 focus:bg-surface-hover
                  transition-all duration-300
                "
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="مسح البحث"
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>
          </motion.div>

          {/* مبدّل الثيم بسطح المكتب: نهاية الصف */}
          <div className="hidden md:block flex-shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* صف الفلاتر: جنس (segmented control) + ماركات (تمرير أفقي) */}
        <div
          className="flex items-center gap-3 px-4 md:px-6 py-3 overflow-x-auto scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {/* فلتر الجنس كمجموعة موحّدة */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex-shrink-0 flex items-center gap-0.5 p-1 rounded-full border border-border/50 bg-surface"
          >
            {GENDERS.map((g) => (
              <button
                key={g}
                onClick={() => setSelectedGender(g)}
                className={`
                  text-xs px-3 py-1.5 rounded-full transition-all duration-300 whitespace-nowrap
                  ${
                    selectedGender === g
                      ? "bg-gold/15 text-gold font-semibold"
                      : "text-muted-foreground hover:text-foreground"
                  }
                `}
              >
                {g}
              </button>
            ))}
          </motion.div>

          {/* فاصل بصري بين مجموعتي الفلاتر */}
          <div className="w-px h-5 bg-border/50 flex-shrink-0" />

          {/* شرائح الماركات */}
          <div ref={brandScrollRef} className="flex items-center gap-2">
            {brands.map((brand, i) => (
              <motion.button
                key={brand}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                onClick={() => setSelectedBrand(brand)}
                className={`
                  flex-shrink-0 text-xs md:text-sm px-4 py-1.5 rounded-full border
                  transition-all duration-300 whitespace-nowrap
                  ${
                    selectedBrand === brand
                      ? "bg-gold text-background font-bold border-gold shadow-[0_0_16px_rgba(200,160,60,0.4)]"
                      : "bg-transparent border-gold/30 text-muted-foreground hover:border-gold/60 hover:text-foreground"
                  }
                `}
              >
                {brand}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      {/* ===== GRID ===== */}
      <main className="flex-1 overflow-y-auto px-4 md:px-6 py-4">
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-64 gap-3 text-center"
          >
            <span className="text-4xl text-gold/20">◈</span>
            <p className="text-muted-foreground text-sm">
              لا توجد عطور تطابق البحث
            </p>
            <button
              onClick={() => {
                setSearch("");
                setSelectedBrand("الكل");
                setSelectedGender("الكل");
              }}
              className="text-xs text-gold hover:text-gold-light underline underline-offset-4 mt-1"
            >
              إعادة ضبط الفلاتر
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
            {filtered.map((perfume, i) => (
              <PerfumeCard
                key={perfume.name + perfume.brand}
                perfume={perfume}
                index={i}
                layoutId={`perfume-${perfume.name}`}
                onClick={() => setActivePerfume(perfume)}
              />
            ))}
          </div>
        )}

        <div className="mt-4 mb-2 text-center">
          <span className="text-xs text-muted-foreground">
            {filtered.length} عطر
          </span>
        </div>
      </main>

      <PerfumeModal
        perfume={activePerfume}
        onClose={() => setActivePerfume(null)}
      />
    </div>
  );
}
