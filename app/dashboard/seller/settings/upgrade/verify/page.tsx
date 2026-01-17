'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { verifySellerProSubscription } from '../actions';

function VerifyContent() {
    const searchParams = useSearchParams();
    const reference = searchParams.get('reference') || searchParams.get('trxref');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('');
    const [plan, setPlan] = useState<string | null>(null);

    useEffect(() => {
        async function verify() {
            if (!reference) {
                setStatus('error');
                setMessage('No payment reference found');
                return;
            }

            const result = await verifySellerProSubscription(reference);

            if (result.success) {
                setStatus('success');
                setPlan(result.plan || null);
                setMessage('Your Seller Pro subscription is now active!');
            } else {
                setStatus('error');
                setMessage(result.error || 'Verification failed');
            }
        }

        verify();
    }, [reference]);

    return (
        <div style={{
            maxWidth: '500px',
            width: '100%',
            textAlign: 'center',
            padding: '48px 24px'
        }}>
            {status === 'loading' && (
                <>
                    <Loader2
                        size={64}
                        style={{
                            color: '#f97316',
                            animation: 'spin 1s linear infinite',
                            marginBottom: '24px'
                        }}
                    />
                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                        Verifying Payment...
                    </h1>
                    <p style={{ color: '#64748b' }}>
                        Please wait while we confirm your subscription.
                    </p>
                </>
            )}

            {status === 'success' && (
                <>
                    <CheckCircle size={64} style={{ color: '#22c55e', marginBottom: '24px' }} />
                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                        Welcome to Seller Pro! 🎉
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: '8px' }}>
                        {message}
                    </p>
                    {plan && (
                        <p style={{ color: '#94a3b8', fontSize: '14px', marginBottom: '24px' }}>
                            Plan: {plan === 'monthly' ? 'Monthly' : 'Annual'}
                        </p>
                    )}
                    <Link
                        href="/dashboard/seller"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: 'linear-gradient(135deg, #f97316, #ea580c)',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '15px'
                        }}
                    >
                        Go to Dashboard
                    </Link>
                </>
            )}

            {status === 'error' && (
                <>
                    <XCircle size={64} style={{ color: '#ef4444', marginBottom: '24px' }} />
                    <h1 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                        Payment Failed
                    </h1>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>
                        {message}
                    </p>
                    <Link
                        href="/dashboard/seller/settings/upgrade"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: '#1e293b',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '12px',
                            fontWeight: '600',
                            fontSize: '15px'
                        }}
                    >
                        Try Again
                    </Link>
                </>
            )}

            <style jsx global>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
}

export default function SellerProVerifyPage() {
    return (
        <Suspense fallback={
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '400px'
            }}>
                <Loader2
                    size={48}
                    style={{
                        color: '#f97316',
                        animation: 'spin 1s linear infinite'
                    }}
                />
            </div>
        }>
            <VerifyContent />
        </Suspense>
    );
}
