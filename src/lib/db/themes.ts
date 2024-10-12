'use server'

import { revalidatePath } from 'next/cache'
import { ColorScheme, type SavedTheme, SavedThemeSchema } from '../types/colors'
import { db } from '../drizzle/db'
import { ThemesTable, UsersTable } from '../drizzle/schema'
import { eq } from 'drizzle-orm'
import { generateVSIX } from '@/lib/generator/exportVSIX'

export async function getPublicThemes(): Promise<SavedTheme[]> {
  const results = await db
    .select()
    .from(ThemesTable)
    .where(eq(ThemesTable.public, true))

  return results.map(parseSavedTheme)
}

export async function getThemesByUserId(userId: string): Promise<SavedTheme[]> {
  const results = await db
    .select()
    .from(ThemesTable)
    .where(eq(ThemesTable.userId, userId))
  return results.map(parseSavedTheme)
}

export async function getThemeById(id: number): Promise<SavedTheme | null> {
  const result = await db
    .select()
    .from(ThemesTable)
    .where(eq(ThemesTable.id, id))
    .limit(1)
  return result[0] ? parseSavedTheme(result[0]) : null
}

export async function saveTheme(
  theme: Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>
) {
  const result = await db
    .insert(ThemesTable)
    .values({
      ...theme,
      scheme: theme.scheme.toString(), // Convert enum to string if present
    })
    .returning()
  const savedTheme = parseSavedTheme(result[0])
  revalidatePath('/saved-themes')
  return savedTheme
}

export async function updateThemeType(
  themeId: number,
  isPublic: boolean
): Promise<SavedTheme> {
  const [updatedTheme] = await db
    .update(ThemesTable)
    .set({ public: isPublic })
    .where(eq(ThemesTable.id, themeId))
    .returning()
  revalidatePath('/saved-themes')
  return parseSavedTheme(updatedTheme)
}

export async function updateTheme(
  id: number,
  theme: Partial<Omit<SavedTheme, 'id' | 'createdAt' | 'updatedAt'>>
) {
  const updateData = {
    ...theme,
    updatedAt: new Date(),
    scheme: theme.scheme ? theme.scheme.toString() : undefined, // Convert enum to string if present
  }

  const result = await db
    .update(ThemesTable)
    .set(updateData)
    .where(eq(ThemesTable.id, id))
    .returning()
  const updatedTheme = parseSavedTheme(result[0])
  revalidatePath('/saved-themes')
  return updatedTheme
}

export async function deleteTheme(themeId: number) {
  await db.delete(ThemesTable).where(eq(ThemesTable.id, themeId))
  revalidatePath('/saved-themes')
}

export async function downloadThemeVSIX(
  themeId: number
): Promise<Buffer | null> {
  const theme = await getThemeById(themeId)
  if (!theme) return null

  const vsixBuffer = await generateVSIX(theme)
  return vsixBuffer
}

function parseSavedTheme(rawTheme: any): SavedTheme {
  const parsedTheme = {
    ...rawTheme,
    uiColors: safeJsonParse(rawTheme.uiColors),
    syntaxColors: safeJsonParse(rawTheme.syntaxColors),
    ansiColors: safeJsonParse(rawTheme.ansiColors),
    scheme:
      ColorScheme[rawTheme.scheme as keyof typeof ColorScheme] ??
      rawTheme.scheme,
    createdAt: new Date(rawTheme.createdAt),
    updatedAt: new Date(rawTheme.updatedAt),
  }

  try {
    return SavedThemeSchema.parse(parsedTheme)
  } catch (error) {
    console.error('Error parsing theme:', error)
    console.log('Raw theme data:', rawTheme)
    console.log('Parsed theme data:', parsedTheme)
    throw error
  }
}

function safeJsonParse(value: any) {
  if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      console.error('Error parsing JSON:', error)
      return value
    }
  }
  return value
}
