import type { Metadata } from 'next'
import './globals.css'

import { Inter } from 'next/font/google'

import { ThemeProvider } from 'next-themes'
import { ClerkProvider } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { dark } from '@clerk/themes'

import { Toaster } from '@/components/ui/toaster'
import Navigation from '@/components/Navigation'
import { ThemeProvider as ThemeProviderContext } from '@/contexts/ThemeContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'VSCode Themes Community',
  description: 'Create, share and discover VSCode themes',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { userId } = auth()
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <ThemeProviderContext userId={userId ?? undefined}>
              <Navigation />
              {children}
              <Toaster />
            </ThemeProviderContext>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
