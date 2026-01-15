'use client';

import { useState } from 'react';
import { submitVerificationAction } from '../dashboard/(buyer)/settings/actions';

export default function VerificationForm({ user }: { user: any }) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'pending' | 'verified' | 'unverified'>(user.kycStatus || 'unverified');

    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true);

        const success = await submitVerificationAction(user.id, formData);

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

            <form action={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="document" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Government ID</label>
                    <input
                        id="document"
                        name="document"
                        type="file"
                        accept="image/*,application/pdf"
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white' }}
                    />
                    <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Upload Passport, Ghana Card, or Driver's License</p>
                </div>

                <div style={{ marginBottom: '16px' }}>
                    <label htmlFor="provider" style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '8px', color: '#475569' }}>Payout Method</label>
                    <select
                        id="provider"
                        name="provider"
                        defaultValue="Mobile Money"
                        style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #cbd5e1', marginBottom: '12px' }}
                    >
                        <option value="Mobile Money">Mobile Money (Momo)</option>
                        <option value="Bank">Bank Transfer</option>
                    </select>

                    <input
                        type="text"
                        name="number"
                        placeholder="Enter Momo Number or Account Number"
                        required
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

