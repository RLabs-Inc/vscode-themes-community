import Link from 'next/link'
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

const Navigation = () => {
  return (
    <nav className="bg-background text-foreground p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          VSCode Themes Community
        </Link>
        <div className="flex gap-4 items-center ">
          <Link href="/discover">Discover</Link>
          <Link href="/generator">Create</Link>
          <SignedIn>
            <Link href="/profile">Profile</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
export default Navigation
