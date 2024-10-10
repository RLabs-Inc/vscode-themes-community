/** @type {import('next').NextConfig} */
import { bundlerModuleNameResolver } from 'typescript'

const nextConfig = {
  experimental: {
    useWasmBinary: true,
    turbo: {
      rules: {
        '*.wasm': {
          loader: ['onigasm'],
          as: '*.wasm',
        },
      },
      resolveAlias: {
        'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api',
      },
    },
  },
}

export default nextConfig
