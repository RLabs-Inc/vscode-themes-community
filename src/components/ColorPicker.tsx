import React from 'react'
import { HexAlphaColorPicker, HexColorInput } from 'react-colorful'
import { useTheme } from '../contexts/ThemeContext'

interface ColorPickerProps {
  color: string
  onChange: (color: string) => void
}

const ColorPicker: React.FC<ColorPickerProps> = ({ color, onChange }) => {
  const { activeColor } = useTheme()
  const handleInputChange = (value: string) => {
    if (value.startsWith('#') && value.length > 6) {
      onChange(value)
    }
  }

  return (
    <div className="color-picker flex flex-col gap-2 items-center justify-center">
      <HexAlphaColorPicker color={color} onChange={onChange} />

      <div className="flex gap-2 items-center">
        <h3 className="text-lg font-semibold first-letter:uppercase">
          {activeColor}
        </h3>
        <div className="w-[100px]">
          <HexColorInput
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-2 py-1 text-sm shadow-sm transition-colors text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
            color={color}
            prefixed
            alpha
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default ColorPicker
