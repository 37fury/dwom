'use client';

import { useState } from 'react';
import styles from './payouts.module.css';
import { requestPayoutAction } from './actions';

export default function PayoutRequestForm({ balance, payoutDetails }: { balance: number, payoutDetails: any }) {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async () => {
        if (!amount || isNaN(Number(amount))) return;
        setLoading(true);
        setMessage(null);

        const provider = payoutDetails?.provider || 'Mobile Money';
        const number = payoutDetails?.number || '';

        if (!number) {
            setMessage({ type: 'error', text: 'Please set up your payout details in Settings first.' });
            setLoading(false);
            return;
        }

        const result = await requestPayoutAction(Number(amount), provider, number);

        if (result.success) {
            setMessage({ type: 'success', text: 'Withdrawal requested successfully!' });
            setAmount('');
        } else {
            setMessage({ type: 'error', text: result.error || 'Failed to request payout' });
        }
        setLoading(false);
    };

    return (
        <div className={styles.formCard}>
            <h3 className={styles.sectionTitle}>Request Withdrawal</h3>

            {message && (
                <div style={{ padding: '0.8rem', borderRadius: '8px', marginBottom: '1rem', background: message.type === 'success' ? '#dcfce7' : '#fef2f2', color: message.type === 'success' ? '#166534' : '#991b1b' }}>
                    {message.text}
                </div>
            )}

            <div className={styles.formGroup}>
                <label className={styles.label}>Receiving Account</label>
                <div style={{ padding: '0.8rem', background: '#f8fafc', borderRadius: '8px', color: '#64748b' }}>
                    {payoutDetails ? `${payoutDetails.provider} - ${payoutDetails.number}` : 'No account linked'}
                </div>
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label}>Amount (GH₵)</label>
                <input
                    type="number"
                    className={styles.input}
                    placeholder={`Max: ${balance.toFixed(2)}`}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    max={balance}
                    min="10"
                />
            </div>

            <button
                className={styles.requestBtn}
                onClick={handleSubmit}
                disabled={loading || balance < 10 || !payoutDetails}
                style={{ width: '100%', opacity: (loading || balance < 10) ? 0.7 : 1 }}
            >
                {loading ? 'Processing...' : 'Withdraw Funds'}
            </button>
        </div>
    );
}
