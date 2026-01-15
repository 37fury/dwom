'use server';

import { db } from '../../lib/db';

export async function getOrCreateAffiliateLinkAction(productId: string) {
    const user = await db.getUser();
    if (!user) return { success: false, error: 'Authorization required' };

    // Check existing
    const existing = await db.getAffiliateLink(productId);
    if (existing) {
        return { success: true, code: existing.code };
    }

    // Create new
    const result = await db.createAffiliateLink(productId);
    return result;
}
