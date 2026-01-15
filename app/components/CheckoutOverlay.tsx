'use client';

import { useState } from 'react';
import styles from './CheckoutOverlay.module.css';
import { CheckCircle, X } from 'lucide-react';

interface CheckoutOverlayProps {
    productTitle: string;
    price: number;
    currency: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CheckoutOverlay({ productTitle, price, currency, onClose, onSuccess }: CheckoutOverlayProps) {
    const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
    const [method, setMethod] = useState<'momo' | 'card' | 'crypto'>('momo');
    const [momoNumber, setMomoNumber] = useState('');
    const [cryptoHash, setCryptoHash] = useState('');
    const USDT_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

    const handlePay = () => {
        setStep('processing');
        // Simulate API delay
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
                onSuccess();
            }, 2000);
        }, 2000);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={20} />
                </button>

                {step === 'input' && (
                    <>
                        <h2 className={styles.title}>Confirm Payment</h2>
                        <div className={styles.productSummary}>
                            <p className={styles.productName}>{productTitle}</p>
                            <p className={styles.price}>{currency}{price}.00</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Select Provider</label>
                            <div className={styles.providers} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                <div
                                    className={`${styles.provider} ${method === 'momo' ? styles.selected : ''}`}
                                    onClick={() => setMethod('momo')}
                                    style={{ cursor: 'pointer', padding: '8px 12px', border: method === 'momo' ? '2px solid #f97316' : '1px solid #e2e8f0', borderRadius: '8px', fontWeight: method === 'momo' ? 'bold' : 'normal' }}
                                >
                                    MTN Momo
                                </div>
                                <div
                                    className={`${styles.provider} ${method === 'card' ? styles.selected : ''}`}
                                    onClick={() => setMethod('card')}
                                    style={{ cursor: 'pointer', padding: '8px 12px', border: method === 'card' ? '2px solid #f97316' : '1px solid #e2e8f0', borderRadius: '8px', fontWeight: method === 'card' ? 'bold' : 'normal' }}
                                >
                                    Card
                                </div>
                                <div
                                    className={`${styles.provider} ${method === 'crypto' ? styles.selected : ''}`}
                                    onClick={() => setMethod('crypto')}
                                    style={{ cursor: 'pointer', padding: '8px 12px', border: method === 'crypto' ? '2px solid #f97316' : '1px solid #e2e8f0', borderRadius: '8px', fontWeight: method === 'crypto' ? 'bold' : 'normal' }}
                                >
                                    Crypto (USDT)
                                </div>
                            </div>
                        </div>

                        {method === 'crypto' ? (
                            <div className={styles.formGroup}>
                                <div style={{ fontSize: '12px', background: '#f0fdf4', padding: '10px', borderRadius: '8px', marginBottom: '12px', color: '#15803d' }}>
                                    Send USDT (TRC20) to:<br />
                                    <strong>{USDT_ADDRESS}</strong>
                                </div>
                                <label>Transaction Hash (TXID)</label>
                                <input
                                    type="text"
                                    placeholder="Enter hash..."
                                    className={styles.input}
                                    value={cryptoHash}
                                    onChange={(e) => setCryptoHash(e.target.value)}
                                />
                            </div>
                        ) : method === 'momo' ? (
                            <div className={styles.formGroup}>
                                <label>Mobile Money Number</label>
                                <input
                                    type="tel"
                                    placeholder="024 XXX XXXX"
                                    className={styles.input}
                                    value={momoNumber}
                                    onChange={(e) => setMomoNumber(e.target.value)}
                                />
                            </div>
                        ) : (
                            <div className={styles.formGroup}>
                                <label>Card Details</label>
                                <input
                                    type="text"
                                    placeholder="Card Number"
                                    className={styles.input}
                                    disabled
                                    value="**** **** **** 1234"
                                />
                            </div>
                        )}

                        <button className={styles.payBtn} onClick={handlePay}>
                            {method === 'crypto' ? 'Submit Payment' : `Pay ${currency}${price}.00`}
                        </button>
                    </>
                )}

                {step === 'processing' && (
                    <div className={styles.statusState}>
                        <div className={styles.spinner}></div>
                        <h3>Check your phone...</h3>
                        <p>Please approve the prompt on <strong>{momoNumber}</strong></p>
                    </div>
                )}

                {step === 'success' && (
                    <div className={styles.statusState}>
                        <div className={styles.successIcon} style={{ display: 'flex', justifyContent: 'center' }}>
                            <CheckCircle size={48} color="#22c55e" />
                        </div>
                        <h3>Payment Successful!</h3>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
