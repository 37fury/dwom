import Link from 'next/link';
import { ArrowLeft, MessageCircle, Mail, Send, Clock } from 'lucide-react';
import { db } from '../../../lib/db';

export default async function SellerMessagesPage() {
    const user = await db.getUser();

    if (!user) {
        return <div>Please log in to view messages.</div>;
    }

    // Placeholder messages - in a real app, fetch from database
    const messages: any[] = [];

    return (
        <div style={{ maxWidth: '900px', width: '100%', paddingBottom: '48px' }}>
            <Link
                href="/dashboard/seller"
                style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500',
                    marginBottom: '24px'
                }}
            >
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '800',
                    color: '#0f172a',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '8px'
                }}>
                    <MessageCircle size={28} />
                    Messages
                </h1>
                <p style={{ color: '#64748b', fontSize: '15px' }}>
                    Customer inquiries and support conversations.
                </p>
            </header>

            {messages.length === 0 ? (
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    padding: '64px 32px',
                    textAlign: 'center'
                }}>
                    <div style={{
                        width: '80px',
                        height: '80px',
                        background: '#f8fafc',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        color: '#94a3b8'
                    }}>
                        <Mail size={32} />
                    </div>
                    <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                        No messages yet
                    </h3>
                    <p style={{ color: '#64748b', fontSize: '14px', maxWidth: '300px', margin: '0 auto' }}>
                        When customers contact you about your products, messages will appear here.
                    </p>
                </div>
            ) : (
                <div style={{
                    background: 'white',
                    borderRadius: '20px',
                    border: '1px solid #e2e8f0',
                    overflow: 'hidden'
                }}>
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            style={{
                                padding: '20px',
                                borderBottom: i < messages.length - 1 ? '1px solid #f1f5f9' : 'none',
                                display: 'flex',
                                alignItems: 'flex-start',
                                gap: '16px',
                                cursor: 'pointer',
                                transition: 'background 0.2s'
                            }}
                        >
                            <div style={{
                                width: '48px',
                                height: '48px',
                                borderRadius: '12px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: 'white',
                                fontWeight: '600',
                                flexShrink: 0
                            }}>
                                {msg.sender?.charAt(0) || 'U'}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                                    <span style={{ fontWeight: '600', color: '#0f172a' }}>{msg.sender || 'User'}</span>
                                    <span style={{ fontSize: '12px', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Clock size={12} />
                                        {msg.time || '2h ago'}
                                    </span>
                                </div>
                                <p style={{
                                    color: '#64748b',
                                    fontSize: '14px',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap'
                                }}>
                                    {msg.preview || 'Message preview...'}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
