'use client';

import { useState } from 'react';
import styles from './wallet.module.css';
import { topUpWallet } from './actions';
import { ArrowUpRight, CheckCircle, X } from 'lucide-react';

export default function TopUpButton() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success'>('idle');
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('50');

    const presetAmounts = [20, 50, 100, 200];

    const handleTopUp = async (e: React.FormEvent) => {
        e.preventDefault();

        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            alert("Invalid amount");
            return;
        }

        setLoading(true);
        try {
            const result = await topUpWallet(value);
            if (result.success) {
                setStatus('success');
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                }, 2000);
            } else {
                alert('Top up failed: ' + (result.error || 'Unknown error'));
            }
        } catch (err) {
            alert('Top up failed.');
        } finally {
            setLoading(false);
        }
    };

    if (isOpen) {
        return (
            <>
                <button className={`${styles.actionBtn} ${styles.topUpBtn}`} disabled>
                    <ArrowUpRight size={18} />
                    Top Up
                </button>
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(15, 23, 42, 0.6)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    backdropFilter: 'blur(4px)'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        padding: '32px',
                        borderRadius: '20px',
                        width: '100%',
                        maxWidth: '420px',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                        textAlign: status === 'success' ? 'center' : 'left',
                        position: 'relative'
                    }}>
                        <button
                            onClick={() => setIsOpen(false)}
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '16px',
                                background: '#f1f5f9',
                                border: 'none',
                                borderRadius: '8px',
                                width: '32px',
                                height: '32px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                color: '#64748b'
                            }}
                        >
                            <X size={18} />
                        </button>

                        {status === 'success' ? (
                            <div style={{ padding: '20px 0' }}>
                                <div style={{
                                    width: '72px',
                                    height: '72px',
                                    background: 'rgba(34, 197, 94, 0.1)',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 20px',
                                    color: '#22c55e'
                                }}>
                                    <CheckCircle size={36} />
                                </div>
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Success!</h3>
                                <p style={{ fontSize: '15px', color: '#64748b' }}>
                                    GH₵{amount} has been added to your wallet.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Top Up Wallet</h3>
                                <p style={{ color: '#64748b', marginBottom: '24px', fontSize: '14px' }}>
                                    Add funds via Mobile Money
                                </p>

                                <form onSubmit={handleTopUp}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>
                                            Quick Select
                                        </label>
                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                                            {presetAmounts.map(preset => (
                                                <button
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => setAmount(String(preset))}
                                                    style={{
                                                        padding: '12px',
                                                        border: parseFloat(amount) === preset ? '2px solid #f97316' : '1px solid #e2e8f0',
                                                        borderRadius: '10px',
                                                        background: parseFloat(amount) === preset ? 'rgba(249, 115, 22, 0.05)' : 'white',
                                                        fontWeight: '600',
                                                        fontSize: '14px',
                                                        color: parseFloat(amount) === preset ? '#f97316' : '#334155',
                                                        cursor: 'pointer',
                                                        transition: 'all 0.15s'
                                                    }}
                                                >
                                                    GH₵{preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '24px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>
                                            Custom Amount
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: '14px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#64748b',
                                                fontWeight: '600'
                                            }}>GH₵</span>
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 14px 14px 50px',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s'
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            fontSize: '15px',
                                            cursor: 'pointer',
                                            opacity: loading ? 0.7 : 1,
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {loading ? 'Processing...' : `Confirm Top Up • GH₵${amount}`}
                                    </button>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }

    return (
        <button
            onClick={() => setIsOpen(true)}
            className={`${styles.actionBtn} ${styles.topUpBtn}`}
            disabled={loading}
        >
            <ArrowUpRight size={18} />
            Top Up
        </button>
    );
}
