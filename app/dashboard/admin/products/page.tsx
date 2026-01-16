import Link from 'next/link';
import { ArrowLeft, Package, Search } from 'lucide-react';
import { db, Product } from '@/app/lib/db';

export default async function AdminProductsPage() {
    const products = await db.getAllProducts();

    return (
        <div style={{ maxWidth: '1200px' }}>
            <Link href="/dashboard/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    <Package size={28} />
                    Products
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b' }}>Moderate and manage marketplace listings</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {products.map(product => (
                    <div key={product.id} style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <span style={{ padding: '4px 10px', background: '#f1f5f9', borderRadius: '6px', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>
                                {product.category}
                            </span>
                        </div>
                        <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>{product.title}</h3>
                        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>{product.currency}{product.price}</p>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ flex: 1, padding: '10px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>
                                View
                            </button>
                            <button style={{ padding: '10px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', fontSize: '13px', fontWeight: 600, color: '#dc2626', cursor: 'pointer' }}>
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
