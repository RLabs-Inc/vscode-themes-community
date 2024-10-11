import { useCallback, useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

import type { editor } from 'monaco-editor'
import { loadWASM } from 'onigasm'
import { IGrammarDefinition, Registry, RegistryOptions } from 'monaco-textmate'
import { wireTmGrammars } from 'monaco-editor-textmate'
import { generateSemanticThemeJSON } from '@/lib/generator/export'
import { convertTheme } from '@/lib/utils/convertTheme'
import { SavedTheme } from '@/lib/types/colors'
import { useTheme } from '@/contexts/ThemeContext'
import {
  type CodeSnippetKey,
  codeSnippets as snippets,
} from '@/lib/utils/codeSnippets'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
})

export default function EditorSmall({
  theme,
  selectedFile = 'typescript.tsx',
}: {
  theme: SavedTheme
  selectedFile: CodeSnippetKey
}) {
  const editorRef = useRef<{
    editor: editor.IStandaloneCodeEditor
    monaco: typeof import('monaco-editor')
  } | null>(null)
  const { isOnigasmInitialized, setIsOnigasmInitialized } = useTheme()
  const [isEditorReady, setIsEditorReady] = useState(false)
  const getTheme = useCallback((): editor.IStandaloneThemeData => {
    const { themeObject } = generateSemanticThemeJSON(
      'Generated Color Theme',
      theme.uiColors,
      theme.syntaxColors,
      theme.ansiColors
    )

    return convertTheme(themeObject)
  }, [theme])

  const updateTheme = useCallback(() => {
    if (editorRef.current) {
      const { monaco, editor } = editorRef.current
      const theme = getTheme()
      const model = editor.getModel()
      if (model) {
        model.updateOptions({
          bracketColorizationOptions: {
            enabled: false,
            independentColorPoolPerBracketType: false,
          },
        })
      }
      monaco.editor.defineTheme('custom-theme', theme)
      monaco.editor.setTheme('custom-theme')
    }
  }, [getTheme])

  const setupTextmate = useCallback(async () => {
    if (!editorRef.current) return

    if (!isOnigasmInitialized) {
      await loadWASM('onigasm.wasm')
      setIsOnigasmInitialized(true)
    }

    const registry = new Registry({
      getGrammarDefinition: async (
        scopeName: string
      ): Promise<IGrammarDefinition> => {
        const grammarMap: { [key: string]: string } = {
          'source.tsx': 'TypeScriptReact.tmLanguage.json',
          'source.js.jsx': 'JavaScriptReact.tmLanguage.json',
          'source.ts': 'TypeScript.tmLanguage.json',
          'source.js': 'JavaScript.tmLanguage.json',
          'source.css': 'css.tmLanguage.json',
          'text.html.markdown': 'markdown.tmLanguage.json',
          'text.html.basic': 'html.tmLanguage.json',
          'source.python': 'MagicPython.tmLanguage.json',
          'source.yaml': 'yaml.tmLanguage.json',
        }

        if (scopeName in grammarMap) {
          try {
            const response = await fetch(grammarMap[scopeName])
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`)
            }
            const content = await response.text()

            return {
              format: 'json' as const,
              content,
            }
          } catch (error) {
            console.error(`Failed to load grammar for ${scopeName}:`, error)
          }
        }

        return {
          format: 'json',
          content: JSON.stringify({
            name: 'Default',
            scopeName: scopeName,
            patterns: [],
          }),
        }
      },
    } as RegistryOptions)

    try {
      await wireTmGrammars(
        editorRef.current.monaco,
        registry,
        new Map([
          ['typescript', 'source.tsx'],
          ['javascript', 'source.jsx'],
          ['typescript', 'source.ts'],
          ['javascript', 'source.js'],
          ['css', 'source.css'],
          ['markdown', 'text.html.markdown'],
          ['html', 'text.html.basic'],
          ['python', 'source.python'],
          ['yaml', 'source.yaml'],
        ])
      )
    } catch (error) {
      console.error('Error setting up TextMate:', error)
    }
  }, [isOnigasmInitialized, setIsOnigasmInitialized])

  const handleEditorDidMount = useCallback(
    (
      editor: editor.IStandaloneCodeEditor,
      monaco: typeof import('monaco-editor')
    ) => {
      editorRef.current = { editor, monaco }
      const model = editor.getModel()
      if (model) {
        model.updateOptions({
          bracketColorizationOptions: {
            enabled: false,
            independentColorPoolPerBracketType: false,
          },
        })
      }
      setIsEditorReady(true)
      setupTextmate()
      updateTheme()
    },
    [setupTextmate, updateTheme]
  )

  useEffect(() => {
    if (isEditorReady && editorRef.current) {
      updateTheme()
    }
  }, [isEditorReady, updateTheme])

  const getLanguage = (filename: string) => {
    const extension = filename.split('.').pop()
    switch (extension) {
      case 'js':
      case 'jsx':
        return 'javascript'
      case 'ts':
      case 'tsx':
        return 'typescript'
      case 'py':
        return 'python'
      case 'html':
        return 'html'
      case 'css':
        return 'css'
      case 'md':
        return 'markdown'
      case 'yaml':
        return 'yaml'
      default:
        return 'plaintext'
    }
  }

  return (
    <section className="h-full w-full">
      <div className="h-full w-full">
        <MonacoEditor
          height="100%"
          language={getLanguage(selectedFile)}
          value={snippets[selectedFile]}
          theme="custom-theme"
          options={{
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            fontSize: 13,
            readOnly: true,
            bracketPairColorization: {
              enabled: false,
              independentColorPoolPerBracketType: false,
            },
            'semanticHighlighting.enabled': true,
          }}
          onMount={handleEditorDidMount}
        />
      </div>
    </section>
  )
}
