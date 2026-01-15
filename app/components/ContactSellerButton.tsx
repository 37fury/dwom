'use client';

import { useState } from 'react';
import { startConversationAction } from '../dashboard/(buyer)/messages/actions';
import { useRouter } from 'next/navigation';

export default function ContactSellerButton({ sellerId }: { sellerId: string }) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleClick = async () => {
        setLoading(true);
        try {
            const result = await startConversationAction(sellerId);

            if (result.success && result.conversationId) {
                router.push(`/dashboard/messages?id=${result.conversationId}`);
            } else if (result.error === 'unauthorized') {
                const confirmLogin = window.confirm("You need to be logged in to contact the seller. Go to login?");
                if (confirmLogin) {
                    const currentPath = window.location.pathname;
                    router.push(`/login?redirect=${encodeURIComponent(currentPath)}`);
                }
            } else {
                alert('Could not start conversation. Please try again.');
            }
        } catch (error) {
            console.error('Failed to contact seller', error);
            alert('Failed to contact seller. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            style={{
                width: '100%',
                padding: '12px',
                background: 'white',
                color: '#0f172a',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                opacity: loading ? 0.7 : undefined
            }}
        >
            {loading ? 'Starting Chat...' : 'Contact Seller'}
        </button>
    );
}
