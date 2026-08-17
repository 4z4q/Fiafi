import type { Metadata, Viewport } from "next";
import { Cairo, Tajawal } from "next/font/google";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  variable: "--font-display",
  weight: ["200", "300", "400", "500", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "فيافي | عطور تُشبهك",
  description: "اكتشف مجموعة فيافي المختارة من أرقى العطور العالمية. عطرك، توقيعك.",
  openGraph: {
    title: "فيافي | عطور تُشبهك",
    description: "مجموعة عطور فاخرة مختارة بعناية لتكتب حضورك.",
    locale: "ar_SA",
    type: "website",
  },
  generator: "v0.app",
};
export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#7A3E7C",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${cairo.variable} ${tajawal.variable} light bg-background`}
    >
      <body className="antialiased font-sans">{children}</body>
    </html>
  );
}
