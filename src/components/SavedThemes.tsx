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
  const [themes, setThemes] = useState(initialThemes)
  const [theme, setTheme] = useState<SavedTheme>(initialThemes[0])

  const handleEdit = (theme: SavedTheme) => {
    // Implement theme editing logic
  }

  const handleDownload = (theme: SavedTheme) => {
    // Implement theme download logic
  }

  const handlePreview = (theme: SavedTheme) => {
    setTheme(theme)
  }

  const handleShare = (theme: SavedTheme) => {
    // Implement theme sharing logic
  }

  return (
    <section className="flex flex-col gap-10">
      <ThemePreviewSmall theme={theme} />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {themes.map((theme) => (
          <ThemeCard
            key={theme.id}
            theme={theme}
            onEdit={handleEdit}
            onDownload={handleDownload}
            onPreview={handlePreview}
            onShare={handleShare}
          />
        ))}
      </div>
    </section>
  )
}
