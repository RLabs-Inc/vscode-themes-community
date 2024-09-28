/** @type {import('next').NextConfig} */
import importMetaUrlPlugin from '@codingame/esbuild-import-meta-url-plugin'
import { bundlerModuleNameResolver } from 'typescript'

const nextConfig = {
  experimental: {
    turbo: {
      // resolveAlias: {
      //   'monaco-editor': 'monaco-editor/esm/vs/editor/editor.api',
      // },

      resolve: {
        plugins: [bundlerModuleNameResolver],
      },
    },
  },
}

export default nextConfig
