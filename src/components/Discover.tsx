'use client'

import { SavedTheme } from '@/lib/types/colors'
import ThemeCardPublic from './ThemeCardPublic'
import ThemePreviewSmall from './ThemePreviewSmall'
import { DotPattern } from './ui/dot-pattern'
import { useState } from 'react'

export default function Discover({ themes }: { themes: SavedTheme[] }) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  return (
    <section className="flex flex-col gap-10 w-full">
      <div className="sticky top-[3.5rem] py-5 z-20 bg-background/70 shadow-sm backdrop-blur backdrop w-full">
        <ThemePreviewSmall theme={selectedTheme} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-16 p-20">
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
