'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  UserButton,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'

const routes = [
  {
    href: '/',
    label: 'VSCode Themes Community',
  },
  {
    href: '/discover',
    label: 'Discover',
  },
  {
    href: '/generator',
    label: 'Create',
  },
  {
    href: '/saved-themes',
    label: 'Your Themes',
  },
]

export function Navigation() {
  const [isOpen, setIsOpen] = React.useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="p-4">
        <div className="hidden md:flex h-full justify-between items-center">
          <Link href="/" className="font-bold">
            VSCode Themes Community
          </Link>
          <div className="flex gap-4 items-center text-base">
            <Link
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/discover'
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
              href="/discover"
            >
              Discover
            </Link>
            <Link
              className={cn(
                'transition-colors hover:text-foreground/80',
                pathname === '/generator'
                  ? 'text-foreground'
                  : 'text-foreground/60'
              )}
              href="/generator"
            >
              Create
            </Link>
            <SignedIn>
              <Link
                className={cn(
                  'transition-colors hover:text-foreground/80',
                  pathname === '/saved-themes'
                    ? 'text-foreground'
                    : 'text-foreground/60'
                )}
                href="/saved-themes"
              >
                Your Themes
              </Link>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm">Sign In</Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button size="sm" variant="secondary">
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <MobileLink
              href="/"
              className="flex items-center"
              onOpenChange={setIsOpen}
            >
              <span className="font-bold">VSCode Themes Community</span>
            </MobileLink>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                <MobileLink href="/discover" onOpenChange={setIsOpen}>
                  Discover
                </MobileLink>
                <MobileLink href="/generator" onOpenChange={setIsOpen}>
                  Create
                </MobileLink>
                <SignedIn>
                  <MobileLink href="/saved-themes" onOpenChange={setIsOpen}>
                    Your Themes
                  </MobileLink>
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <Button size="sm">Sign In</Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" variant="secondary">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </SignedOut>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

interface MobileLinkProps extends React.PropsWithChildren {
  href: string
  onOpenChange?: (open: boolean) => void
  className?: string
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={cn(
        className,
        'text-foreground/70 transition-colors hover:text-foreground',
        isActive && 'text-foreground'
      )}
    >
      {children}
    </Link>
  )
}
