"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Search, X } from "lucide-react";
import type { Perfume } from "@/lib/types";
import PerfumeCard from "./PerfumeCard";
import PerfumeModal from "./PerfumeModal";
import ThemeToggle from "./ThemeToggle";
import Hero from "./Hero";

interface GalleryProps {
  perfumes: Perfume[];
}

const GENDERS = ["الكل", "للنساء", "للرجال", "للجنسين"];

// كم كرت نعرض دفعة وحدة. مع مئات العطور، عرضها كلها كـ DOM nodes
// مع حركات framer-motion على كل وحدة يثقّل السكرول على الآيباد.
const PAGE_SIZE = 30;

export default function Gallery({ perfumes }: GalleryProps) {
  const [search, setSearch] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("الكل");
  const [selectedGender, setSelectedGender] = useState("الكل");
  const [activePerfume, setActivePerfume] = useState<Perfume | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const brandScrollRef = useRef<HTMLDivElement>(null);

  const brands = useMemo(
    () => ["الكل", ...Array.from(new Set(perfumes.map((p) => p.brand)))],
    [perfumes]
  );

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

  // كل ما يتغيّر الفلتر أو البحث، نرجع نعرض أول دفعة بس - مو كل النتائج
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [search, selectedBrand, selectedGender]);

  const visiblePerfumes = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const resetFilters = () => {
    setSearch("");
    setSelectedBrand("الكل");
    setSelectedGender("الكل");
  };

  return (
    <div
      id="top"
      className="min-h-screen overflow-x-hidden bg-background text-foreground"
    >
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
          {/* Logo */}
          <a
            href="#top"
            className="group flex items-center gap-3"
            aria-label="فيافي الرئيسية"
          >
            <span className="font-display text-2xl font-bold tracking-[0.18em] text-primary">
              فيافي
            </span>

            <span className="hidden border-r border-border pr-3 text-[10px] tracking-[0.22em] text-muted-foreground sm:block">
              PERFUMERY
            </span>
          </a>

          {/* Navigation */}
          <nav
            className="hidden items-center gap-8 text-sm text-muted-foreground md:flex"
            aria-label="التنقل الرئيسي"
          >
            <a
              className="transition-colors hover:text-primary"
              href="#collection"
            >
              المجموعة
            </a>
          </nav>

          {/* Theme + Count */}
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-muted-foreground lg:block">
              {filtered.length} عطر
            </span>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main>
        <Hero />

        {/* ================= COLLECTION ================= */}
        <section id="collection" className="bg-secondary/50">
          <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
            {/* Collection Header */}
            <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 lg:flex-row lg:items-end">
              <div>
                <p className="text-xs tracking-[0.22em] text-primary">
                  THE COLLECTION
                </p>

                <h2 className="mt-3 font-display text-4xl font-semibold">
                  اختيارات فيافي
                </h2>
              </div>

              {/* Search */}
              <div className="relative w-full max-w-sm">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-primary" />

                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="ابحث عن عطر أو ماركة..."
                  aria-label="ابحث عن عطر أو ماركة"
                  className="h-11 w-full rounded-full border border-border bg-background pr-10 pl-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                />

                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="مسح البحث"
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {/* ================= FILTERS ================= */}
            <div
              ref={brandScrollRef}
              className="flex items-center gap-2 overflow-x-auto py-6"
              style={{ scrollbarWidth: "none" }}
            >
              {/* Gender */}
              {GENDERS.map((gender) => (
                <button
                  key={gender}
                  onClick={() => setSelectedGender(gender)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${
                    selectedGender === gender
                      ? "bg-primary text-primary-foreground"
                      : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                  }`}
                >
                  {gender}
                </button>
              ))}

              <span className="mx-2 h-5 w-px shrink-0 bg-border" />

              {/* Brands */}
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setSelectedBrand(brand)}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs transition ${
                    selectedBrand === brand
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* ================= PRODUCTS ================= */}
            {filtered.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-center">
                <p className="text-sm text-muted-foreground">
                  لا توجد عطور تطابق البحث
                </p>

                <button
                  onClick={resetFilters}
                  className="text-xs text-primary underline underline-offset-4"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                {visiblePerfumes.map((perfume, index) => (
                  <PerfumeCard
                    key={`${perfume.name}-${perfume.brand}`}
                    perfume={perfume}
                    index={index}
                    layoutId={`perfume-${perfume.name}`}
                    onClick={() => setActivePerfume(perfume)}
                  />
                ))}
              </div>
            )}

            {/* عرض المزيد */}
            {hasMore && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="rounded-full border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary hover:text-primary"
                >
                  عرض المزيد
                </button>
              </div>
            )}

            {/* Results Count */}
            <p className="mt-8 text-center text-xs text-muted-foreground">
              عرض {visiblePerfumes.length} من {filtered.length} عطر
            </p>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="bg-primary text-primary-foreground">
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-14 sm:flex-row sm:items-center lg:px-8">
            <div>
              <p className="text-xs tracking-[0.25em] opacity-70">
                A SCENT TO REMEMBER
              </p>

              <h2 className="mt-3 text-3xl font-semibold font-display">
                ابدأ حكايتك من هنا.
              </h2>
            </div>

            <a
              href="#collection"
              className="inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5"
            >
              اكتشف العطور
              <ArrowLeft data-icon="inline-start" />
            </a>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span className="font-display text-lg font-bold text-primary">
          فيافي
        </span>

        <span>عطور تُشبهك، حضور لا يُنسى.</span>

        <span>© 2026 FIAFI</span>
      </footer>

      {/* ================= MODAL ================= */}
      <PerfumeModal
        perfume={activePerfume}
        onClose={() => setActivePerfume(null)}
      />
    </div>
  );
}
