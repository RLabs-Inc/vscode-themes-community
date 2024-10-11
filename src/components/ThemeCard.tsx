// src/components/ThemeCard.tsx
'use client'

import React, { useState } from 'react'
import { SavedTheme } from '@/lib/types/colors'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Edit, Download, Eye, Share2, Trash2, Loader2 } from 'lucide-react'
import {
  updateThemePublicity,
  deleteTheme,
  downloadThemeVSIX,
} from '@/lib/db/themes'
import { useTransition } from 'react'

interface ThemeCardProps {
  theme: SavedTheme
  onPreview: (theme: SavedTheme) => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onPreview }) => {
  const [isPublic, setIsPublic] = useState(theme.public)
  const [isPending, startTransition] = useTransition()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      startTransition(async () => {
        await deleteTheme(theme.id)
      })
    }
  }

  const handlePublicityToggle = (checked: boolean) => {
    startTransition(async () => {
      await updateThemePublicity(theme.id, checked)
      setIsPublic(checked)
    })
  }

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
      style={{
        backgroundColor: theme.uiColors.BG1,
        opacity: isPending ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}
      className="rounded-lg shadow-md overflow-hidden"
      onClick={() => onPreview(theme)}
      aria-disabled={isPending}
    >
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3
            style={{ color: theme.uiColors.FG1 }}
            className="text-lg font-semibold"
          >
            {theme.name}
          </h3>
          <div className="flex items-center space-x-2">
            <Switch
              checked={isPublic}
              onCheckedChange={(checked) => handlePublicityToggle(checked)}
              disabled={isPending}
            />
            <span style={{ color: theme.uiColors.FG2 }}>
              {theme.public ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            variant="default"
            className="flex-1"
            // onClick={handleEdit}
            disabled={isPending}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
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
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPreview(theme)}
            disabled={isPending}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {}} // Implement share functionality here
            disabled={isPending}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            onClick={handleDelete}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCard
