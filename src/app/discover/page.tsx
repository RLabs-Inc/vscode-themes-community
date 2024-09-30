import Navigation from '@/components/Navigation'
import ThemeCard from '@/components/ThemeCard'

// This will be replaced with actual data fetching logic
const mockThemes = [
  { id: 1, name: 'Cool Blue', author: 'John Doe', downloads: 1000 },
  { id: 2, name: 'Forest Green', author: 'Jane Smith', downloads: 750 },
  { id: 3, name: 'Midnight Purple', author: 'Bob Johnson', downloads: 500 },
]

export default function DiscoverPage() {
  return (
    <div>
      <Navigation />
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-3xl font-bold mb-4">Discover Themes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      </main>
    </div>
  )
}
