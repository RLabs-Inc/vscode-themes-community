import React, { useState, useTransition, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Input } from '@/components/ui/input'
import { ActionButton } from '@/components/ActionButton'
import { useUser } from '@clerk/nextjs'

const ThemeSaver: React.FC = () => {
  const { saveCurrentTheme, updateCurrentTheme, currentThemeId, savedThemes } =
    useTheme()
  const [themeName, setThemeName] = useState('')
  const { user } = useUser()

  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if (currentThemeId) {
      const currentTheme = savedThemes.find(
        (theme) => theme.id === currentThemeId
      )
      if (currentTheme) {
        setThemeName(currentTheme.name)
      }
    } else {
      setThemeName('')
    }
  }, [currentThemeId, savedThemes])

  const handleSave = () => {
    startTransition(async () => {
      if (!user) return
      if (currentThemeId) {
        await updateCurrentTheme(themeName.trim())
      } else {
        await saveCurrentTheme(themeName.trim(), user.id)
      }
    })
  }

  return (
    <div className="flex gap-4">
      <div className="flex-1">
        <Input
          value={themeName}
          onChange={(e) => setThemeName(e.target.value)}
          placeholder="Enter theme name"
        />
      </div>
      <ActionButton
        label={currentThemeId ? 'Update' : 'Save'}
        onClick={handleSave}
        pending={isPending}
        disabled={!themeName.trim()}
      />
    </div>
  )
}

export default ThemeSaver
