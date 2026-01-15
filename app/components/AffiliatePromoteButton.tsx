'use client';

import { useState } from 'react';
import { getOrCreateAffiliateLinkAction } from '@/app/product/[id]/actions';

export default function AffiliatePromoteButton({ productId }: { productId: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    async function handleOpen() {
        setIsOpen(true);
        if (!link) {
            setLoading(true);
            const res = await getOrCreateAffiliateLinkAction(productId);
            setLoading(false);
            if (res.success && res.code) {
                // Construct full URL
                const baseUrl = window.location.origin;
                const fullLink = `${baseUrl}/product/${productId}?ref=${res.code}`;
                setLink(fullLink);
            } else {
                setError((res as any).error || 'Failed to generate link. Log in required.');
            }
        }
    }

    function copyToClipboard() {
        navigator.clipboard.writeText(link);
        alert('Link copied!');
    }

    function shareToWhatsApp() {
        // ... existing ... 
        const text = encodeURIComponent(`Check this out! I think you'll love it: ${link}`);
        window.open(`https://wa.me/?text=${text}`, '_blank');
    }

    return (
        <>
            <button
                onClick={handleOpen}
                style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    width: '100%', padding: '12px', marginTop: '12px',
                    background: '#f0fdf4', color: '#166534',
                    border: '1px solid #bbf7d0', borderRadius: '8px',
                    fontWeight: '600', cursor: 'pointer', fontSize: '14px'
                }}
            >
                🤝 Promote & Earn GHS 50
            </button>

            {isOpen && (
                <div style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', zIndex: 9999,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
                }} onClick={() => setIsOpen(false)}>
                    <div style={{
                        background: 'white', padding: '32px', borderRadius: '16px',
                        width: '100%', maxWidth: '400px',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    }} onClick={e => e.stopPropagation()}>
                        <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Become an Affiliate</h3>
                        <p style={{ color: '#666', marginBottom: '24px', fontSize: '14px', lineHeight: '1.5' }}>
                            Earn 20% commission for every sale you refer. Share this link with your friends or audience!
                        </p>

                        {loading ? (
                            <p>Generating your unique link...</p>
                        ) : error ? (
                            <div style={{ color: 'red', marginBottom: '16px' }}>{error} <a href={`/login?redirect=${encodeURIComponent(window.location.pathname)}`}>Login</a></div>
                        ) : (
                            <>
                                <div style={{
                                    background: '#f1f5f9', padding: '12px', borderRadius: '8px',
                                    fontFamily: 'monospace', fontSize: '12px', overflow: 'hidden',
                                    marginBottom: '16px', border: '1px solid #e2e8f0', color: '#334155'
                                }}>
                                    {link}
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <button
                                        onClick={copyToClipboard}
                                        style={{ flex: 1, padding: '10px', background: '#e2e8f0', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Copy Link
                                    </button>
                                    <button
                                        onClick={shareToWhatsApp}
                                        style={{ flex: 1, padding: '10px', background: '#25D366', color: 'white', border: 'none', borderRadius: '6px', fontWeight: '600', cursor: 'pointer' }}
                                    >
                                        Share on WhatsApp
                                    </button>
                                </div>
                            </>
                        )}

                        <button
                            onClick={() => setIsOpen(false)}
                            style={{ width: '100%', marginTop: '24px', padding: '12px', background: 'transparent', border: 'none', color: '#666', cursor: 'pointer' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
