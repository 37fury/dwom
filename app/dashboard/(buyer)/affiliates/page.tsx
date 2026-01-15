import { db } from '../../../lib/db';
import Link from 'next/link';
import styles from './affiliates.module.css';
import {
    Megaphone,
    Users,
    MousePointer,
    UserPlus,
    Clock,
    Wallet,
    Copy,
    ExternalLink
} from 'lucide-react';

function StatCard({
    title,
    value,
    subtext,
    icon,
    iconBg,
    iconColor
}: {
    title: string,
    value: string,
    subtext?: string,
    icon: React.ReactNode,
    iconBg: string,
    iconColor: string
}) {
    return (
        <div className={styles.statCard}>
            <div className={styles.statHeader}>
                <span className={styles.statTitle}>{title}</span>
                <div className={styles.statIcon} style={{ background: iconBg, color: iconColor }}>
                    {icon}
                </div>
            </div>
            <div className={styles.statValue}>{value}</div>
            {subtext && <div className={styles.statSubtext}>{subtext}</div>}
        </div>
    );
}

export default async function AffiliatePage() {
    const stats = await db.getAffiliateStats();
    const user = await db.getUser();

    return (
        <div>
            {/* Header */}
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        <Users size={28} />
                        Affiliate Dashboard
                    </h1>
                    <p className={styles.subtitle}>Track your referrals and earnings.</p>
                </div>
                <div className={styles.headerActions}>
                    <Link href="/dashboard/affiliates/music" className={styles.primaryButton}>
                        <Megaphone size={18} />
                        Creator Hub
                    </Link>
                    <Link href="/dashboard/affiliates/marketplace" className={styles.secondaryButton}>
                        <ExternalLink size={18} />
                        Browse Marketplace
                    </Link>
                </div>
            </header>

            {/* Referral Link Card */}
            <div className={styles.referralCard}>
                <div className={styles.referralGlow}></div>
                <div className={styles.referralContent}>
                    <h3 className={styles.referralTitle}>Your Referral Link</h3>
                    <p className={styles.referralSubtitle}>Share this link to earn 10% commission on every sale.</p>
                    <div className={styles.linkBox}>
                        <span className={styles.linkText}>
                            dwom.com/r/{user?.name?.toLowerCase().replace(/\s/g, '') ?? 'guest'}
                        </span>
                        <button className={styles.btnCopy}>
                            <Copy size={14} style={{ marginRight: '6px' }} />
                            Copy
                        </button>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <StatCard
                    title="Total Clicks"
                    value={stats.clicks.toLocaleString()}
                    subtext="+124 this week"
                    icon={<MousePointer size={16} />}
                    iconBg="rgba(59, 130, 246, 0.1)"
                    iconColor="#3b82f6"
                />
                <StatCard
                    title="Signups"
                    value={stats.signups.toString()}
                    subtext="4.3% conversion rate"
                    icon={<UserPlus size={16} />}
                    iconBg="rgba(34, 197, 94, 0.1)"
                    iconColor="#22c55e"
                />
                <StatCard
                    title="Pending Earnings"
                    value={`GH₵${stats.pendingEarnings.toFixed(2)}`}
                    subtext="Available in 7 days"
                    icon={<Clock size={16} />}
                    iconBg="rgba(249, 115, 22, 0.1)"
                    iconColor="#f97316"
                />
                <StatCard
                    title="Total Paid"
                    value={`GH₵${stats.totalPaid.toFixed(2)}`}
                    subtext="Lifetime earnings"
                    icon={<Wallet size={16} />}
                    iconBg="rgba(139, 92, 246, 0.1)"
                    iconColor="#8b5cf6"
                />
            </div>

            {/* Recent Referrals */}
            <div className={styles.tableSection}>
                <h3 className={styles.sectionTitle}>
                    <Users size={20} />
                    Recent Referrals
                </h3>
                <div className={styles.tableWrapper}>
                    {stats.recentReferrals.length > 0 ? (
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stats.recentReferrals.map((ref: any, i: number) => (
                                    <tr key={i}>
                                        <td style={{ fontWeight: 600 }}>{ref.user}</td>
                                        <td>{ref.date}</td>
                                        <td>
                                            <span style={{
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 600,
                                                background: ref.status === 'Paid' ? '#dcfce7' : '#fef3c7',
                                                color: ref.status === 'Paid' ? '#166534' : '#92400e'
                                            }}>
                                                {ref.status}
                                            </span>
                                        </td>
                                        <td style={{ fontWeight: 700, color: '#22c55e' }}>
                                            GH₵{ref.amount?.toFixed(2) || '0.00'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className={styles.emptyTable}>
                            <Users size={32} style={{ marginBottom: '12px', opacity: 0.5 }} />
                            <p>No referrals yet. Share your link to start earning!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
