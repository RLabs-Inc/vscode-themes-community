import '@/drizzle/envConfig'
import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  schema: './src/lib/drizzle/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.POSTGRES_URL as string,
  },
})
