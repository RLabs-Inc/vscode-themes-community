'use client'

import { useState } from 'react'
import ThemeCard from '@/components/ThemeCard'
import { SavedTheme } from '@/lib/types/colors'
import ThemePreviewSmall from './ThemePreviewSmall'

export function SavedThemesContent({
  initialThemes,
}: {
  initialThemes: SavedTheme[]
}) {
  const [themes, setThemes] = useState<SavedTheme[]>(initialThemes)
  const [selectedTheme, setSelectedTheme] = useState<SavedTheme>(themes[0])

  const handlePreview = (theme: SavedTheme) => {
    setSelectedTheme(theme)
  }

  const handleDelete = (themeId: number) => {
    setThemes((themes) => themes.filter((theme) => theme.id !== themeId))
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="sticky top-[3.5rem] py-5 z-20 bg-background/70 shadow-sm backdrop-blur backdrop w-full">
        <ThemePreviewSmall theme={selectedTheme} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 md:gap-16">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onPreview={handlePreview}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </section>
  )
}
