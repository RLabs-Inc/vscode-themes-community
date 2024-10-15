import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function Home() {
  return (
    <main className="p-10">
      <div className="flex flex-col items-center justify-between h-[calc(100vh-11rem)]">
        <div></div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to VSCode Themes Community
          </h1>
          <p className="text-xl mb-4 text-muted-foreground">
            Generate, edit, download, share, and discover new themes for Visual
            Studio Code.
          </p>
        </div>
        <div className="flex flex-wrap md:flex-nowrap items-stretch justify-center gap-10">
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Discover Themes</CardTitle>
              <CardDescription>
                Browse and download install-ready themes created by the
                community.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p></p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/discover">Explore Themes</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="flex-1">
            <CardHeader>
              <CardTitle>Create a Theme</CardTitle>
              <CardDescription>
                Create and edit your next VSCode theme in a tool with a newly
                designed algorithm that uses sacred geometry patterns to
                generate harmonized and pleasent colors to use in your theme.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p></p>
            </CardContent>
            <CardFooter>
              <Button>
                <Link href="/generator">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </main>
  )
}
