"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Perfume } from "@/lib/types";

interface PerfumeCardProps {
  perfume: Perfume;
  index: number;
  onClick: () => void;
  layoutId: string;
}
function ImageSkeleton() {
  return <div className="absolute inset-0 skeleton-shimmer" />;
}

export default function PerfumeCard({
  perfume,
  index,
  onClick,
  layoutId,
}: PerfumeCardProps) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const topAccords = perfume.main_accords.slice(0, 3);
  // سقف للتأخير عشان الكروت المتأخرة بالقائمة ما تنتظر ثواني طويلة عشان تظهر
  const delay = Math.min(index * 0.04, 0.4);
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="group cursor-pointer"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 hover:-translate-y-1 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10">
        <div className="relative aspect-[3/4] overflow-hidden bg-secondary/60">
          {!imgLoaded && <ImageSkeleton />}
          <Image
            src={perfume.image_url}
            alt={perfume.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className={`object-contain p-3 transition duration-700 group-hover:scale-105 ${
              imgLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImgLoaded(true)}
          />
          <span className="absolute right-3 top-3 rounded-full border border-border bg-background/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur-sm">
            {perfume.gender}
          </span>
        </div>
        <div className="flex flex-col gap-2 p-3">
          <p className="truncate text-[10px] tracking-[0.18em] text-muted-foreground">
            {perfume.brand}
          </p>
          <h3 className="line-clamp-2 text-sm font-semibold leading-snug text-foreground">
            {perfume.name}
          </h3>
          <div className="flex items-center gap-1.5 pt-1">
            {topAccords.map((accord) => (
              <span
                key={accord.name}
                title={accord.name}
                className="size-2.5 rounded-full border border-border"
                style={{ backgroundColor: accord.color_hex }}
              />
            ))}
            {topAccords.length > 0 && (
              <span
                className="h-1 flex-1 rounded-full"
                style={{
                  background: `linear-gradient(to left, ${topAccords
                    .map((a) => a.color_hex)
                    .join(", ")})`,
                }}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
