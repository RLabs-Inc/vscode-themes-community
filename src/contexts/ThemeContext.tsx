'use client'

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react'
import {
  generateThemeColors,
  updateThemeColorsWithSaturation,
} from '@/lib/generator/uiColors'
import {
  generateSyntaxColors,
  updateSyntaxColorsWithSaturation,
} from '@/lib/generator/syntaxColors'
import { generateAnsiColors } from '@/lib/generator/ansiColors'
import {
  initialColors,
  initialSyntaxColors,
  ColorScheme,
} from '@/lib/types/colors'
import {
  saveTheme,
  getThemesByUserId,
  deleteTheme,
  updateTheme,
  updateThemePublicity,
} from '@/lib/db/themes'
import type { SavedTheme } from '@/lib/types/colors'
import { useTheme as useNextTheme } from 'next-themes'

import type {
  UIColors,
  SyntaxColors,
  AnsiColors,
  ThemeGenerationOptions,
} from '@/lib/types/colors'

interface ThemeContextType {
  isDark: boolean
  baseHue: number
  uiSaturation: number
  syntaxSaturation: number
  scheme: ColorScheme
  colors: UIColors
  syntaxColors: SyntaxColors
  lockedColors: Set<string>
  activeColor: string | null
  setIsDark: (value: boolean) => void
  setBaseHue: (value: number) => void
  setUiSaturation: (value: number) => void
  setSyntaxSaturation: (value: number) => void
  setScheme: (value: ColorScheme) => void
  generateColors: (
    options: Partial<ThemeGenerationOptions> & {
      lockedColors?: string[]
      forceRegenerate?: boolean
      few?: boolean
    }
  ) => void
  updateColorsWithSaturation: (
    newUiSaturation: number,
    newSyntaxSaturation: number
  ) => void
  toggleColorLock: (colorKey: string) => void
  setActiveColor: (colorKey: string | null) => void
  handleColorChange: (colorKey: string, newColor: string) => void
  ansiColors: AnsiColors
  regenerateAnsiColors: () => void
  schemeHues: number[]
  savedThemes: SavedTheme[]
  setSavedThemes: (themes: SavedTheme[]) => void
  saveCurrentTheme: (
    theme: Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>
  ) => Promise<void>
  loadTheme: (theme: SavedTheme) => void
  deleteTheme: (themeId: number) => Promise<void>
  loadSavedThemes: (userId: string) => Promise<void>
  updateThemePublicity: (themeId: number, isPublic: boolean) => Promise<void>
  currentThemeId: number | null
  setCurrentThemeId: (id: number | null) => void
  updateCurrentTheme: (
    id: number,
    theme: Partial<Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>>
  ) => Promise<void>
  isOnigasmInitialized: boolean
  setIsOnigasmInitialized: (value: boolean) => void
  isPublic: boolean
  setIsPublic: (value: boolean) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{
  children: React.ReactNode
  userId?: string // Change this to string to match Clerk's user ID type
}> = ({ children, userId }) => {
  const { setTheme, theme } = useNextTheme()
  const [isDark, setIsDarkState] = useState(theme === 'dark' ? true : false)
  const [baseHue, setBaseHueState] = useState(Math.floor(Math.random() * 360))
  const [uiSaturation, setUiSaturationState] = useState(30)
  const [syntaxSaturation, setSyntaxSaturationState] = useState(70)
  const [scheme, setSchemeState] = useState<ColorScheme>(ColorScheme.Analogous)
  const [colors, setColors] = useState<UIColors>(initialColors)
  const [syntaxColors, setSyntaxColors] =
    useState<SyntaxColors>(initialSyntaxColors)
  const [lockedColors, setLockedColors] = useState<Set<string>>(new Set())
  const [activeColor, setActiveColor] = useState<string | null>(null)
  const [ansiColors, setAnsiColors] = useState<AnsiColors>(() =>
    generateAnsiColors(initialColors.BG1)
  )
  const [schemeHues, setSchemeHues] = useState<number[]>([])
  const generateColorsTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([])
  const [currentThemeId, setCurrentThemeId] = useState<number | null>(null)
  const [isOnigasmInitialized, setIsOnigasmInitialized] = useState(false)
  const [isPublic, setIsPublic] = useState(false)

  const loadSavedThemes = useCallback(async (userId: string) => {
    if (userId) {
      const themes = await getThemesByUserId(userId)
      setSavedThemes(themes)
    }
  }, [])

  const saveCurrentTheme = useCallback(
    async (theme: Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>) => {
      const savedTheme = await saveTheme(theme)
      setSavedThemes((prev) => [...prev, savedTheme])
    },
    []
  )

  const updateCurrentTheme = useCallback(
    async (
      id: number,
      theme: Partial<Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>>
    ) => {
      const updatedTheme = await updateTheme(id, theme)
      setSavedThemes((prev) =>
        prev.map((theme) =>
          theme.id === updatedTheme.id
            ? { ...theme, ...(updatedTheme as Partial<SavedTheme>) }
            : theme
        )
      )
    },
    []
  )

  useEffect(() => {
    const loadUserThemes = async () => {
      if (userId) {
        await loadSavedThemes(userId)
      }
    }
    loadUserThemes()
  }, [userId, loadSavedThemes])

  const loadTheme = useCallback(
    (theme: SavedTheme) => {
      setIsDarkState(theme.isDark)
      setTheme(theme.isDark ? 'dark' : 'light')
      setColors(theme.uiColors)
      setSyntaxColors(theme.syntaxColors)
      setAnsiColors(theme.ansiColors)
      setBaseHueState(theme.baseHue)
      setUiSaturationState(theme.uiSaturation)
      setSyntaxSaturationState(theme.syntaxSaturation)
      setSchemeState(
        typeof theme.scheme === 'number'
          ? theme.scheme
          : (ColorScheme[
              theme.scheme as keyof typeof ColorScheme
            ] as ColorScheme)
      )
      setCurrentThemeId(theme.id)
      setIsPublic(theme.public)
    },
    [setTheme]
  )

  const deleteThemeFromContext = useCallback(async (themeId: number) => {
    await deleteTheme(themeId)
    setSavedThemes((prev) => prev.filter((theme) => theme.id !== themeId))
  }, [])

  const updateThemePublicityInContext = useCallback(
    async (themeId: number, isPublic: boolean) => {
      try {
        await updateThemePublicity(themeId, isPublic)
        setSavedThemes((prev) =>
          prev.map((theme) =>
            theme.id === themeId ? { ...theme, public: isPublic } : theme
          )
        )
        if (currentThemeId === themeId) {
          setIsPublic(isPublic)
        }
      } catch (error) {
        console.error('Failed to update theme publicity:', error)
      }
    },
    [currentThemeId]
  )

  const generateColors = useCallback(
    (
      options: Partial<ThemeGenerationOptions> & {
        lockedColors?: string[]
        forceRegenerate?: boolean
        few?: boolean
      }
    ) => {
      if (generateColorsTimeoutRef.current) {
        clearTimeout(generateColorsTimeoutRef.current)
      }

      generateColorsTimeoutRef.current = setTimeout(() => {
        try {
          const fullOptions: ThemeGenerationOptions = {
            isDark: options.isDark ?? isDark,
            baseHue: options.baseHue ?? baseHue,
            uiSaturation: options.uiSaturation ?? uiSaturation,
            syntaxSaturation: options.syntaxSaturation ?? syntaxSaturation,
            scheme: options.scheme ?? scheme,
            few: options.few,
          }

          const lockedColorSet = new Set(
            options.lockedColors ?? Array.from(lockedColors)
          )

          const {
            colors: newColors,
            schemeHues: newSchemeHues,
            scheme: newScheme,
          } = generateThemeColors(
            fullOptions,
            Object.fromEntries(
              Object.entries(colors).filter(([key]) => lockedColorSet.has(key))
            ) as Partial<UIColors>,
            options.forceRegenerate
          )
          const newSyntaxColors = generateSyntaxColors(
            newColors.BG1,
            newSchemeHues,
            fullOptions.syntaxSaturation,
            Object.fromEntries(
              Object.entries(syntaxColors).filter(([key]) =>
                lockedColorSet.has(key)
              )
            ) as Partial<SyntaxColors>
          )

          setColors(newColors)
          setSyntaxColors(newSyntaxColors)
          setSchemeHues(newSchemeHues)
        } catch (error) {
          console.error('Error generating colors:', error)
        }
      }, 300)
    },
    [
      isDark,
      baseHue,
      uiSaturation,
      syntaxSaturation,
      scheme,
      lockedColors,
      colors,
      syntaxColors,
    ]
  )

  const setIsDark = useCallback(
    (value: boolean) => {
      setIsDarkState(value)
      setTheme(value ? 'dark' : 'light')
      generateColors({ isDark: value })
    },
    [generateColors, setTheme]
  )

  const setBaseHue = useCallback(
    (value: number) => {
      setBaseHueState(value)
      generateColors({ baseHue: value, few: true })
    },
    [generateColors]
  )

  const updateUIColorsWithSaturation = useCallback(
    (newUiSaturation: number) => {
      const newColors = updateThemeColorsWithSaturation(
        colors,
        newUiSaturation,
        lockedColors
      )

      setColors(newColors)
    },
    [colors, lockedColors]
  )

  const updateColorsWithSaturation = useCallback(
    (newSyntaxSaturation: number) => {
      const newSyntaxColors = updateSyntaxColorsWithSaturation(
        syntaxColors,
        newSyntaxSaturation,
        colors.BG1,
        lockedColors
      )
      setSyntaxColors(newSyntaxColors)
    },
    [syntaxColors, lockedColors, colors.BG1]
  )

  const setUiSaturation = useCallback(
    (value: number) => {
      setUiSaturationState(value)
      updateUIColorsWithSaturation(value)
    },
    [updateUIColorsWithSaturation]
  )

  const setSyntaxSaturation = useCallback(
    (value: number) => {
      setSyntaxSaturationState(value)
      updateColorsWithSaturation(value)
    },
    [updateColorsWithSaturation]
  )

  const setScheme = useCallback(
    (value: ColorScheme) => {
      setSchemeState(value)
      generateColors({ scheme: value, few: true })
    },
    [generateColors]
  )

  const toggleColorLock = useCallback((colorKey: string) => {
    setLockedColors((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(colorKey)) {
        newSet.delete(colorKey)
      } else {
        newSet.add(colorKey)
      }
      return newSet
    })
  }, [])

