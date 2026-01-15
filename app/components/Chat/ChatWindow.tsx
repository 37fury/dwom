'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { getMessagesAction, sendMessageAction } from '@/app/lib/actions';
import { Message } from '@/app/lib/db';
import styles from './Chat.module.css';

export default function ChatWindow({ conversationId, currentUserId }: { conversationId: string, currentUserId: string }) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    useEffect(() => {
        const loadMessages = async () => {
            setLoading(true);
            const data = await getMessagesAction(conversationId);
            setMessages(data);
            setLoading(false);
        };
        loadMessages();

        // Subscribing to new messages
        const channel = supabase
            .channel(`chat:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => {
                    const newMsg = {
                        id: payload.new.id,
                        conversationId: payload.new.conversation_id,
                        senderId: payload.new.sender_id,
                        content: payload.new.content,
                        isRead: payload.new.is_read,
                        createdAt: new Date(payload.new.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                    };
                    setMessages(prev => [...prev, newMsg]);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [conversationId]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        // Optimistic update (optional, but good UX)
        // For simplicity we wait for DB, but since we have realtime sub it will appear automatically?
        // Actually realtime might be slightly slower than local append.
        // Let's just fire and forget, subscribing will catch it.

        await sendMessageAction(conversationId, newMessage);
        setNewMessage('');
    };

    return (
        <div className={styles.window}>
            <div className={styles.messages}>
                {messages.map(m => (
                    <div key={m.id} className={`${styles.message} ${m.senderId === currentUserId ? styles.mine : styles.theirs}`}>
                        {/* Note: We need a way to ID 'me' vs 'them'. in db.ts we can expose currentUserId helper or check against simple logic if we know our ID */}
                        {/* For now, let's assume all messages are 'theirs' unless we check auth */}
                        <div className={styles.bubble}>{m.content}</div>
                        <div className={styles.msgTime}>{m.createdAt}</div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSend} className={styles.inputArea}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className={styles.input}
                />
                <button type="submit" className={styles.sendBtn}>Send</button>
            </form>
        </div>
    );
}
