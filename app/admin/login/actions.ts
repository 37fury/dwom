'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

// Admin email whitelist - add authorized admin emails here
const ADMIN_EMAILS = [
    'admin@dwom.store',
    'dahlinmdesousa@gmail.com', // Add your admin emails here
];

export async function isAdminEmail(email: string): Promise<boolean> {
    return ADMIN_EMAILS.includes(email.toLowerCase());
}

export async function adminLogin(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    // Check if email is in admin whitelist FIRST
    if (!(await isAdminEmail(data.email))) {
        return redirect('/admin/login?error=unauthorized')
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return redirect(`/admin/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard/admin')
}

export async function getAdminUser() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return null
    if (!(await isAdminEmail(user.email || ''))) return null

    return user
}
