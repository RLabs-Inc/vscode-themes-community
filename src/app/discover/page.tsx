import Discover from '@/components/Discover'

import { getPublicThemes } from '@/lib/db/themes'

export default async function DiscoverPage() {
  const themes = await getPublicThemes()

  return (
    <div>
      <main className="mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Discover Themes</h1>
        <Discover themes={themes} />
      </main>
    </div>
  )
}
