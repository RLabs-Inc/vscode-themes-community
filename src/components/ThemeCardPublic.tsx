import Link from 'next/link'

type ThemeCardPublicProps = {
  theme: {
    id: number
    name: string
    author: string
    downloads: number
  }
}

const ThemeCardPublic: React.FC<ThemeCardPublicProps> = ({ theme }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-2">{theme.name}</h2>
      <p className="text-gray-600 mb-2">by {theme.author}</p>
      <p className="text-sm text-gray-500 mb-4">{theme.downloads} downloads</p>
      <Link
        href={`/theme/${theme.id}`}
        className="text-blue-500 hover:underline"
      >
        View Theme
      </Link>
    </div>
  )
}

export default ThemeCardPublic
