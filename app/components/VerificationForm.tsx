'use client';

import { useState } from 'react';
import { db } from '../lib/db';

export default function VerificationForm({ user }: { user: any }) {
    const [provider, setProvider] = useState<'Mobile Money' | 'Bank'>('Mobile Money');
    const [number, setNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'pending' | 'verified' | 'unverified'>(user.kycStatus || 'unverified');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate server action
        const success = await db.submitVerification(user.id, { number, provider });

        setIsSubmitting(false);
        if (success) {
            setStatus('pending');
        }
    };

    if (status === 'verified') {
        return (
            <div style={{ background: '#f0fdf4', padding: '24px', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                <h3 style={{ color: '#166534', fontWeight: 'bold', marginBottom: '8px' }}>Verified Seller</h3>
                <p style={{ color: '#15803d', fontSize: '14px' }}>Your account is verified. You can receive payouts.</p>
            </div>
        );
    }

    if (status === 'pending') {
        return (
            <div style={{ background: '#fffbeb', padding: '24px', borderRadius: '12px', border: '1px solid #fde68a' }}>
                <h3 style={{ color: '#b45309', fontWeight: 'bold', marginBottom: '8px' }}>Verification Pending</h3>
                <p style={{ color: '#92400e', fontSize: '14px' }}>Your documents are being reviewed. This usually takes 24 hours.</p>
            </div>
        );
    }

    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', color: '#0f172a' }}>Payment Verification (KYC)</h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
                To receive payouts, you must verify your identity and add a valid payment method.
            </p>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Government ID</label>
                    <div style={{ padding: '32px', border: '2px dashed #cbd5e1', borderRadius: '12px', textAlign: 'center', background: '#f8fafc', color: '#64748b', cursor: 'pointer' }}>
                        Click to upload Passport or Ghana Card
                    </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Payout Method</label>
                    <select
                        value={provider}
                        onChange={(e) => setProvider(e.target.value as any)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '12px' }}
                    >
                        <option value="Mobile Money">Mobile Money (Momo)</option>
                        <option value="Bank">Bank Transfer</option>
                    </select>

                    <input
                        type="text"
                        placeholder={provider === 'Mobile Money' ? 'Enter Momo Number' : 'Enter Account Number'}
                        value={number}
                        onChange={(e) => setNumber(e.target.value)}
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '10px 24px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        fontSize: '14px',
                        border: 'none',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                        opacity: isSubmitting ? 0.7 : 1,
                        width: '100%'
                    }}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit for Verification'}
                </button>
            </form>
        </div>
    );
}
