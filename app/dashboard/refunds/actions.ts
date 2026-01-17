'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function requestRefundAction(orderId: string, reason: string) {
    const result = await db.requestRefund(orderId, reason);

    if (result.success) {
        // Create notification
        const user = await db.getUser();
        if (user) {
            await db.createNotification(
                user.id,
                'system',
                'Refund Request Submitted',
                'Your refund request has been submitted and is being reviewed.',
                '/dashboard/refunds'
            );
        }
        revalidatePath('/dashboard/refunds');
    }

    return result;
}

export async function getRefundsAction() {
    return await db.getRefundRequests();
}
