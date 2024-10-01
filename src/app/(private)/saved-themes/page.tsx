// app/saved-themes/page.tsx
import { SavedThemesContent } from '@/components/SavedThemes'
import { getThemesByUserId } from '@/lib/db/themes'
import { auth } from '@clerk/nextjs/server'

export default async function SavedThemesPage() {
  const { userId } = auth()
  const themes = userId ? await getThemesByUserId(userId) : []

  return (
    <div className="mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Your Saved Themes</h1>
      <SavedThemesContent initialThemes={themes} />
    </div>
  )
}
