import { randomInteger, randomNumber } from '@/lib/utils/math'
import { adjustCommentColor, ensureReadability } from './colorUtils'
import { SyntaxColors } from '@/lib/types/colors'
import Color from 'color'

export function generateSyntaxColors(
  backgroundColor: string,
  schemeHues: number[],
  syntaxSaturation: number = 70,
  lockedColors: Partial<SyntaxColors> = {}
): SyntaxColors {
  const baseColor = Color(backgroundColor)
  const isDark = baseColor.isDark()
  const baseLightness = isDark ? 80 : 25
  const inverseBaseLightness = isDark ? 15 : 85

  const generateColor = (
    hueIndex: number,
    saturationMultiplier: number = 1,
    lightnessShift: number = 0,
    hueShift: number = 0,
    highContrast: boolean = true
  ) => {
    const hue = (schemeHues[hueIndex % schemeHues.length] + hueShift) % 360
    const saturation = Math.max(
      2,
      Math.min(100, syntaxSaturation * saturationMultiplier)
    )
    const lightness = Math.min(
      100,
      Math.max(
        0,
        highContrast
          ? baseLightness + lightnessShift
          : inverseBaseLightness - lightnessShift
      )
    )
    return Color.hsl(hue, saturation, lightness).hex()
  }

  const functionHueIndex = randomInteger(0, schemeHues.length - 1)
  const variableHueIndex = randomInteger(0, schemeHues.length - 1)
  const typeHueIndex = randomInteger(0, schemeHues.length - 1)
  const punctuationHueIndex = randomInteger(0, schemeHues.length - 1)
  const tagHueIndex = randomInteger(0, schemeHues.length - 1)
  const controlHueIndex = randomInteger(0, schemeHues.length - 1)

  const syntaxColors: SyntaxColors = {
    keyword:
      lockedColors.keyword ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 13)
      ),
    comment:
      lockedColors.comment ||
      generateColor(randomInteger(0, schemeHues.length - 1), 0.5, 0, 0, false),
    function:
      lockedColors.function ||
      generateColor(
        functionHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(0, 7)
      ),
    functionCall:
      lockedColors.functionCall ||
      generateColor(
        functionHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(5, 13),
        randomInteger(13, 26)
      ),
    variable:
      lockedColors.variable ||
      generateColor(
        variableHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(0, 3)
      ),
    variableDeclaration:
      lockedColors.variableDeclaration ||
      generateColor(
        variableHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(0, 9),
        randomInteger(13, 26)
      ),
    variableProperty:
      lockedColors.variableProperty ||
      generateColor(
        variableHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(0, 6),
        randomInteger(17, 39)
      ),
    type:
      lockedColors.type ||
      generateColor(
        typeHueIndex,
        randomNumber(0.75, 1.25),
        randomInteger(0, 5)
      ),
    typeParameter:
      lockedColors.typeParameter ||
      generateColor(
        typeHueIndex,
        randomNumber(0.75, 1.25),
        -randomInteger(0, 5),
        randomInteger(15, 27)
      ),
    constant:
      lockedColors.constant ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 9)
      ),
    class:
      lockedColors.class ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 3)
      ),
    parameter:
      lockedColors.parameter ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 7)
      ),
    property:
      lockedColors.property ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(3, 9)
      ),
    operator:
      lockedColors.operator ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 13)
      ),
    storage:
      lockedColors.storage ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 5)
      ),
    punctuation:
      lockedColors.punctuation ||
      generateColor(
        punctuationHueIndex,
        randomNumber(0.7, 1.25),
        randomInteger(3, 15)
      ),
    punctuationQuote:
      lockedColors.punctuationQuote ||
      generateColor(
        punctuationHueIndex,
        randomNumber(0.7, 1.25),
        randomInteger(5, 23),
        randomInteger(5, 17)
      ),
    punctuationBrace:
      lockedColors.punctuationBrace ||
      generateColor(
        punctuationHueIndex,
        randomNumber(0.7, 1.25),
        randomInteger(6, 19),
        randomInteger(7, 21)
      ),
    punctuationComma:
      lockedColors.punctuationComma ||
      generateColor(
        punctuationHueIndex,
        randomNumber(0.7, 1.25),
        randomInteger(5, 23),
        randomInteger(0, 15)
      ),
    selector:
      lockedColors.selector ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 7)
      ),
    modifier:
      lockedColors.modifier ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 5)
      ),
    other:
      lockedColors.other ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        -randomInteger(0, 6)
      ),
    language:
      lockedColors.language ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        -randomInteger(0, 9)
      ),
    control:
      lockedColors.control ||
      generateColor(
        controlHueIndex,
        randomNumber(0.75, 1.25),
        -randomInteger(0, 13)
      ),
    controlFlow:
      lockedColors.controlFlow ||
      generateColor(
        controlHueIndex,
        randomNumber(0.75, 1.25),
        -randomInteger(0, 5),
        randomInteger(15, 27)
      ),
    controlImport:
      lockedColors.controlImport ||
      generateColor(
        controlHueIndex,
        randomNumber(0.75, 1.25),
        -randomInteger(0, 7),
        randomInteger(9, 17)
      ),
    tag:
      lockedColors.tag ||
      generateColor(tagHueIndex, randomNumber(0.75, 1.25), randomInteger(3, 9)),
    tagPunctuation:
      lockedColors.tagPunctuation ||
      generateColor(
        tagHueIndex,
        randomNumber(0.5, 1.25),
        randomInteger(0, 6),
        randomInteger(9, 17)
      ),
    attribute:
      lockedColors.attribute ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 10)
      ),
    support:
      lockedColors.support ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        -randomInteger(0, 7)
      ),
    unit:
      lockedColors.unit ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        -randomInteger(0, 5)
      ),
    datetime:
      lockedColors.datetime ||
      generateColor(
        randomInteger(0, schemeHues.length - 1),
        randomNumber(0.75, 1.25),
        randomInteger(0, 5)
      ),
  }

  // Ensure readability and harmony
  Object.keys(syntaxColors).forEach((key) => {
    if (!lockedColors[key as keyof SyntaxColors]) {
      syntaxColors[key as keyof SyntaxColors] = ensureReadability(
        syntaxColors[key as keyof SyntaxColors],
        backgroundColor,
        5.5
      )
    }
  })

  // Apply the new comment color adjustment
  if (!lockedColors.comment) {
    syntaxColors.comment = adjustCommentColor(
      syntaxColors.comment,
      backgroundColor,
      isDark ? 3 : 1.5, // minContrast
      isDark ? 3.25 : 2.5 // maxContrast
    )
  }

  return syntaxColors
}

