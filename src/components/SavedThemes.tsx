'use client'

import { useState } from 'react'
import ThemeCard from '@/components/ThemeCard'
import { SavedTheme } from '@/lib/types/colors'

export function SavedThemesContent({
  initialThemes,
}: {
  initialThemes: SavedTheme[]
}) {
  const [themes, setThemes] = useState(initialThemes)

  const handleEdit = (theme: SavedTheme) => {
    // Implement theme editing logic
  }

  const handleDownload = (theme: SavedTheme) => {
    // Implement theme download logic
  }

  const handlePreview = (theme: SavedTheme) => {
    // Implement theme preview logic
  }

  const handleShare = (theme: SavedTheme) => {
    // Implement theme sharing logic
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
  )
}
