'use client'

import { useState, useCallback } from 'react'
import { SavedTheme } from '@/lib/types/colors'
import {
  updateThemePublicity,
  deleteThemeFromDb,
  downloadThemeVSIX,
} from '@/lib/db/themes'

export function useThemes(initialThemes: SavedTheme[]) {
  const [themes, setThemes] = useState<SavedTheme[]>(initialThemes)
  const [pendingThemes, setPendingThemes] = useState<Set<number>>(new Set())
  const [downloadingThemes, setDownloadingThemes] = useState<Set<number>>(
    new Set()
  )

  const removeTheme = useCallback(async (themeId: number) => {
    setPendingThemes((prev) => new Set(prev).add(themeId))
    try {
      await deleteThemeFromDb(themeId)
      setThemes((prevThemes) =>
        prevThemes.filter((theme) => theme.id !== themeId)
      )
    } finally {
      setPendingThemes((prev) => {
        const newSet = new Set(prev)
        newSet.delete(themeId)
        return newSet
      })
    }
  }, [])

  const updateThemePublicityOptimistic = useCallback(
    async (themeId: number, isPublic: boolean) => {
      setPendingThemes((prev) => new Set(prev).add(themeId))
      setThemes((prevThemes) =>
        prevThemes.map((theme) =>
          theme.id === themeId ? { ...theme, public: isPublic } : theme
        )
      )

      try {
        await updateThemePublicity(themeId, isPublic)
      } catch (error) {
        // Revert the optimistic update if the server request fails
        setThemes((prevThemes) =>
          prevThemes.map((theme) =>
            theme.id === themeId ? { ...theme, public: !isPublic } : theme
          )
        )
      } finally {
        setPendingThemes((prev) => {
          const newSet = new Set(prev)
          newSet.delete(themeId)
          return newSet
        })
      }
    },
    []
  )

  const downloadTheme = useCallback(
    async (themeId: number) => {
      setDownloadingThemes((prev) => new Set(prev).add(themeId))
      try {
        const vsixBuffer = await downloadThemeVSIX(themeId)
        if (vsixBuffer) {
          const theme = themes.find((t) => t.id === themeId)
          if (theme) {
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
        }
      } finally {
        setDownloadingThemes((prev) => {
          const newSet = new Set(prev)
          newSet.delete(themeId)
          return newSet
        })
      }
    },
    [themes]
  )

  const isThemePending = useCallback(
    (themeId: number) => pendingThemes.has(themeId),
    [pendingThemes]
  )

  const isThemeDownloading = useCallback(
    (themeId: number) => downloadingThemes.has(themeId),
    [downloadingThemes]
  )

  return {
    themes,
    removeTheme,
    updateThemePublicityOptimistic,
    downloadTheme,
    isThemePending,
    isThemeDownloading,
  }
}
