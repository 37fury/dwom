'use client';

import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/utils/supabase/client';
import { Message } from '@/app/lib/db';
import styles from '../messages.module.css';
import { Phone, Video, MoreVertical, Paperclip, Smile, Send } from 'lucide-react';

type Props = {
    conversationId: string;
    initialMessages: Message[];
    currentUserId: string;
    otherUserName?: string;
};

export default function ChatWindow({ conversationId, initialMessages, currentUserId, otherUserName }: Props) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [newMessage, setNewMessage] = useState('');
    const [sending, setSending] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    // Get initials for other user
    const name = otherUserName || 'User';
    const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    // Scroll to bottom on load/update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Realtime subscription
    useEffect(() => {
        const channel = supabase
            .channel(`convo:${conversationId}`)
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'messages',
                    filter: `conversation_id=eq.${conversationId}`
                },
                (payload) => {
                    const newMsg = payload.new as any;
                    setMessages((prev) => {
                        if (prev.find(m => m.id === newMsg.id)) return prev;
                        return [...prev, {
                            id: newMsg.id,
                            conversationId: newMsg.conversation_id,
                            senderId: newMsg.sender_id,
                            content: newMsg.content,
                            createdAt: newMsg.created_at,
                            isRead: newMsg.is_read
                        }];
                    });
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [conversationId, supabase]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        setSending(true);
        const text = newMessage;
        setNewMessage('');

        try {
            const { sendMessageAction } = await import('@/app/dashboard/(buyer)/messages/actions');
            await sendMessageAction(conversationId, text);
        } catch (error) {
            console.error('Send failed', error);
            setNewMessage(text);
        } finally {
            setSending(false);
        }
    };

    const formatMessageTime = (dateStr?: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <>
            {/* Chat Header */}
            <div className={styles.chatHeader}>
                <div className={styles.avatar} style={{ width: '44px', height: '44px' }}>
                    {initials}
                </div>
                <div className={styles.chatHeaderInfo}>
                    <h2>{name}</h2>
                    <p>● Online</p>
                </div>
                <div className={styles.chatActions}>
                    <button className={styles.actionBtn} title="Voice call">
                        <Phone size={18} />
                    </button>
                    <button className={styles.actionBtn} title="Video call">
                        <Video size={18} />
                    </button>
                    <button className={styles.actionBtn} title="More options">
                        <MoreVertical size={18} />
                    </button>
                </div>
            </div>

            {/* Messages Area */}
            <div className={styles.messagesArea}>
                {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                            No messages yet. Say hello! 👋
                        </p>
                    </div>
                ) : (
                    messages.map((msg) => {
                        const isMe = msg.senderId === currentUserId;
                        return (
                            <div
                                key={msg.id}
                                className={`${styles.messageRow} ${isMe ? styles.sent : styles.received}`}
                            >
                                {!isMe && (
                                    <div className={styles.messageAvatar}>
                                        {initials}
                                    </div>
                                )}
                                <div>
                                    <div className={styles.messageBubble}>
                                        {msg.content}
                                    </div>
                                    <div className={styles.messageTime}>
                                        {formatMessageTime(msg.createdAt)}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className={styles.inputArea}>
                <button type="button" className={styles.attachBtn} title="Attach file">
                    <Paperclip size={20} />
                </button>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type a message..."
                        className={styles.messageInput}
                    />
                    <button type="button" className={styles.emojiBtn} title="Add emoji">
                        <Smile size={20} />
                    </button>
                </div>
                <button
                    type="submit"
                    disabled={sending || !newMessage.trim()}
                    className={styles.sendBtn}
                    title="Send message"
                >
                    <Send size={20} />
                </button>
            </form>
        </>
    );
}
