import Discover from '@/components/Discover'
import { DotPattern } from '@/components/ui/dot-pattern'

import { getPublicThemes } from '@/lib/db/themes'

export default async function DiscoverPage() {
  const themes = await getPublicThemes()
  return (
    <div>
      <main className="mx-auto container">
        <div className="flex flex-col gap-10 items-center w-full mt-10">
          <Discover themes={themes} />
        </div>
      </main>
    </div>
  )
}