  const handleColorChange = useCallback(
    (colorKey: string, newColor: string) => {
      if (colorKey.startsWith('ansi')) {
        setAnsiColors((prevColors) => ({
          ...prevColors,
          [colorKey.slice(4)]: newColor,
        }))
      } else if (colorKey in colors) {
        setColors((prevColors: UIColors) => ({
          ...prevColors,
          [colorKey]: newColor,
        }))
        if (colorKey === 'BG1') {
          setSyntaxColors((prevSyntaxColors: SyntaxColors) => ({
            ...prevSyntaxColors,
            ...generateSyntaxColors(newColor, schemeHues, syntaxSaturation),
          }))
        }
      } else if (colorKey in syntaxColors) {
        setSyntaxColors((prevSyntaxColors: SyntaxColors) => ({
          ...prevSyntaxColors,
          [colorKey]: newColor,
        }))
      }
    },
    [colors, syntaxColors, schemeHues, syntaxSaturation]
  )

  const regenerateAnsiColors = useCallback(() => {
    setAnsiColors(generateAnsiColors(colors.BG1))
  }, [colors.BG1])

  useEffect(() => {
    regenerateAnsiColors()
  }, [colors.BG1, regenerateAnsiColors])

  const value: ThemeContextType = {
    isDark,
    baseHue,
    uiSaturation,
    syntaxSaturation,
    scheme,
    colors,
    syntaxColors,
    ansiColors,
    lockedColors,
    activeColor,
    savedThemes,
    setSavedThemes,
    saveCurrentTheme,
    loadTheme,
    loadSavedThemes,
    deleteTheme: deleteThemeFromContext,
    setIsDark,
    setBaseHue,
    setUiSaturation,
    setSyntaxSaturation,
    setScheme,
    generateColors,
    regenerateAnsiColors,
    updateColorsWithSaturation,
    toggleColorLock,
    setActiveColor,
    handleColorChange,
    schemeHues,
    currentThemeId,
    setCurrentThemeId,
    updateCurrentTheme,
    isOnigasmInitialized,
    setIsOnigasmInitialized,
    updateThemePublicity: updateThemePublicityInContext,
    isPublic,
    setIsPublic,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
