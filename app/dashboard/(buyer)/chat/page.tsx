'use client';

import { useState, useEffect } from 'react';
import ChatList from '@/app/components/Chat/ChatList';
import ChatWindow from '@/app/components/Chat/ChatWindow';
import styles from '@/app/components/Chat/Chat.module.css';
import { getUserAction } from '@/app/lib/actions';

export default function ChatPage() {
    const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        const loadUser = async () => {
            const user = await getUserAction();
            if (user) setUserId(user.id);
        };
        loadUser();
    }, []);

    return (
        <div className={styles.container}>
            <ChatList
                onSelectConversation={(id) => setSelectedConversation(id)}
                selectedId={selectedConversation}
            />

            {selectedConversation && userId ? (
                <ChatWindow conversationId={selectedConversation} currentUserId={userId} />
            ) : (
                <div className={styles.window} style={{ alignItems: 'center', justifyItems: 'center', display: 'grid' }}>
                    <div className={styles.empty}>
                        Select a conversation to start chatting
                    </div>
                </div>
            )}
        </div>
    );
}
