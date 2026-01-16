import Link from 'next/link';
import { ArrowLeft, BarChart3 } from 'lucide-react';

export default function AdminAnalyticsPage() {
    return (
        <div style={{ maxWidth: '1200px' }}>
            <Link href="/dashboard/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', fontSize: '14px', marginBottom: '24px' }}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '28px', fontWeight: 800, color: '#0f172a', marginBottom: '8px' }}>
                    <BarChart3 size={28} />
                    Platform Analytics
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b' }}>Overview of platform performance and trends</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px' }}>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Revenue This Month</h3>
                    <p style={{ fontSize: '36px', fontWeight: 800, color: '#22c55e' }}>GH₵12,450</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>+23% from last month</p>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>New Users This Month</h3>
                    <p style={{ fontSize: '36px', fontWeight: 800, color: '#3b82f6' }}>156</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>+12% from last month</p>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Products Sold</h3>
                    <p style={{ fontSize: '36px', fontWeight: 800, color: '#f97316' }}>89</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>+8% from last month</p>
                </div>
                <div style={{ background: 'white', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '32px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#0f172a', marginBottom: '24px' }}>Active Sellers</h3>
                    <p style={{ fontSize: '36px', fontWeight: 800, color: '#8b5cf6' }}>34</p>
                    <p style={{ fontSize: '14px', color: '#64748b', marginTop: '8px' }}>+5 new this month</p>
                </div>
            </div>
        </div>
    );
}
