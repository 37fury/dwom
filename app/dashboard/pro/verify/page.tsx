'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Crown, Check, X, Loader } from 'lucide-react';
import Link from 'next/link';
import { verifyProSubscription } from '../actions';
import styles from './verify.module.css';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your payment...');
    const [plan, setPlan] = useState<string | null>(null);

    useEffect(() => {
        const reference = searchParams.get('reference');

        if (!reference) {
            setStatus('error');
            setMessage('No payment reference found');
            return;
        }

        const verify = async () => {
            const result = await verifyProSubscription(reference);

            if (result.success) {
                setStatus('success');
                setPlan(result.plan || 'Pro');
                setMessage(`Welcome to dwom Pro! Your ${result.plan} subscription is now active.`);
            } else {
                setStatus('error');
                setMessage(result.error || 'Payment verification failed');
            }
        };

        verify();
    }, [searchParams]);

    return (
        <div className={styles.card}>
            {status === 'loading' && (
                <>
                    <div className={styles.iconLoading}>
                        <Loader size={48} className={styles.spinner} />
                    </div>
                    <h1 className={styles.title}>Verifying Payment</h1>
                    <p className={styles.message}>{message}</p>
                </>
            )}

            {status === 'success' && (
                <>
                    <div className={styles.iconSuccess}>
                        <Crown size={48} />
                    </div>
                    <h1 className={styles.title}>🎉 Welcome to Pro!</h1>
                    <p className={styles.message}>{message}</p>
                    <div className={styles.benefits}>
                        <div className={styles.benefit}>
                            <Check size={16} /> 5% off all purchases
                        </div>
                        <div className={styles.benefit}>
                            <Check size={16} /> 2% cashback
                        </div>
                        <div className={styles.benefit}>
                            <Check size={16} /> Pro badge & priority support
                        </div>
                    </div>
                    <Link href="/dashboard" className={styles.continueBtn}>
                        Continue to Dashboard
                    </Link>
                </>
            )}

            {status === 'error' && (
                <>
                    <div className={styles.iconError}>
                        <X size={48} />
                    </div>
                    <h1 className={styles.title}>Payment Failed</h1>
                    <p className={styles.message}>{message}</p>
                    <Link href="/dashboard/pro" className={styles.retryBtn}>
                        Try Again
                    </Link>
                </>
            )}
        </div>
    );
}

export default function VerifyProPage() {
    return (
        <div className={styles.container}>
            <Suspense fallback={
                <div className={styles.card}>
                    <div className={styles.iconLoading}>
                        <Loader size={48} className={styles.spinner} />
                    </div>
                    <h1 className={styles.title}>Loading...</h1>
                </div>
            }>
                <VerifyContent />
            </Suspense>
        </div>
    );
}
