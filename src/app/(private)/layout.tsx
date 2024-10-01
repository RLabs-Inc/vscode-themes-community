import Navigation from '@/components/Navigation'
import { auth } from '@clerk/nextjs/server'

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  auth().protect()

  return <section>{children}</section>
}
