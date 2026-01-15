import { db } from '@/app/lib/db';
import ConversationList from './components/ConversationList';
import ChatWindow from './components/ChatWindow';
import styles from './messages.module.css';
import { MessageCircle, Plus, Search } from 'lucide-react';

export default async function MessagesPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const { id: activeId } = await searchParams;
    const user = await db.getUser();
    if (!user) return <div style={{ padding: '24px' }}>Please login to view messages.</div>;

    const conversations = await db.getConversations();

    let initialMessages: any[] = [];

    if (activeId) {
        // Verify user is participant
        const activeConvo = conversations.find(c => c.id === activeId);
        if (activeConvo) {
            initialMessages = await db.getMessages(activeId);
        }
    }

    // Get the active conversation for header info
    const activeConversation = activeId ? conversations.find(c => c.id === activeId) : null;

    return (
        <div className={styles.container}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <div className={styles.sidebarHeader}>
                    <h1 className={styles.sidebarTitle}>
                        <MessageCircle size={20} />
                        Messages
                    </h1>
                    <button className={styles.newChatBtn} title="New Message">
                        <Plus size={18} />
                    </button>
                </div>

                <div className={styles.searchBox}>
                    <input
                        type="text"
                        placeholder="Search conversations..."
                        className={styles.searchInput}
                    />
                </div>

                <div className={styles.conversationsList}>
                    <ConversationList
                        conversations={conversations}
                        activeId={activeId}
                        currentUserId={user.id}
                    />
                </div>
            </div>

            {/* Chat Area */}
            <div className={styles.chatArea}>
                {activeId ? (
                    <ChatWindow
                        conversationId={activeId}
                        initialMessages={initialMessages}
                        currentUserId={user.id}
                        otherUserName={activeConversation?.otherUserName}
                    />
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <MessageCircle size={36} />
                        </div>
                        <h3 className={styles.emptyTitle}>Your Messages</h3>
                        <p className={styles.emptyText}>
                            Select a conversation to start chatting<br />
                            or start a new conversation
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
