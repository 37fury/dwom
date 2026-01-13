import { db } from '../../lib/db';
import Link from 'next/link';

export default async function SellerDashboardPage() {
    const user = await db.getUser();
    const stats = user.sellerStats;

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Overview</h1>
                <p style={{ color: '#64748b' }}>Welcome back, {user.name}</p>
            </header>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '48px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Total Revenue</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>GH₵{stats.totalRevenue.toFixed(2)}</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Pending Payouts</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>GH₵{stats.pendingPayouts.toFixed(2)}</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Active Customers</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.activeCustomers}</div>
                </div>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: '14px', color: '#64748b', marginBottom: '8px' }}>Total Sales</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.salesCount}</div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ display: 'flex', gap: '16px' }}>
                <Link
                    href="/dashboard/seller/products/new"
                    style={{
                        background: '#0f172a',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: '8px',
                        fontWeight: '500',
                        textDecoration: 'none'
                    }}
                >
                    Create New Product
                </Link>
            </div>
        </div>
    );
}
