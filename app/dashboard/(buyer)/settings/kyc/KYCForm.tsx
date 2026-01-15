'use client';

import { useState } from 'react';
import { submitVerificationAction } from '../actions';
import styles from './kyc.module.css';
import { useRouter } from 'next/navigation';

export default function KYCForm({ userId, currentStatus, currentProvider, currentNumber }: { userId: string, currentStatus: string, currentProvider?: string, currentNumber?: string }) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const router = useRouter();

    const isPending = currentStatus === 'pending';
    const isVerified = currentStatus === 'verified';

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const success = await submitVerificationAction(userId, formData);
            if (success) {
                setMessage({ type: 'success', text: 'Verification submitted successfully! Our team will review it shortly.' });
                router.refresh();
            } else {
                setMessage({ type: 'error', text: 'Failed to submit verification. Please try again.' });
            }
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message || 'An unexpected error occurred.' });
        }
        setLoading(false);
    }

    if (isPending) {
        return (
            <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                    <h3 style={{ margin: 0 }}>Verification Status</h3>
                    <span className={`${styles.badge} ${styles.pending}`}>Pending Review</span>
                </div>
                <p>Your documents have been submitted and are currently under review. This process typically takes 24-48 hours.</p>
                <div className={styles.formGroup} style={{ marginTop: '1rem', opacity: 0.7 }}>
                    <label className={styles.label}>Submitted ID Number</label>
                    <div className={styles.input} style={{ background: '#f5f5f5' }}>{currentNumber || '****'} ({currentProvider})</div>
                </div>
            </div>
        );
    }

    if (isVerified) {
        return (
            <div className={styles.statusCard}>
                <div className={styles.statusHeader}>
                    <h3 style={{ margin: 0 }}>Verification Status</h3>
                    <span className={`${styles.badge} ${styles.verified}`}>Verified</span>
                </div>
                <p>Congratulations! Your account is fully verified. You can now withdraw funds and access all seller features.</p>
            </div>
        );
    }

    return (
        <div className={styles.statusCard}>
            <div className={styles.statusHeader}>
                <h3 style={{ margin: 0 }}>Submit Documents</h3>
                <span className={`${styles.badge} ${styles.unverified}`}>Unverified</span>
            </div>

            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            <form action={handleSubmit} className={styles.form}>
                <div className={styles.formGroup}>
                    <label htmlFor="provider" className={styles.label}>ID Type</label>
                    <select name="provider" id="provider" className={styles.select} required defaultValue="Ghana Card">
                        <option value="Ghana Card">Ghana Card</option>
                        <option value="Passport">International Passport</option>
                        <option value="Drivers License">Driver's License</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="number" className={styles.label}>ID Number</label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        className={styles.input}
                        placeholder="e.g. GHA-123456789-0"
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="document" className={styles.label}>Upload ID Image (Front)</label>
                    <input
                        type="file"
                        name="document"
                        id="document"
                        accept="image/*,.pdf"
                        className={styles.input}
                        required
                    />
                    <small style={{ color: '#666', marginTop: '0.2rem' }}>Accepted formats: JPG, PNG, PDF. Max 5MB.</small>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
            </form>
        </div>
    );
}
