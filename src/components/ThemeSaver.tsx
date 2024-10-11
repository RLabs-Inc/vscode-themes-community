import React, { useState, useTransition, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Input } from '@/components/ui/input'
import { ActionButton } from '@/components/ActionButton'
import { useUser } from '@clerk/nextjs'
import { Switch } from '@/components/ui/switch'

const ThemeSaver: React.FC = () => {
  const {
    saveCurrentTheme,
    updateCurrentTheme,
    currentThemeId,
    savedThemes,
    isPublic,
    setIsPublic,
    colors,
    syntaxColors,
    ansiColors,
    isDark,
    baseHue,
    uiSaturation,
    syntaxSaturation,
    scheme,
  } = useTheme()
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
        setIsPublic(currentTheme.public)
      }
    } else {
      setThemeName('')
      setIsPublic(false)
    }
  }, [currentThemeId, savedThemes, setIsPublic])

  const handleSave = () => {
    if (!user) return

    startTransition(async () => {
      if (currentThemeId) {
        await updateCurrentTheme(currentThemeId, {
          name: themeName.trim(),
          public: isPublic,
          uiColors: colors,
          syntaxColors: syntaxColors,
          ansiColors: ansiColors,
          isDark: isDark,
          baseHue: baseHue,
          uiSaturation: uiSaturation,
          syntaxSaturation: syntaxSaturation,
          scheme: scheme,
        })
      } else {
        await saveCurrentTheme({
          name: themeName.trim(),
          userId: user.id,
          public: isPublic,
          uiColors: colors,
          syntaxColors: syntaxColors,
          ansiColors: ansiColors,
          isDark: isDark,
          baseHue: baseHue,
          uiSaturation: uiSaturation,
          syntaxSaturation: syntaxSaturation,
          scheme: scheme,
        })
      }
    })
  }

  return (
    <div className="flex flex-col gap-4">
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
      <div className="flex items-center gap-2">
        <Switch
          checked={isPublic}
          onCheckedChange={setIsPublic}
          id="public-switch"
        />
        <label htmlFor="public-switch">Make theme public</label>
      </div>
    </div>
  )
}

export default ThemeSaver
