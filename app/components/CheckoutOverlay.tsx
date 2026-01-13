'use client';

import { useState } from 'react';
import styles from './CheckoutOverlay.module.css';

interface CheckoutOverlayProps {
    productTitle: string;
    price: number;
    currency: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function CheckoutOverlay({ productTitle, price, currency, onClose, onSuccess }: CheckoutOverlayProps) {
    const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
    const [momoNumber, setMomoNumber] = useState('');

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
                <button className={styles.closeBtn} onClick={onClose}>×</button>

                {step === 'input' && (
                    <>
                        <h2 className={styles.title}>Confirm Payment</h2>
                        <div className={styles.productSummary}>
                            <p className={styles.productName}>{productTitle}</p>
                            <p className={styles.price}>{currency}{price}.00</p>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Select Provider</label>
                            <div className={styles.providers}>
                                <div className={`${styles.provider} ${styles.selected}`}>MTN Momo</div>
                                <div className={styles.provider}>Telecel Cash</div>
                                <div className={styles.provider}>Card</div>
                            </div>
                        </div>

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

                        <button className={styles.payBtn} onClick={handlePay}>
                            Pay {currency}{price}.00
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
                        <div className={styles.successIcon}>✓</div>
                        <h3>Payment Successful!</h3>
                        <p>Redirecting to your dashboard...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
