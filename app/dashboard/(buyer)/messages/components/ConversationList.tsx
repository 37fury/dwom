'use client';

import Link from 'next/link';
import { Conversation } from '@/app/lib/db';
import styles from '../messages.module.css';
import { MessageCircle } from 'lucide-react';

type Props = {
    conversations: Conversation[];
    activeId?: string;
    currentUserId: string;
};

export default function ConversationList({ conversations, activeId, currentUserId }: Props) {
    if (conversations.length === 0) {
        return (
            <div className={styles.emptyState} style={{ padding: '32px 24px' }}>
                <div className={styles.emptyIcon} style={{ width: '56px', height: '56px', marginBottom: '12px' }}>
                    <MessageCircle size={24} />
                </div>
                <p style={{ fontSize: '14px', color: '#64748b' }}>No messages yet</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>
                    Start a conversation with a seller
                </p>
            </div>
        );
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {conversations.map((convo) => {
                const isActive = activeId === convo.id;
                // Get initials for avatar
                const name = convo.otherUserName || 'User';
                const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                return (
                    <Link
                        key={convo.id}
                        href={`/dashboard/messages?id=${convo.id}`}
                        className={`${styles.conversationItem} ${isActive ? styles.active : ''}`}
                    >
                        <div className={styles.avatar}>
                            {initials}
                        </div>
                        <div className={styles.conversationInfo}>
                            <div className={styles.conversationHeader}>
                                <span className={styles.conversationName}>
                                    {name}
                                </span>
                                <span className={styles.conversationTime}>
                                    {formatTime(convo.lastMessageAt)}
                                </span>
                            </div>
                            <p className={styles.conversationPreview}>
                                {convo.lastMessage || 'Click to view conversation'}
                            </p>
                        </div>
                        {(convo.unreadCount ?? 0) > 0 && (
                            <div className={styles.unreadBadge} />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}

// Helper to format time nicely
function formatTime(dateStr?: string): string {
    if (!dateStr) return '';

    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (days === 1) {
        return 'Yesterday';
    } else if (days < 7) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}
