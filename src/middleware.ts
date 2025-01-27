import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher(['/api(.*)', '/home(.*)', '/dashboard(.*)', '/notes(.*)', '/sessions']);

export default clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect()
})

export const config = {
    matcher: [
        '/((?!api/|_next|favicon.ico|images/logo.png|images/logo-512|robots.txt|manifest.webmanifest).*)',
        '/(trpc)(.*)',
    ]
}