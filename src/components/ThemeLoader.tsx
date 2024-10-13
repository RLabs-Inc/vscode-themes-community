import React, { useState, useTransition, useEffect, useCallback } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Loader2 } from 'lucide-react'

interface ThemeLoaderProps {
  setThemeName: React.Dispatch<React.SetStateAction<string>>
}

export const ThemeLoader: React.FC<ThemeLoaderProps> = ({
  setThemeName,
}: ThemeLoaderProps) => {
  const { savedThemes, loadTheme, currentThemeId } = useTheme()
  const [selectedThemeId, setSelectedThemeId] = useState<string>(
    currentThemeId?.toString() || ''
  )
  const [isPending, startTransition] = useTransition()

  const handleLoad = useCallback(
    (value: string) => {
      if (value === '') return
      startTransition(async () => {
        const themeToLoad = savedThemes.find(
          (theme) => theme.id.toString() === value
        )
        if (themeToLoad) {
          loadTheme(themeToLoad)
          setThemeName(themeToLoad.name)
        }
      })
    },
    [loadTheme, savedThemes, setThemeName]
  )

  useEffect(() => {
    if (currentThemeId === null) {
      setSelectedThemeId('')
    } else {
      setSelectedThemeId(currentThemeId.toString())
      handleLoad(currentThemeId.toString())
    }
  }, [currentThemeId, handleLoad])

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Select
          value={currentThemeId?.toString() || ''}
          onValueChange={(value) => handleLoad(value)}
        >
          <SelectTrigger>
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <SelectValue placeholder="Select a theme" />
            )}
          </SelectTrigger>
          <SelectContent>
            {savedThemes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id.toString()}>
                {theme.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
