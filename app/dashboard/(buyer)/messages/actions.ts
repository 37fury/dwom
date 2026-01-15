'use server';

import { db } from '@/app/lib/db';
import { revalidatePath } from 'next/cache';

export async function sendMessageAction(conversationId: string, content: string) {
    try {
        await db.sendMessage(conversationId, content);
        revalidatePath(`/dashboard/messages`);
        return { success: true };
    } catch (error) {
        console.error('SendMessage Error:', error);
        return { success: false };
    }
}

export async function startConversationAction(targetUserId: string) {
    try {
        const conversationId = await db.createConversationIfNotExists(targetUserId);
        return { success: true, conversationId };
    } catch (error: any) {
        if (error.message === 'Unauthorized' || error.message?.includes('Unauthorized')) {
            return { success: false, error: 'unauthorized' };
        }
        console.error('StartConversation Error:', error);
        return { success: false, error: 'failed' };
    }
}
