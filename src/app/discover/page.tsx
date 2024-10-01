import ThemeCardPublic from '@/components/ThemeCardPublic'

import { getPublicThemes } from '@/lib/db/themes'

export default async function DiscoverPage() {
  const themes = await getPublicThemes()

  return (
    <div>
      <main className="mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Discover Themes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {themes.map((theme) => (
            <ThemeCardPublic key={theme.id} theme={theme} />
          ))}
        </div>
      </main>
    </div>
  )
}
