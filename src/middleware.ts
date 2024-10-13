import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// Define routes that should be protected
const isProtectedRoute = createRouteMatcher([
  // '/generator(.*)',
  '/saved-themes(.*)',
]) // Protect generator and its subroutes

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
