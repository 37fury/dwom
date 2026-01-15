'use server';

import { db } from './db';

// Analytics Actions
export async function getAnalyticsAction(metricType: string, targetId?: string, daysBack: number = 30) {
    return await db.getAnalytics(metricType, targetId, daysBack);
}

export async function trackEventAction(type: string, targetId?: string, metadata?: any) {
    return await db.trackEvent(type, targetId, metadata);
}

// Chat Actions
export async function getConversationsAction() {
    return await db.getConversations();
}

export async function getMessagesAction(conversationId: string) {
    return await db.getMessages(conversationId);
}

export async function sendMessageAction(conversationId: string, content: string) {
    return await db.sendMessage(conversationId, content);
}

export async function startConversationAction(participantIds: string[]) {
    return await db.startConversation(participantIds);
}

// User Actions (if needed by client components)
export async function getUserAction() {
    return await db.getUser();
}
