import Link from 'next/link';
import { db } from '../../lib/db';

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ orderId: string }> }) {
    // In a real app verify orderId ownership
    const { orderId } = await searchParams;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
            <div style={{ background: 'white', padding: '48px', borderRadius: '16px', border: '1px solid #e2e8f0', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎉</div>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>Payment Successful!</h1>
                <p style={{ color: '#64748b', marginBottom: '32px' }}>Your order has been processed. You now have instant access to your purchase.</p>

                <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: '8px', marginBottom: '32px', fontFamily: 'monospace', fontSize: '14px', color: '#475569' }}>
                    Order ID: {orderId}
                </div>

                <div style={{ display: 'grid', gap: '12px' }}>
                    <Link
                        href="/dashboard"
                        style={{
                            background: '#0f172a',
                            color: 'white',
                            padding: '14px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            display: 'block'
                        }}
                    >
                        Access Content
                    </Link>
                    <Link
                        href="/"
                        style={{
                            background: 'white',
                            color: '#64748b',
                            padding: '14px',
                            borderRadius: '8px',
                            fontWeight: '600',
                            textDecoration: 'none',
                            display: 'block',
                            border: '1px solid #e2e8f0'
                        }}
                    >
                        Return Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
