import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/', '/without_internet', '/favicon.ico', '/sign-in(.*)', '/sign-up(.*)']);

export default clerkMiddleware(async (auth, request): Promise<void> => {
    if (!isPublicRoute(request)) {
        await auth.protect()
    }
})

export const config = {
    matcher: [
        '/((?!api/|_next|favicon.ico|images/logo.png|images/logo-512|robots.txt|manifest.webmanifest).*)',
        '/(trpc)(.*)',
    ]
}