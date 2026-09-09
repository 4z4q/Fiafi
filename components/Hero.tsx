"use client";

import { motion, useReducedMotion } from "framer-motion";

// شرر/جمرات ذهبية عايمة - كل وحدة لها موضع وتوقيت وحجم مختلف عشان
// ما تحس إنها نمط متكرر. العدد محدود عمدًا (10) عشان يضل خفيف على الآيباد.
const EMBERS = [
  { left: "12%", size: 3, delay: 0, duration: 9 },
  { left: "22%", size: 2, delay: 1.4, duration: 11 },
  { left: "34%", size: 4, delay: 0.6, duration: 8 },
  { left: "45%", size: 2, delay: 2.2, duration: 10 },
  { left: "58%", size: 3, delay: 0.2, duration: 9.5 },
  { left: "68%", size: 2, delay: 1.8, duration: 12 },
  { left: "77%", size: 4, delay: 1, duration: 8.5 },
  { left: "86%", size: 2, delay: 2.6, duration: 10.5 },
  { left: "50%", size: 3, delay: 0.9, duration: 11.5 },
  { left: "40%", size: 2, delay: 1.6, duration: 9 },
] as const;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18, delayChildren: 0.15 },
  },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden bg-background px-5 text-center"
      style={{
        backgroundImage:
          "radial-gradient(ellipse 80% 55% at 50% 15%, color-mix(in oklab, var(--primary) 16%, var(--background)), var(--background) 68%)",
      }}
    >
      {/* دخان البخور المتصاعد - طبقات ضبابية بطيئة، ملوّنة بلون البراند
          (بنفسجي) عشان تبين بهدوء فوق الخلفية الفاتحة أو الغامقة على حد سواء */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute bottom-0 left-1/2 h-[70%] w-[45%] rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(ellipse, color-mix(in oklab, var(--primary) 22%, transparent), transparent 70%)",
                marginLeft: `${(i - 1) * 12}%`,
              }}
              animate={{
                y: ["10%", "-55%"],
                x: [
                  `${(i - 1) * 6}%`,
                  `${(i - 1) * 6 + (i % 2 === 0 ? 8 : -8)}%`,
                ],
                opacity: [0, 0.7, 0],
                scale: [0.85, 1.15],
              }}
              transition={{
                duration: 14 + i * 3,
                delay: i * 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      {/* شرر ذهبي عايم */}
      {!reduceMotion && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {EMBERS.map((ember, i) => (
            <motion.span
              key={i}
              className="absolute bottom-[8%] rounded-full bg-gold"
              style={{
                left: ember.left,
                width: ember.size,
                height: ember.size,
                boxShadow:
                  "0 0 6px 1px color-mix(in oklab, var(--gold) 80%, transparent)",
              }}
              animate={{
                y: ["0vh", "-58vh"],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: ember.duration,
                delay: ember.delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}

      {/* المحتوى */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col items-center"
      >
        {/* اسم البراند - نفس خط الموقع (Tajawal) بس أكبر وأثقل، بتدرج
            بنفسجي-ذهبي مبني على متغيّرات الثيم فيتغيّر تلقائيًا مع الوضع */}
        <motion.h1
          variants={rise}
          className="select-none font-display text-[clamp(3.2rem,13vw,7.5rem)] font-extrabold leading-none tracking-tight"
          style={{
            backgroundImage:
              "linear-gradient(135deg, var(--primary) 0%, var(--gold) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          فيافي
        </motion.h1>

        {/* الوصف التعريفي */}
        <motion.p
          variants={rise}
          className="mt-6 max-w-lg text-pretty text-lg leading-8 text-foreground sm:text-xl"
        >
          بيت العود والزيوت العطرية والمعمول
        </motion.p>
        <motion.p
          variants={rise}
          className="mt-2 max-w-md text-pretty text-sm leading-7 text-muted-foreground"
        >
          تجارة جملة وقطاعي، وتركيب عطور مخصصة لأصحاب المحلات والبراندات
        </motion.p>

        {/* شرائح التصنيفات */}
        <motion.div
          variants={rise}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          {["عود", "زيوت عطرية", "معمول", "تركيبات مخصصة"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-gold/30 px-4 py-2 text-xs tracking-wide text-foreground"
              style={{
                backgroundColor:
                  "color-mix(in oklab, var(--gold) 8%, transparent)",
              }}
            >
              {tag}
            </span>
          ))}
        </motion.div>

        {/* دعوة للدخول */}
        <motion.a
          variants={rise}
          href="#collection"
          className="group mt-12 inline-flex flex-col items-center gap-2 text-foreground"
        >
          <span className="text-xs tracking-[0.24em]">ادخل المجموعة</span>
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-gold transition-transform group-hover:translate-y-1"
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
