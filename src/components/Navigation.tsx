import Link from 'next/link'
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { Button } from './ui/button'

const Navigation = () => {
  return (
    <nav className="bg-background text-foreground p-4 sticky top-0 z-50 shadow-b-xl border-b border-border">
      <div className="mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          VSCode Themes Community
        </Link>
        <div className="flex gap-4 items-center ">
          <Link href="/discover">Discover</Link>
          <SignedIn>
            <Link href="/generator">Create</Link>
            <Link href="/saved-themes">Your Themes</Link>
            <Link href="/profile">Profile</Link>
            <UserButton />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <Button>Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button variant="secondary">Sign Up</Button>
            </SignUpButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}
export default Navigation
