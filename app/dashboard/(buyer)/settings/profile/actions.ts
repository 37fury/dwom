'use server';

import { db } from '@/app/lib/db';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfileAction(formData: FormData) {
    const rawData = {
        full_name: formData.get('full_name') as string,
        username: formData.get('username') as string,
        bio: formData.get('bio') as string,
        banner_url: formData.get('banner_url') as string,
        social_links: {
            twitter: formData.get('twitter') as string,
            instagram: formData.get('instagram') as string,
            website: formData.get('website') as string,
            youtube: formData.get('youtube') as string,
        }
    };

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return { success: false, error: 'Unauthorized' };

    const result = await db.updateProfile(user.id, rawData);

    if (result.success) {
        revalidatePath('/dashboard/settings/profile');
        revalidatePath(`/store/${rawData.username}`);
        return { success: true };
    } else {
        return { success: false, error: result.error };
    }
}
