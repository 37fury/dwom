'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './CheckoutOverlay.module.css'; // Reuse overlay styles

export default function SubmissionModal({ campaignId, onClose, onSubmit }: { campaignId: string, onClose: () => void, onSubmit: (campaignId: string, url: string) => Promise<void> }) {
    const [url, setUrl] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        await onSubmit(campaignId, url);
        setIsSubmitting(false);
        onClose();
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.modal} style={{ maxWidth: '500px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Submit Content 📱</h2>
                    <button onClick={onClose} style={{ border: 'none', background: 'none', fontSize: '24px', cursor: 'pointer' }}>×</button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#64748b' }}>TikTok / Reel URL</label>
                        <input
                            type="url"
                            required
                            placeholder="https://www.tiktok.com/@user/video/..."
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '16px' }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: '#ff5f00',
                            color: 'white',
                            border: 'none',
                            borderRadius: '24px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1
                        }}
                    >
                        {isSubmitting ? 'Verifying...' : 'Submit to Earn'}
                    </button>

                    <p style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#94a3b8' }}>
                        Views are verified instantly. Earnings are added to your wallet immediately.
                    </p>
                </form>
            </div>
        </div>
    );
}
