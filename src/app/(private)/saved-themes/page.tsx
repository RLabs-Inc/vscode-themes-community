// app/saved-themes/page.tsx
import { SavedThemesContent } from '@/components/SavedThemes'
import { getThemesByUserId } from '@/lib/db/themes'
import { auth } from '@clerk/nextjs/server'

export default async function SavedThemesPage() {
  const { userId } = auth()
  const themes = userId ? await getThemesByUserId(userId) : []

  auth().protect()

  return (
    <main className="mx-auto p-4 md:p-20">
      {themes.length === 0 ? (
        <div className="text-center py-8">
          <h2 className="text-2xl font-semibold mb-4">No Saved Themes</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You have not saved any themes yet. Create and save a theme to see it
            here!
          </p>
        </div>
      ) : (
        <SavedThemesContent initialThemes={themes} />
      )}
    </main>
  )
}
