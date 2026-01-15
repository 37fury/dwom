'use client';

import { useState, useEffect } from 'react';
import { getConversationsAction } from '@/app/lib/actions';
import { Conversation } from '@/app/lib/db';
import styles from './Chat.module.css';

export default function ChatList({ onSelectConversation, selectedId }: {
    onSelectConversation: (id: string) => void,
    selectedId: string | null
}) {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const data = await getConversationsAction();
            setConversations(data);
            setLoading(false);
        };
        load();
    }, []);

    if (loading) return <div className={styles.loading}>Loading chats...</div>;

    return (
        <div className={styles.list}>
            <h3 className={styles.header}>Messages</h3>
            {conversations.length === 0 ? (
                <div className={styles.empty}>No messages yet</div>
            ) : (
                conversations.map(c => (
                    <div
                        key={c.id}
                        className={`${styles.item} ${selectedId === c.id ? styles.active : ''}`}
                        onClick={() => onSelectConversation(c.id)}
                    >
                        <div className={styles.avatar}>👤</div>
                        <div className={styles.info}>
                            <div className={styles.participants}>User {c.participants[0].substring(0, 4)}...</div>
                            <div className={styles.time}>{c.lastMessageAt}</div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
