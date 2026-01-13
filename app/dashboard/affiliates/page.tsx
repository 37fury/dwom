import { db } from '../../lib/db';
import ReferralTable from '../../components/ReferralTable';

// Simple card component for stats
function StatCard({ title, value, subtext }: { title: string, value: string, subtext?: string }) {
    return (
        <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
            <h3 style={{ fontSize: '13px', color: '#64748b', fontWeight: '500', marginBottom: '8px' }}>{title}</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '4px' }}>{value}</div>
            {subtext && <div style={{ fontSize: '12px', color: '#94a3b8' }}>{subtext}</div>}
        </div>
    );
}

export default async function AffiliatePage() {
    const stats = await db.getAffiliateStats();
    // Mock user for the link
    const user = await db.getUser();

    return (
        <div>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a' }}>Affiliates</h1>
                <p style={{ color: '#64748b' }}>Track your referrals and earnings.</p>
            </header>

            {/* Referral Link Card */}
            <div style={{ background: '#f0f9ff', border: '1px solid #bae6fd', padding: '24px', borderRadius: '12px', marginBottom: '32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#0369a1', marginBottom: '4px' }}>Your Referral Link</h3>
                    <p style={{ fontSize: '14px', color: '#0284c7' }}>Share this link to earn 10% commission on every sale.</p>
                </div>
                <div style={{ display: 'flex', gap: '8px', background: 'white', padding: '8px', borderRadius: '8px', border: '1px solid #e0f2fe' }}>
                    <code style={{ fontFamily: 'monospace', color: '#0f172a', padding: '8px 12px', fontSize: '14px' }}>
                        dwom.com/r/{user.name.toLowerCase()}
                    </code>
                    <button style={{ background: '#0284c7', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>
                        Copy
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                <StatCard title="Total Clicks" value={stats.clicks.toLocaleString()} subtext="+124 this week" />
                <StatCard title="Signups" value={stats.signups.toString()} subtext="4.3% conversion rate" />
                <StatCard title="Pending Earnings" value={`GH₵${stats.pendingEarnings.toFixed(2)}`} subtext="Available in 7 days" />
                <StatCard title="Total Paid" value={`GH₵${stats.totalPaid.toFixed(2)}`} subtext="Lifetime earnings" />
            </div>

            {/* Recent Referrals */}
            <div>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0f172a', marginBottom: '16px' }}>Recent Referrals</h3>
                <ReferralTable referrals={stats.recentReferrals} />
            </div>
        </div>
    );
}
