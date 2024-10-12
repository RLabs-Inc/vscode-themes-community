// src/components/ThemeCard.tsx
'use client'

import React, { useState, useTransition } from 'react'
import { SavedTheme } from '@/lib/types/colors'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Edit, Download, Eye, Share2, Trash2, Loader2 } from 'lucide-react'
import {
  updateThemeType,
  deleteTheme,
  downloadThemeVSIX,
} from '@/lib/db/themes'
import { useTheme } from '@/contexts/ThemeContext'

interface ThemeCardProps {
  theme: SavedTheme
  onPreview: (theme: SavedTheme) => void
  onDelete: (themeId: number) => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onPreview,
  onDelete,
}) => {
  const { updateSelectedThemeType, deleteSavedTheme } = useTheme()
  const [isPublic, setIsPublic] = useState(theme.public)
  const [isDelPending, startDelTransition] = useTransition()
  const [isDownPending, startDownTransition] = useTransition()
  const [isPublPending, startPublTransition] = useTransition()

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      startDelTransition(async () => {
        await deleteSavedTheme(theme.id)
        onDelete(theme.id)
      })
    }
  }

  const handlePublicityToggle = (checked: boolean) => {
    startPublTransition(async () => {
      await updateSelectedThemeType(theme.id, checked)
      setIsPublic(checked)
    })
  }

  const handleDownload = () => {
    startDownTransition(async () => {
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
        opacity: isDelPending || isDownPending || isPublPending ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}
      className="rounded-lg shadow-md overflow-hidden"
      aria-disabled={isDelPending || isDownPending || isPublPending}
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
              disabled={isPublPending}
            />
            <span style={{ color: theme.uiColors.FG2 }}>
              {isPublic ? 'Public' : 'Private'}
            </span>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDownload}
              disabled={isDownPending}
            >
              {isDownPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => onPreview(theme)}
              // disabled={isPending}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => {}} // Implement share functionality here
              // disabled={isPending}
            >
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="default"
              className="flex-1"
              // onClick={handleEdit}
              // disabled={}
            >
              <Edit className="h-4 w-4 mr-2" /> Edit
            </Button>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isDelPending}
            >
              {isDelPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThemeCard
