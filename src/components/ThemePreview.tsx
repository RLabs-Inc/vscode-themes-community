import React, { useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'
import EditorSmall from './EditorSmall'
import { codeSnippets, type CodeSnippetKey } from '@/lib/utils/codeSnippets'

const ThemePreview: React.FC = () => {
  const {
    colors,
    syntaxColors,
    ansiColors,
    isDark,
    baseHue,
    uiSaturation,
    syntaxSaturation,
    scheme,
    isPublic,
  } = useTheme()

  const [selectedFile, setSelectedFile] =
    useState<CodeSnippetKey>('typescript.tsx')

  return (
    <section>
      <div
        style={{
          height: '800px',
          display: 'flex',
          flexDirection: 'column',
          border: `1px solid ${colors.BORDER}`,
        }}
      >
        {/* Mock VS Code title bar */}
        <div
          style={{
            backgroundColor: colors.BG3,
            padding: '5px 10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: colors.FG1 }} className="text-xs">
            VS Code Theme Preview
          </span>
          <span style={{ color: colors.FG2 }} className="text-xs">
            File Edit View Help
          </span>
        </div>

        <div style={{ display: 'flex', flex: 1 }} className="text-xs">
          {/* Mock VS Code sidebar */}
          <div
            style={{
              width: '25px',
              backgroundColor: colors.BG2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px 0',
            }}
          >
            <div
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: colors.AC1,
                marginBottom: '5px',
              }}
            ></div>
            <div
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: colors.AC2,
                marginBottom: '5px',
              }}
            ></div>
            <div
              style={{
                width: '15px',
                height: '15px',
                backgroundColor: colors.FG2,
              }}
            ></div>
          </div>

          {/* Mock VS Code explorer */}
          <div
            style={{
              width: '150px',
              backgroundColor: colors.BG2,
              borderRight: `1px solid ${colors.BORDER}`,
              padding: '10px',
            }}
          >
            <div style={{ color: colors.FG1, marginBottom: '5px' }}>
              EXPLORER
            </div>
            {Object.keys(codeSnippets).map((filename) => (
              <div
                key={filename}
                style={{
                  color: selectedFile === filename ? colors.AC1 : colors.FG2,
                  cursor: 'pointer',
                  marginLeft: '10px',
                  marginBottom: '5px',
                }}
                onClick={() => setSelectedFile(filename as CodeSnippetKey)}
              >
                📄 {filename}
              </div>
            ))}
          </div>

          {/* Monaco Editor */}
          <div style={{ flex: 1 }}>
            <EditorSmall
              theme={{
                isDark: isDark,
                id: 0,
                name: 'Custom',
                public: isPublic,
                baseHue: baseHue,
                uiSaturation: uiSaturation,
                syntaxSaturation: syntaxSaturation,
                scheme: scheme,
                uiColors: colors,
                syntaxColors: syntaxColors,
                ansiColors: ansiColors,
                userId: '',
                createdAt: new Date(),
                updatedAt: new Date(),
              }}
              selectedFile={selectedFile}
            />
          </div>
        </div>

        {/* Mock VS Code status bar */}
        <div
          style={{
            backgroundColor: colors.AC2,
            padding: '2px 10px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
          className="text-xs"
        >
          <span style={{ color: colors.FG3 }}>
            {selectedFile.split('.').pop()?.toUpperCase()}
          </span>
          <span style={{ color: colors.FG3 }}>Ln 1, Col 1</span>
        </div>
      </div>
      <p className="text-xs text-center mt-2">
        * This is a preview of the theme. The colors and tokens are not accurate
        because of limitations in monaco editor. The result in vscode can be
        more granular and slightly different.
      </p>
    </section>
  )
}

export default ThemePreview
