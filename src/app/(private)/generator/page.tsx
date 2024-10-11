import { ThemeGenerator } from '@/components/ThemeGenerator'
import { auth } from '@clerk/nextjs/server'

export default async function GeneratorPage() {
  const { userId } = auth()

  return (
    <main>
      <ThemeGenerator />
    </main>
  )
}
