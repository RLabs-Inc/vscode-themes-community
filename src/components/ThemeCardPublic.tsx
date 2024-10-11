'use client'

import { useTransition } from 'react'
import { Button } from '@/components/ui/button'
import { SavedTheme } from '@/lib/types/colors'
import {
  MoreVertical,
  Edit,
  Download,
  Eye,
  Share2,
  Loader2,
} from 'lucide-react'
import { useThemes } from '@/hooks/useThemes'

type ThemeCardPublicProps = {
  theme: SavedTheme
  onClick: React.Dispatch<React.SetStateAction<SavedTheme>>
}

const ThemeCardPublic: React.FC<ThemeCardPublicProps> = ({
  theme,
  onClick,
}) => {
  const { downloadTheme, isThemePending } = useThemes([theme])

  const handleDownload = () => {
    downloadTheme(theme.id)
  }

  const handlePreview = (theme: SavedTheme) => {
    console.log('Previewing theme:', theme)
  }

  const handleShare = (theme: SavedTheme) => {
    console.log('Sharing theme:', theme)
  }

  return (
    <div
      style={{
        backgroundColor: theme.uiColors.BG1,
      }}
      className="rounded-lg shadow-md overflow-hidden"
      onClick={() => onClick(theme)}
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
        </div>

        <div className="mt-2 flex justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleDownload}
            disabled={isThemePending(theme.id)}
          >
            {isThemePending(theme.id) ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handlePreview(theme)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleShare(theme)}
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ThemeCardPublic
