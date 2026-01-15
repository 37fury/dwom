'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function submitReviewAction(productId: string, formData: FormData) {
    const rating = Number(formData.get('rating'));
    const comment = formData.get('comment') as string;

    if (!rating || rating < 1 || rating > 5) {
        return { success: false, message: 'Invalid rating' };
    }

    const success = await db.createReview(productId, rating, comment);

    if (success) {
        revalidatePath(`/product/${productId}`);
        return { success: true };
    } else {
        return { success: false, message: 'Failed to submit review' };
    }
}
