'use server';

import { db } from '../../../../lib/db';
import { redirect } from 'next/navigation';
import { CampaignType } from '../../../../lib/db';

export async function createCampaignAction(formData: FormData, fileUrls: { audioUrl: string, coverImageUrl: string }) {

    const type = (formData.get('type') as CampaignType) || 'music';
    const customType = formData.get('customType') as string | null;
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const budget = parseFloat(formData.get('budget') as string);
    const ratePer1kViews = parseFloat(formData.get('rate') as string);
    const requirements = formData.get('requirements') as string;

    await db.createCampaign({
        type,
        customType: customType || undefined,
        title,
        subtitle,
        budget,
        ratePer1kViews,
        requirements,
        audioUrl: fileUrls.audioUrl || undefined,
        coverImage: fileUrls.coverImageUrl || '/placeholder.svg',
        // Legacy fields for backwards compatibility
        artistName: subtitle,
        songTitle: title
    });

    redirect('/dashboard/seller/promotions');
}
