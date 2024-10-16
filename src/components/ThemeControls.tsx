'use client'

import React, { useEffect, useState } from 'react'

import { useTheme } from '@/contexts/ThemeContext'

import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

import { ModeToggle } from './ModeToggle'
import ThemeSaver from './ThemeSaver'

import { ColorScheme } from '@/lib/types/colors'
import { randomInteger } from '@/lib/utils/math'
import { ThemeLoader } from './ThemeLoader'
import { useUser } from '@clerk/nextjs'

const ThemeControls: React.FC = () => {
  const { user } = useUser()
  const [themeName, setThemeName] = useState<string>('')

  const {
    isDark,
    isPublic,
    baseHue,
    scheme,
    uiSaturation,
    syntaxSaturation,
    lockedColors,
    setIsPublic,
    setBaseHue,
    setUiSaturation,
    setSyntaxSaturation,
    setScheme,
    generateColors,
    regenerateAnsiColors,
    setCurrentThemeId,
  } = useTheme()

  const handleRandomize = (few = false) => {
    const newBaseHue = Math.floor(Math.random() * 360)
    const newUiSaturation = randomInteger(15, 65)
    const newSyntaxSaturation = randomInteger(20, 65)
    const schemeValues = Object.values(ColorScheme).filter(
      (value) => typeof value === 'number'
    ) as number[]
    const newScheme = schemeValues[
      Math.floor(Math.random() * schemeValues.length)
    ] as ColorScheme

    // Update the state values immediately
    setBaseHue(newBaseHue)
    setUiSaturation(newUiSaturation)
    setSyntaxSaturation(newSyntaxSaturation)
    setScheme(newScheme)
    setCurrentThemeId(null)
    setThemeName('')
    setIsPublic(false)

    // Then generate colors with these new values
    generateColors({
      isDark,
      baseHue: newBaseHue,
      uiSaturation: newUiSaturation,
      syntaxSaturation: newSyntaxSaturation,
      scheme: newScheme,
      lockedColors: Array.from(lockedColors),
      forceRegenerate: true,
      few: true,
    })
  }

  const handleRegenerateUnlockedColors = () => {
    // Add small random variations to the current values
    const hueVariation = Math.floor(Math.random() * 30) - 15 // -15 to +15
    const saturationVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10
    const syntaxSaturationVariation = Math.floor(Math.random() * 20) - 10 // -10 to +10

    const newBaseHue = (baseHue + hueVariation + 360) % 360
    const newUiSaturation = Math.max(
      0,
      Math.min(100, uiSaturation + saturationVariation)
    )
    const newSyntaxSaturation = Math.max(
      0,
      Math.min(100, syntaxSaturation + syntaxSaturationVariation)
    )

    setBaseHue(newBaseHue)
    setUiSaturation(newUiSaturation)
    setSyntaxSaturation(newSyntaxSaturation)

    generateColors({
      isDark,
      baseHue: newBaseHue,
      uiSaturation: newUiSaturation,
      syntaxSaturation: newSyntaxSaturation,
      scheme,
      lockedColors: Array.from(lockedColors),
      forceRegenerate: true,
      few: true,
    })
  }

  const getSaturationGradient = (baseHue: number) => `
    linear-gradient(to right, 
      hsl(${baseHue}, 0%, 50%), 
      hsl(${baseHue}, 100%, 50%)
    )
  `

  const handleSchemeChange = (newScheme: ColorScheme) => {
    setScheme(newScheme)
    generateColors({
      scheme: newScheme,
      forceRegenerate: true,
      few: true,
    })
  }

  return (
    <section className="flex flex-col gap-5 w-full">
      <h2 className="text-xl font-semibold">Theme Controls</h2>
      {!user && (
        <p className="text-xs text-muted-foreground">
          You must be logged in to save and/or download created themes.
        </p>
      )}
      <TooltipProvider>
        <div className="flex gap-5">
          <div className="flex flex-1 items-end gap-4">
            <div className="flex-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div>
                    <label className="text-xs">Color Scheme:</label>
                    <Select
                      onValueChange={(value) =>
                        handleSchemeChange(Number(value) as ColorScheme)
                      }
                      value={scheme.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Color Scheme">
                          {
                            Object.entries(ColorScheme).filter(
                              ([key, value]) => value === scheme
                            )[0][0]
                          }
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(ColorScheme)
                          .filter(([key]) => isNaN(Number(key)))
                          .map(([key, value]) => (
                            <SelectItem key={key} value={value as string}>
                              {key}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    Choose a color harmony scheme to generate complementary
                    colors
                  </p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <ModeToggle />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Switch between dark and light theme modes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col gap-2">
                <label className="text-xs">Base Hue:</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Slider
                      value={[baseHue]}
                      min={0}
                      max={359}
                      step={1}
                      bg={`linear-gradient(to right, 
                            hsl(0, 100%, 50%), 
                            hsl(60, 100%, 50%), 
                            hsl(120, 100%, 50%), 
                            hsl(180, 100%, 50%), 
                            hsl(240, 100%, 50%), 
                            hsl(300, 100%, 50%), 
                            hsl(360, 100%, 50%))`}
                      onValueChange={(value) => setBaseHue(value[0])}
                    />
                  </div>
                  {/* <span className="ml-2 w-8 text-right text-xs">
                        {baseHue}
                      </span> */}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Set the primary color of your theme. This affects overall color
                tone
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col gap-2">
                <label className="text-xs">UI Saturation:</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Slider
                      value={[uiSaturation]}
                      min={0}
                      max={100}
                      step={1}
                      bg={getSaturationGradient(baseHue)}
                      onValueChange={(value: number[]) =>
                        setUiSaturation(value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Adjust color intensity for user interface elements. Higher
                values result in more vivid colors
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex flex-col gap-2">
                <label className="mr-2 text-xs">Syntax Saturation:</label>
                <div className="flex items-center gap-2">
                  <div className="flex-grow">
                    <Slider
                      value={[syntaxSaturation]}
                      min={0}
                      max={100}
                      step={1}
                      bg={getSaturationGradient(baseHue)}
                      onValueChange={(value: number[]) =>
                        setSyntaxSaturation(value[0])
                      }
                    />
                  </div>
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Control color intensity for syntax highlighting. Higher values
                make code colors more vibrant
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full text-xs"
                size="sm"
                onClick={() => handleRandomize(false)}
              >
                Randomize Full
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Generate a completely new random theme using the base hue to
                generate the UI colors and add the two accent colors to generate
                the Syntax colors.
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full text-xs"
                size="sm"
                onClick={() => handleRandomize(true)}
              >
                Randomize with Few Colors
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Generate a completely new random theme using only base hue to
                generate all colors.
              </p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full text-xs"
                size="sm"
                onClick={handleRegenerateUnlockedColors}
              >
                Regenerate Unlocked
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Slightly adjust the current theme, keeping locked colors
                unchanged
              </p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                className="w-full text-xs"
                size="sm"
                onClick={regenerateAnsiColors}
              >
                Regenerate ANSI Colors
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Regenerate terminal colors based on the current theme</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex flex-col justify-between gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeLoader setThemeName={setThemeName} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Load a theme from your saved themes</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <ThemeSaver themeName={themeName} setThemeName={setThemeName} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Save the current theme to your themes</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </section>
  )
}

export default ThemeControls
