// src/components/ThemeCard.tsx
import React from 'react'
import { SavedTheme } from '@/lib/types/colors'
import { Button } from '@/components/ui/button'
import { MoreVertical, Edit, Download, Eye, Share2 } from 'lucide-react'

interface ThemeCardProps {
  theme: SavedTheme
  onEdit: (theme: SavedTheme) => void
  onDownload: (theme: SavedTheme) => void
  onPreview: (theme: SavedTheme) => void
  onShare: (theme: SavedTheme) => void
}

const ThemeCard: React.FC<ThemeCardProps> = ({
  theme,
  onEdit,
  onDownload,
  onPreview,
  onShare,
}) => {
  console.log(theme)
  return (
    <div
      style={{
        backgroundColor: theme.uiColors.BG1,
      }}
      className="rounded-lg shadow-md overflow-hidden"
    >
      <div className="h-8 flex">
        {/* <div
          className="flex-1"
          style={{ backgroundColor: theme.uiColors.BG1 }}
        />
        <div
          className="flex-1"
          style={{ backgroundColor: theme.uiColors.FG1 }}
        /> */}
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
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button variant="default" size="sm" className="flex-1">
            Featured
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Public
          </Button>
        </div>
        <div className="mt-4 flex space-x-2">
          <Button
            variant="default"
            className="flex-1"
            onClick={() => onEdit(theme)}
          >
            <Edit className="h-4 w-4 mr-2" /> Edit
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDownload(theme)}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPreview(theme)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={() => onShare(theme)}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCard
