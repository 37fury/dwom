import { db } from '@/app/lib/db';
import Link from 'next/link';
import { ArrowLeft, Wallet, DollarSign, Clock, TrendingUp, CreditCard, CheckCircle2 } from 'lucide-react';
import styles from './payouts.module.css';
import PayoutRequestForm from './PayoutForm';

export default async function PayoutsPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const history = await db.getPayoutHistory();

    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <Wallet size={28} />
                        Payouts
                    </h1>
                    <p className={styles.subtitle}>Manage your earnings and withdrawal requests.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.balanceCard}>
                    <div className={styles.balanceHeader}>
                        <span className={styles.balanceLabel}>Available Balance</span>
                        <div className={styles.balanceIcon}>
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className={styles.balanceAmount}>GH₵{user.balance.toFixed(2)}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Pending</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(251, 191, 36, 0.1)', color: '#f59e0b' }}>
                            <Clock size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵0.00</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Withdrawn</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <TrendingUp size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵0.00</div>
                </div>
            </div>

            {/* Withdrawal Form Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        <CreditCard size={20} />
                        Request Withdrawal
                    </h3>
                </div>
                <PayoutRequestForm balance={user.balance} payoutDetails={user.payoutDetails} />
            </div>

            {/* Transaction History */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        <Clock size={20} />
                        Transaction History
                    </h3>
                    <span className={styles.sectionCount}>{history.length} transaction{history.length !== 1 ? 's' : ''}</span>
                </div>

                {history.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <CheckCircle2 size={32} />
                        </div>
                        <h4 className={styles.emptyTitle}>No transactions yet</h4>
                        <p className={styles.emptyText}>Your payout history will appear here.</p>
                    </div>
                ) : (
                    <div className={styles.historyList}>
                        {history.map((tx) => (
                            <div key={tx.id} className={styles.historyItem}>
                                <div className={styles.itemLeft}>
                                    <span className={styles.itemMethod}>{tx.method}</span>
                                    <span className={styles.itemDate}>{tx.date}</span>
                                </div>
                                <div className={styles.itemRight}>
                                    <div className={styles.itemAmount}>GH₵{tx.amount.toFixed(2)}</div>
                                    <span className={`${styles.itemStatus} ${styles[`status-${tx.status.toLowerCase()}`]}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

