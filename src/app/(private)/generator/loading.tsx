import { Loader2 } from 'lucide-react'

// src/app/saved-themes/loading.tsx
export default function Loading() {
  return (
    <section className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center gap-4">
        <Loader2 className="h-4 w-4 animate-spin" />
        <p>Loading theme generator...</p>
      </div>
    </section>
  )
}
