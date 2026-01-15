'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { verifyPayment } from '../actions';

function VerifyContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get('reference');
    const [status, setStatus] = useState<'verifying' | 'success' | 'failed'>('verifying');
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        if (!reference) {
            setStatus('failed');
            setErrorMsg('No payment reference found.');
            return;
        }

        const verify = async () => {
            try {
                const result = await verifyPayment(reference);
                if (result.success) {
                    setStatus('success');
                    // Delay slightly for UX before redirecting to success
                    setTimeout(() => {
                        router.push(`/checkout/success?orderId=${result.orderId}`);
                    }, 2000);
                } else {
                    setStatus('failed');
                    setErrorMsg(result.error || 'Verification failed');
                }
            } catch (err) {
                setStatus('failed');
                setErrorMsg('An unexpected error occurred');
            }
        };

        verify();
    }, [reference, router]);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', padding: '24px' }}>
            <div style={{ padding: '32px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                {status === 'verifying' && (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>⏳</div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Verifying Payment</h2>
                        <p style={{ color: '#64748b' }}>Please wait while we confirm your transaction...</p>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>✅</div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Payment Successful!</h2>
                        <p style={{ color: '#16a34a' }}>Redirecting to your order receipt...</p>
                    </>
                )}

                {status === 'failed' && (
                    <>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>❌</div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px' }}>Payment Failed</h2>
                        <p style={{ color: '#ef4444', marginBottom: '24px' }}>{errorMsg}</p>
                        <button
                            onClick={() => router.push('/')}
                            style={{ background: '#0f172a', color: 'white', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}
                        >
                            Return to Store
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}
