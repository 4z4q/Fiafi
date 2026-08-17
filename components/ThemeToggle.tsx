"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [isLight, setIsLight] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    const isDark = root.classList.contains("dark");

    // الافتراضي: فاتح — إلا إذا كان فيه كلاس "dark" صريح على العنصر
    const initialIsLight = !isDark;

    root.classList.toggle("light", initialIsLight);
    root.classList.toggle("dark", !initialIsLight);
    setIsLight(initialIsLight);
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    document.documentElement.classList.toggle("light", nextIsLight);
    document.documentElement.classList.toggle("dark", !nextIsLight);
    setIsLight(nextIsLight);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"}
      title={isLight ? "الوضع الداكن" : "الوضع الفاتح"}
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-gold/25 bg-surface text-gold transition-colors hover:border-gold/60 hover:bg-surface-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {isLight ? (
        <span aria-hidden="true">☀</span>
      ) : (
        <span aria-hidden="true">◐</span>
      )}
    </button>
  );
}
