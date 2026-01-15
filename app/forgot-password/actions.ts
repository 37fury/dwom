'use server'

import { createClient } from '@/utils/supabase/server'
import { sendEmail } from '@/app/lib/email'
import { EmailTemplates } from '@/app/lib/email-templates'

export async function requestPasswordReset(formData: FormData) {
    const email = formData.get('email') as string;

    if (!email) {
        return { success: false, error: 'Email is required' };
    }

    const supabase = await createClient();

    // This uses Supabase's built-in password reset
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password`,
    });

    if (error) {
        console.error('Password reset error:', error);
        // Don't reveal if email exists or not for security
        return { success: true, message: 'If an account exists with this email, you will receive a reset link.' };
    }

    return { success: true, message: 'If an account exists with this email, you will receive a reset link.' };
}

export async function confirmPasswordReset(formData: FormData) {
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (!password || password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
    }

    if (password !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' };
    }

    const supabase = await createClient();

    const { error } = await supabase.auth.updateUser({
        password: password
    });

    if (error) {
        console.error('Password update error:', error);
        return { success: false, error: error.message };
    }

    return { success: true, message: 'Password updated successfully!' };
}
