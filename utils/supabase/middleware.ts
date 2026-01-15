
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // Check for required environment variables
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Missing Supabase environment variables')
        return supabaseResponse
    }

    const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Check auth status
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        if (request.nextUrl.pathname.startsWith('/dashboard') && !user) {
            const url = request.nextUrl.clone()
            url.pathname = '/login'
            return NextResponse.redirect(url)
        }

        if (user) {
            // Check if banned
            const { data: profile } = await supabase
                .from('profiles')
                .select('is_banned')
                .eq('id', user.id)
                .single();

            if (profile?.is_banned) {
                if (!request.nextUrl.pathname.startsWith('/banned') && !request.nextUrl.pathname.startsWith('/auth')) {
                    const url = request.nextUrl.clone()
                    url.pathname = '/banned'
                    return NextResponse.redirect(url)
                }
            }
        }
    } catch (error) {
        console.error('Middleware auth error:', error)
    }

    return supabaseResponse
}

