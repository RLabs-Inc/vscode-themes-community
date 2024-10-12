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
      <div className="relative py-5">
        <DotPattern cr={0.5} className="absolute inset-0" />
        <div className="h-[500px] flex flex-col items-center justify-center w-full">
          <h1 className="text-5xl font-bold mb-4">Discover new themes</h1>
          <h2 className="text-3xl font-semibold text-muted-foreground">
            made by the community
          </h2>
        </div>
      </div>
      <div className="-mt-36">
        <ThemePreviewSmall theme={selectedTheme} />
      </div>
      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
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
