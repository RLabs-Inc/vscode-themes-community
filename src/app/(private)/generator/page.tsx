'use client'

import { useUser } from '@clerk/nextjs'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { ThemeGenerator } from '@/components/ThemeGenerator'
import Navigation from '@/components/Navigation'

export default function GeneratorPage() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  if (!isSignedIn) {
    return <div>Please sign in to access the theme generator.</div>
  }

  return (
    <ThemeProvider userId={user.id}>
      <div>
        <ThemeGenerator />
      </div>
    </ThemeProvider>
  )
}
