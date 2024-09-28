/** @type {import('next').NextConfig} */
import { bundlerModuleNameResolver } from 'typescript'

const nextConfig = {
  experimental: {
    turbo: {
      resolveAlias: {
        'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api',
      },
    },
  },
}

export default nextConfig
