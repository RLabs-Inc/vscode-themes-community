'use client'

import { SavedTheme } from '@/lib/types/colors'
import ThemeCardPublic from './ThemeCardPublic'
import ThemePreviewSmall from './ThemePreviewSmall'
import { useState } from 'react'

export default function Discover({ themes }: { themes: SavedTheme[] }) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  return (
    <section>
      <ThemePreviewSmall theme={selectedTheme} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <ThemeCardPublic
            key={theme.id}
            theme={theme}
            onClick={setSelectedTheme}
          />
        ))}
      </div>
    </section>
  )
}
