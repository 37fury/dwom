import { db } from '../../lib/db';
import CheckoutForm from '../../components/CheckoutForm';
import { notFound } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { Lock, Package, Check, ArrowLeft } from 'lucide-react';

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.getProduct(id);

    if (!product) {
        notFound();
    }

    // Check authentication
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // If not authenticated, show sign-in prompt
    if (!user) {
        return (
            <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 24px' }}>
                <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', border: '1px solid #e2e8f0' }}>
                            <Package size={32} color="#f97316" />
                        </div>
                        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{product.title}</h1>
                        <p style={{ color: '#64748b' }}>by Deezy</p>
                    </div>

                    {/* Guest Authentication Prompt */}
                    <div style={{ background: 'white', borderRadius: '12px', padding: '48px 32px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                        <div style={{ width: '56px', height: '56px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '50%', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Lock size={28} color="white" />
                        </div>
                        <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a', marginBottom: '12px' }}>Sign in to continue</h2>
                        <p style={{ color: '#64748b', marginBottom: '32px', lineHeight: '1.6' }}>
                            Create a free account or sign in to complete your purchase and get instant access to {product.title}.
                        </p>

                        <Link
                            href={`/login?redirect=/checkout/${id}`}
                            style={{
                                display: 'block',
                                background: '#0f172a',
                                color: 'white',
                                padding: '14px 24px',
                                borderRadius: '8px',
                                textDecoration: 'none',
                                fontWeight: '600',
                                marginBottom: '12px'
                            }}
                        >
                            Sign In / Sign Up
                        </Link>

                        <div style={{ marginTop: '24px', padding: '16px', background: '#f8fafc', borderRadius: '8px' }}>
                            <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>You'll get:</div>
                            <div style={{ fontSize: '14px', color: '#64748b', lineHeight: '2.2' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#22c55e" /> Instant access after purchase</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#22c55e" /> Secure payment processing</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#22c55e" /> Cancel anytime</div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Check size={14} color="#22c55e" /> Full customer support</div>
                            </div>
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <Link href={`/product/${id}`} style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <ArrowLeft size={14} /> Back to product
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 24px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #e2e8f0' }}>
                        <Package size={32} color="#f97316" />
                    </div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>{product.title}</h1>
                    <p style={{ color: '#64748b' }}>by Deezy</p>
                </div>

                <CheckoutForm
                    productId={product.id}
                    productPrice={product.price}
                    currency={product.currency}
                    productTitle={product.title}
                />

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <a href="/" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        <ArrowLeft size={14} /> Cancel and return to store
                    </a>
                </div>
            </div>
        </div>
    );
}
