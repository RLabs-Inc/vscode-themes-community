import React, { useState, useTransition, useEffect } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { Input } from '@/components/ui/input'
import { ActionButton } from '@/components/ActionButton'
import { Switch } from '@/components/ui/switch'
import { useUser } from '@clerk/nextjs'

interface ThemeSaverProps {
  themeName: string
  setThemeName: React.Dispatch<React.SetStateAction<string>>
}

const ThemeSaver: React.FC<ThemeSaverProps> = ({
  themeName,
  setThemeName,
}: ThemeSaverProps) => {
  const {
    saveCurrentTheme,
    updateCurrentTheme,
    updateSelectedThemeType,
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

  const { user } = useUser()
  const [isPending, startTransition] = useTransition()

  const handlePublicToggle = (checked: boolean) => {
    startTransition(async () => {
      if (currentThemeId) {
        await updateSelectedThemeType(currentThemeId, checked)
      }
      setIsPublic(checked)
    })
  }

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
          userName: user.firstName + ' ' + user.lastName,
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
          userName: user.firstName + ' ' + user.lastName,
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
          onCheckedChange={(checked) => handlePublicToggle(checked)}
          id="public-switch"
        />
        <label htmlFor="public-switch">Make theme public</label>
      </div>
    </div>
  )
}

export default ThemeSaver
