import { db } from '../../../lib/db';
import Link from 'next/link';

export default async function ProductsPage() {
    const user = await db.getUser();
    const products = await db.getSellerProducts(user.id);

    return (
        <div>
            <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Your Products</h1>
                    <p style={{ color: '#64748b' }}>Manage your listings and content.</p>
                </div>
                <Link
                    href="/dashboard/seller/products/new"
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '10px 20px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        textDecoration: 'none',
                        fontSize: '14px'
                    }}
                >
                    + New Product
                </Link>
            </header>

            {products.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '64px', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>No products yet</h3>
                    <p style={{ color: '#64748b', marginBottom: '24px' }}>Create your first digital product to start selling.</p>
                    <Link href="/dashboard/seller/products/new" style={{ color: '#f97316', fontWeight: '500' }}>Create Product &rarr;</Link>
                </div>
            ) : (
                <div style={{ display: 'grid', gap: '16px' }}>
                    {products.map((product) => (
                        <div key={product.id} style={{ display: 'flex', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', alignItems: 'center' }}>
                            <div style={{ width: '64px', height: '64px', background: '#f1f5f9', borderRadius: '8px', marginRight: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {/* Placeholder for image */}
                                <span style={{ fontSize: '24px' }}>📦</span>
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ fontWeight: '600', color: '#0f172a' }}>{product.title}</h3>
                                <div style={{ fontSize: '14px', color: '#64748b' }}>{product.currency}{product.price.toFixed(2)} • {product.reviews} reviews</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white', fontSize: '14px' }}>Edit</button>
                                <button style={{ padding: '8px 16px', border: '1px solid #cbd5e1', borderRadius: '6px', background: 'white', fontSize: '14px' }}>Manage Content</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
