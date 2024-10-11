// src/components/ThemeCard.tsx
'use client'

import React from 'react'
import { SavedTheme } from '@/lib/types/colors'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import {
  MoreVertical,
  Edit,
  Download,
  Eye,
  Share2,
  Trash2,
  Loader2,
} from 'lucide-react'
import { useThemes } from '@/hooks/useThemes'

interface ThemeCardProps {
  theme: SavedTheme
  onPreview: (theme: SavedTheme) => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, onPreview }) => {
  const {
    removeTheme,
    updateThemePublicityOptimistic,
    downloadTheme,
    isThemePending,
    isThemeDownloading,
  } = useThemes([theme])

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this theme?')) {
      await removeTheme(theme.id)
    }
  }

  const handlePublicityToggle = async () => {
    await updateThemePublicityOptimistic(theme.id, !theme.public)
  }

  const handleDownload = async () => {
    await downloadTheme(theme.id)
  }

  const handleEdit = () => {
    // Implement edit functionality here
    console.log('Edit theme:', theme.id)
  }

  const handleShare = () => {
    // Implement share functionality here
    console.log('Share theme:', theme.id)
  }

  const isPending = isThemePending(theme.id)

  return (
    <div
      style={{
        backgroundColor: theme.uiColors.BG1,
        opacity: isPending ? 0.7 : 1,
        transition: 'opacity 0.2s',
      }}
      className="rounded-lg shadow-md overflow-hidden"
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
              checked={theme.public}
              onCheckedChange={handlePublicityToggle}
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
            onClick={handleEdit}
            disabled={isPending}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            disabled={isPending || isThemeDownloading(theme.id)}
          >
            {isThemeDownloading(theme.id) ? (
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
            onClick={handleShare}
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
