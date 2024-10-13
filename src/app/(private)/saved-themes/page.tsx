// app/saved-themes/page.tsx
import { SavedThemesContent } from '@/components/SavedThemes'
import { getThemesByUserId } from '@/lib/db/themes'
import { auth } from '@clerk/nextjs/server'

export default async function SavedThemesPage() {
  const { userId } = auth()
  const themes = userId ? await getThemesByUserId(userId) : []

  return (
    <main className="mx-auto p-20">
      <SavedThemesContent initialThemes={themes} />
    </main>
  )
}
