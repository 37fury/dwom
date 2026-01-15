import { NextResponse } from 'next/server'
// The client you created from the Server-Side Auth instructions
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get('code')
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get('next') ?? '/'

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // Check for referral cookie
            const { cookies } = await import('next/headers')
            const cookieStore = await cookies()
            const refCode = cookieStore.get('dwom_ref')?.value

            if (refCode) {
                // We need the user ID. 'supabase.auth.exchangeCodeForSession(code)' sets the session
                const { data: { user } } = await supabase.auth.getUser()
                if (user) {
                    // Import db dynamically to avoid circular deps if any (though route handlers are fine)
                    const { db } = await import('@/app/lib/db')
                    await db.createReferral(refCode, user.id)
                }
            }

            const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
            const isLocalEnv = process.env.NODE_ENV === 'development'
            if (isLocalEnv) {
                // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
                return NextResponse.redirect(`${origin}${next}`)
            } else if (forwardedHost) {
                return NextResponse.redirect(`https://${forwardedHost}${next}`)
            } else {
                return NextResponse.redirect(`${origin}${next}`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
