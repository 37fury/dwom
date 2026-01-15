'use server'

import { db } from '@/app/lib/db'
import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateProfileAction(userId: string, formData: FormData) {
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const avatarFile = formData.get('avatar') as File | null

    let avatarUrl = undefined;

    if (avatarFile && avatarFile.size > 0 && avatarFile.name !== 'undefined') {
        const supabase = await createClient();
        const { data, error } = await supabase.storage
            .from('avatars')
            .upload(`public/${userId}-${Date.now()}.png`, avatarFile, {
                upsert: true
            })

        if (!error && data) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
            avatarUrl = publicUrl;
        }
    }

    const result = await db.updateProfile(userId, { name, email, ...(avatarUrl && { avatar_url: avatarUrl }) })

    if (result.success) {
        revalidatePath('/dashboard/settings')
    }

    return result.success
}

export async function submitVerificationAction(userId: string, formData: FormData) {
    const provider = formData.get('provider') as string
    const number = formData.get('number') as string
    const docFile = formData.get('document') as File | null

    let docUrl = undefined;

    if (docFile && docFile.size > 0 && docFile.name !== 'undefined') {
        const supabase = await createClient();
        const { data, error } = await supabase.storage
            .from('avatars') // Ideally use a private bucket 'documents', but using avatars for MVP simplicity logic
            .upload(`documents/${userId}-${Date.now()}-${docFile.name}`, docFile, {
                upsert: true
            })

        if (!error && data) {
            const { data: { publicUrl } } = supabase.storage.from('avatars').getPublicUrl(data.path);
            docUrl = publicUrl;
        }
    }

    const success = await db.submitVerification(userId, { provider, number, documentUrl: docUrl })

    if (success) {
        revalidatePath('/dashboard/settings')
    }

    return success
}

export async function changePasswordAction(formData: FormData) {
    const newPassword = formData.get('newPassword') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (newPassword !== confirmPassword) {
        return { success: false, error: 'Passwords do not match' }
    }

    const supabase = await createClient()
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
        return { success: false, error: error.message }
    }

    return { success: true }
}
