import Gallery from '@/components/Gallery'
import AttractMode from '@/components/AttractMode'
import type { Perfume } from '@/lib/types'
import perfumesData from '@/public/perfumes.json'

export default function HomePage() {
  const perfumes = perfumesData as Perfume[]

  return (
    <main className="relative min-h-screen bg-background">
      <Gallery perfumes={perfumes} />
      <AttractMode perfumes={perfumes} />
    </main>
  )
}
