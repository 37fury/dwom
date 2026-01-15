'use client';

import { useState } from 'react';
import styles from './wallet.module.css';
import { withdrawFunds } from './actions';
import { ArrowDownLeft, CheckCircle, X, Smartphone } from 'lucide-react';

interface WithdrawButtonProps {
    balance: number;
}

export default function WithdrawButton({ balance }: WithdrawButtonProps) {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success'>('idle');
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');

    const handleWithdraw = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const value = parseFloat(amount);
        if (isNaN(value) || value <= 0) {
            setError("Invalid amount");
            return;
        }

        if (value > balance) {
            setError(`Insufficient funds. Your balance is GH₵${balance.toFixed(2)}`);
            return;
        }

        if (phoneNumber.length < 10) {
            setError("Please enter a valid phone number");
            return;
        }

        setLoading(true);
        try {
            const result = await withdrawFunds(value, phoneNumber);
            if (result.success) {
                setStatus('success');
                setTimeout(() => {
                    setIsOpen(false);
                    setStatus('idle');
                    setAmount('');
                    setPhoneNumber('');
                }, 2000);
            } else {
                setError(result.error || 'Withdrawal failed');
            }
        } catch (err) {
            setError('Withdrawal failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (isOpen) {
        return (
            <>
                <button className={`${styles.actionBtn} ${styles.withdrawBtn}`} disabled>
                    <ArrowDownLeft size={18} />
                    Withdraw
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
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Withdrawal Processing!</h3>
                                <p style={{ fontSize: '15px', color: '#64748b' }}>
                                    GH₵{amount} is being sent to {phoneNumber}
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>Withdraw Funds</h3>
                                <div style={{
                                    background: 'linear-gradient(135deg, #0f172a, #1e293b)',
                                    padding: '16px',
                                    borderRadius: '12px',
                                    marginBottom: '24px',
                                    color: 'white'
                                }}>
                                    <div style={{ fontSize: '12px', opacity: 0.7, marginBottom: '4px' }}>Available Balance</div>
                                    <div style={{ fontSize: '28px', fontWeight: 'bold' }}>GH₵ {balance.toFixed(2)}</div>
                                </div>

                                <form onSubmit={handleWithdraw}>
                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>
                                            Amount to Withdraw
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
                                                    outline: 'none'
                                                }}
                                                placeholder="0.00"
                                                autoFocus
                                            />
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '20px' }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '13px', color: '#334155' }}>
                                            Mobile Money Number
                                        </label>
                                        <div style={{ position: 'relative' }}>
                                            <span style={{
                                                position: 'absolute',
                                                left: '14px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                color: '#64748b'
                                            }}><Smartphone size={18} /></span>
                                            <input
                                                type="tel"
                                                value={phoneNumber}
                                                onChange={(e) => setPhoneNumber(e.target.value)}
                                                style={{
                                                    width: '100%',
                                                    padding: '14px 14px 14px 44px',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    outline: 'none'
                                                }}
                                                placeholder="024 123 4567"
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div style={{
                                            marginBottom: '20px',
                                            color: '#dc2626',
                                            fontSize: '14px',
                                            backgroundColor: '#fef2f2',
                                            padding: '12px',
                                            borderRadius: '10px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '8px'
                                        }}>
                                            <X size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            background: loading ? '#94a3b8' : '#0f172a',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '12px',
                                            fontWeight: '600',
                                            fontSize: '15px',
                                            cursor: loading ? 'not-allowed' : 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {loading ? 'Processing...' : 'Request Withdrawal'}
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
            className={`${styles.actionBtn} ${styles.withdrawBtn}`}
            disabled={loading}
        >
            <ArrowDownLeft size={18} />
            Withdraw
        </button>
    );
}
