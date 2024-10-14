import Discover from '@/components/Discover'
import { DotPattern } from '@/components/ui/dot-pattern'

import { getPublicThemes } from '@/lib/db/themes'

export default async function DiscoverPage() {
  const themes = await getPublicThemes()
  return (
    <div>
      <main className="mx-auto px-3 md:px-0">
        <div className="flex flex-col gap-10 items-center w-full">
          <div className="relative w-full">
            <DotPattern cr={0.3} className="absolute top-0 z-20" />
            <div className="h-[500px] flex flex-col items-center justify-center w-full">
              <h1 className="text-2xl md:text-5xl font-bold mb-4">
                Discover new themes
              </h1>
              <h2 className="text-lg md:text-3xl font-semibold text-muted-foreground">
                made by the community
              </h2>
            </div>
          </div>
          <Discover themes={themes} />
        </div>
      </main>
    </div>
  )
}
