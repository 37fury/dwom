'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function submitLinkAction(campaignId: string, url: string) {
    // Basic validation
    if (!url || !url.startsWith('http')) {
        // ideally return error, but for now we throw or handle in UI if we changed return signature
        // The current call signature in MusicCampaignList expects a Promise<void> or similar?
        // Let's check the SubmissionModal prop type: (campaignId: string, url: string) => Promise<void>
        // So we just await it.
        return;
    }

    try {
        await db.createSubmission(campaignId, url);
        revalidatePath('/dashboard/affiliates/music');
        revalidatePath('/dashboard/affiliates'); // update main stats too if they exist
    } catch (e) {
        console.error('Submission Error:', e);
        // Fail silently or handle error if we updated UI to show it
    }
}
