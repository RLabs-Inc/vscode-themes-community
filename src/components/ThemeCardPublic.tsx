'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { SavedTheme } from '@/lib/types/colors'
import { Download, Eye, Share2, Loader2 } from 'lucide-react'
import { downloadThemeVSIX } from '@/lib/db/themes'
import { useTransition } from 'react'
import { useUser } from '@clerk/nextjs'

type ThemeCardPublicProps = {
  theme: SavedTheme
  onClick: (theme: SavedTheme) => void
}

const ThemeCardPublic: React.FC<ThemeCardPublicProps> = ({
  theme,
  onClick,
}) => {
  const { user } = useUser()
  const [isPending, startTransition] = useTransition()

  const handleDownload = () => {
    startTransition(async () => {
      const vsixBuffer = await downloadThemeVSIX(theme.id)
      if (vsixBuffer) {
        const blob = new Blob([vsixBuffer], {
          type: 'application/octet-stream',
        })
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `${theme.name}.vsix`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        a.remove()
      }
    })
  }

  return (
    <div
      style={{ backgroundColor: theme.uiColors.BG1 }}
      className="rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-1 flex">
        <div
          className="flex-1"
          style={{ backgroundColor: theme.uiColors.AC1 }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.uiColors.AC2 }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.syntaxColors.variable }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.syntaxColors.storage }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.syntaxColors.control }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.syntaxColors.keyword }}
        />
      </div>
      <div className="p-4">
        <h3
          style={{ color: theme.uiColors.FG1 }}
          className="text-lg font-semibold"
        >
          {theme.name}
        </h3>
        <h3 style={{ color: theme.uiColors.FG2 }} className="text-sm">
          {theme.userName}
        </h3>
        <div className="mt-2 flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
          <Button variant="outline" size="icon" onClick={() => onClick(theme)}>
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => {}}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCardPublic
