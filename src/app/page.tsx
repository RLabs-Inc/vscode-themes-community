import Navigation from '@/components/Navigation'
import Link from 'next/link'

export default function Home() {
  return (
    <div>
      <main className="container mx-auto mt-8 p-4">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to VSCode Themes Community
        </h1>
        <p className="text-xl mb-4">
          Generate, edit, download, share, and discover new themes for Visual
          Studio Code.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Create a Theme</h2>
            <p>
              Use our powerful theme generator to create your perfect VSCode
              theme.
            </p>
            <Link
              href="/generator"
              className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded"
            >
              Get Started
            </Link>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">Discover Themes</h2>
            <p>Browse and download themes created by the community.</p>
            <Link
              href="/discover"
              className="mt-2 inline-block bg-green-500 text-white px-4 py-2 rounded"
            >
              Explore Themes
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