export function updateSyntaxColorsWithSaturation(
  currentColors: SyntaxColors,
  newSyntaxSaturation: number,
  backgroundColor: string,
  lockedColors: Set<string>
): SyntaxColors {
  const updateColorSaturation = (
    color: string,
    saturationMultiplier: number
  ) => {
    const hsl = Color(color).hsl()
    let newSaturation = Math.max(
      2,
      Math.min(100, newSyntaxSaturation * saturationMultiplier)
    )
    return Color.hsl(hsl.hue(), newSaturation, hsl.lightness()).hex()
  }

  const updatedColors: SyntaxColors = { ...currentColors }

  const saturationMultipliers = {
    keyword: 1,
    comment: 0.5,
    function: 1,
    functionCall: 1,
    variable: 1,
    variableDeclaration: 1,
    variableProperty: 1,
    type: 1,
    typeParameter: 1,
    constant: 1,
    class: 1,
    parameter: 1,
    property: 1,
    operator: 1,
    storage: 1,
    punctuation: 0.8,
    punctuationQuote: 0.8,
    punctuationBrace: 0.8,
    punctuationComma: 0.8,
    selector: 1,
    modifier: 1,
    other: 1,
    language: 1,
    control: 1,
    controlFlow: 1,
    controlImport: 1,
    tag: 1,
    tagPunctuation: 1,
    attribute: 1,
    support: 1,
    unit: 1,
    datetime: 1,
  }

  Object.keys(updatedColors).forEach((key) => {
    if (key !== 'comment') {
      if (!lockedColors.has(key)) {
        updatedColors[key as keyof SyntaxColors] = updateColorSaturation(
          currentColors[key as keyof SyntaxColors],
          saturationMultipliers[key as keyof typeof saturationMultipliers]
        )
      }
    }
  })

  // Ensure readability
  Object.keys(updatedColors).forEach((key) => {
    if (key !== 'comment') {
      if (!lockedColors.has(key)) {
        updatedColors[key as keyof SyntaxColors] = ensureReadability(
          updatedColors[key as keyof SyntaxColors],
          backgroundColor,
          5.5
        )
      }
    }
  })

  return updatedColors
}
