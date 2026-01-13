import { db } from '../../lib/db';
import CheckoutForm from '../../components/CheckoutForm';
import ReviewList from '../../components/ReviewList';
import { notFound } from 'next/navigation';

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.getProduct(id);

    if (!product) {
        notFound();
    }

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '48px 24px' }}>
            <div style={{ maxWidth: '480px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ width: '64px', height: '64px', background: 'white', borderRadius: '12px', margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', border: '1px solid #e2e8f0' }}>
                        📦
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

                {/* Reviews Section */}
                {product.reviewsList && <ReviewList reviews={product.reviewsList} />}

                <div style={{ marginTop: '32px', textAlign: 'center' }}>
                    <a href="/" style={{ color: '#64748b', fontSize: '14px', textDecoration: 'none' }}>&larr; Cancel and return to store</a>
                </div>
            </div>
        </div>
    );
}
