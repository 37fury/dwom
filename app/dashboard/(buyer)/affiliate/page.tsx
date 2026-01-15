import { db } from '../../../lib/db';
import Link from 'next/link';

export default async function AffiliateDashboard() {
    const stats = await db.getUserAffiliateStats();

    // Aggregates
    const totalEarnings = stats?.reduce((acc: number, s: any) => acc + s.totalEarnings, 0) || 0;
    const pendingEarnings = stats?.reduce((acc: number, s: any) => acc + s.pendingEarnings, 0) || 0;
    const totalSales = stats?.reduce((acc: number, s: any) => acc + s.salesCount, 0) || 0;
    const totalClicks = stats?.reduce((acc: number, s: any) => acc + s.clicks, 0) || 0;

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '48px' }}>
            <div style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Affiliate Dashboard</h1>
                <p style={{ color: '#64748b' }}>Track your referrals and earnings.</p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px', marginBottom: '32px'
            }}>
                <StatCard label="Total Earnings" value={`GHS ${totalEarnings.toFixed(2)}`} />
                <StatCard label="Pending Payout" value={`GHS ${pendingEarnings.toFixed(2)}`} color="#f59e0b" />
                <StatCard label="Total Sales" value={totalSales} />
                <StatCard label="Link Clicks" value={totalClicks} />
            </div>

            {/* Active Links Table */}
            <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0', fontWeight: '600' }}>
                    Active Links
                </div>
                {(!stats || stats.length === 0) ? (
                    <div style={{ padding: '48px', textAlign: 'center', color: '#64748b' }}>
                        You haven't promoted any products yet.
                        <br />
                        <Link href="/" style={{ color: '#ff5f00', fontWeight: '600', marginTop: '12px', display: 'inline-block' }}>
                            Browse Marketplace
                        </Link>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                            <thead style={{ background: '#f8fafc', color: '#64748b', textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Product</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Code</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Clicks</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Sales</th>
                                    <th style={{ padding: '12px 20px', fontWeight: '600' }}>Earnings</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.map((link: any) => (
                                    <tr key={link.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: '500' }}>{link.productName}</td>
                                        <td style={{ padding: '16px 20px' }}>
                                            <span style={{ background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', fontFamily: 'monospace' }}>
                                                {link.code}
                                            </span>
                                        </td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>{link.clicks}</td>
                                        <td style={{ padding: '16px 20px', color: '#64748b' }}>{link.salesCount}</td>
                                        <td style={{ padding: '16px 20px', fontWeight: '600', color: '#166534' }}>
                                            GHS {link.totalEarnings.toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

function StatCard({ label, value, color }: { label: string, value: string | number, color?: string }) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <div style={{ color: '#64748b', fontSize: '13px', fontWeight: '600', textTransform: 'uppercase', marginBottom: '8px' }}>
                {label}
            </div>
            <div style={{ fontSize: '28px', fontWeight: '700', color: color || '#0f172a' }}>
                {value}
            </div>
        </div>
    )
}
