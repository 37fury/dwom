'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { sendEmail } from '@/app/lib/email'
import { EmailTemplates } from '@/app/lib/email-templates'

export async function login(formData: FormData) {
    const supabase = await createClient()

    // type-casting here for convenience
    // in a real application, you should invalidate these inputs and manage type-safety
    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const redirectTo = formData.get('redirect') as string || '/dashboard';

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}${redirectTo !== '/dashboard' ? `&redirect=${encodeURIComponent(redirectTo)}` : ''}`)
    }

    revalidatePath('/', 'layout')
    redirect(redirectTo)
}

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    }

    const redirectTo = formData.get('redirect') as string || '/dashboard';

    const { error } = await supabase.auth.signUp(data)

    if (error) {
        return redirect(`/login?message=${encodeURIComponent(error.message)}${redirectTo !== '/dashboard' ? `&redirect=${encodeURIComponent(redirectTo)}` : ''}`)
    }

    // Attempt to auto-login immediately
    const { error: signInError } = await supabase.auth.signInWithPassword(data);

    // SEND WELCOME EMAIL (Fire and forget, don't block auth flow)
    const emailTo = data.email;
    if (emailTo) {
        // We import dynamically or top-level. Top level is better.
        // But inside server action we need to be careful of context.
        // Let's rely on imports added to top of file.
        await sendEmail({
            to: emailTo,
            subject: 'Welcome to dwom!',
            html: EmailTemplates.welcome(emailTo.split('@')[0])
        }).catch(e => console.error('Failed to send welcome email:', e));
    }

    if (signInError) {
        return redirect(`/login?message=Account created. Please log in.${redirectTo !== '/dashboard' ? `&redirect=${encodeURIComponent(redirectTo)}` : ''}`)
    }

    revalidatePath('/', 'layout')
    redirect(redirectTo)
}

export async function signout() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
