import { db } from '../../lib/db';
import Link from 'next/link';
import styles from './seller.module.css';
import {
    LayoutDashboard,
    DollarSign,
    Clock,
    Users,
    ShoppingBag,
    TrendingUp,
    Plus,
    Wallet,
    UserCircle,
    BarChart3,
    Zap,
    Calendar
} from 'lucide-react';

export default async function SellerDashboardPage() {
    const user = await db.getUser();
    const stats = user?.sellerStats;
    const revenueData = await db.getRevenueAnalytics();

    if (!stats) {
        return (
            <div className={styles.emptyChart}>
                <BarChart3 size={32} />
                Loading...
            </div>
        );
    }

    const maxVal = Math.max(...revenueData.map((d) => d.revenue), 10);
    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });

    return (
        <div className={styles.container}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerTop}>
                    <div>
                        <h1 className={styles.title}>
                            <LayoutDashboard size={28} />
                            Overview
                        </h1>
                        <p className={styles.subtitle}>Welcome back, {user?.name ?? 'Seller'}</p>
                    </div>
                    <div className={styles.todayBadge}>
                        <Calendar size={16} />
                        {today}
                    </div>
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                {/* Revenue Card - Special styling */}
                <div className={`${styles.statCard} ${styles.revenueCard}`}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Revenue</span>
                        <div className={styles.statIcon}>
                            <DollarSign size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵{stats.totalRevenue.toFixed(2)}</div>
                    <div className={`${styles.statTrend} ${styles.trendUp}`}>
                        <TrendingUp size={14} />
                        +12% from last month
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Pending Payouts</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                            <Clock size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵{stats.pendingPayouts.toFixed(2)}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Active Customers</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Users size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{stats.activeCustomers}</div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Sales</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <ShoppingBag size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{stats.salesCount}</div>
                </div>
            </div>

            {/* Revenue Chart */}
            <div className={styles.chartSection}>
                <div className={styles.chartHeader}>
                    <h3 className={styles.chartTitle}>
                        <BarChart3 size={20} />
                        Revenue Performance
                    </h3>
                    <div className={styles.chartPeriod}>
                        <button className={`${styles.periodBtn} ${styles.active}`}>7 Days</button>
                        <button className={styles.periodBtn}>30 Days</button>
                        <button className={styles.periodBtn}>90 Days</button>
                    </div>
                </div>

                {revenueData.length === 0 ? (
                    <div className={styles.emptyChart}>
                        <BarChart3 size={32} />
                        <span>No data available yet</span>
                    </div>
                ) : (
                    <div className={styles.chartArea}>
                        {revenueData.slice(-7).map((d: any, i: number) => {
                            const height = (d.revenue / maxVal) * 100;
                            return (
                                <div key={i} className={styles.chartBar}>
                                    <div
                                        className={styles.bar}
                                        style={{ height: `${height}%` }}
                                        title={`${d.name}: GH₵${d.revenue}`}
                                    />
                                    <span className={styles.barLabel}>{d.name}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {/* Quick Actions */}
            <div className={styles.actionsSection}>
                <h3 className={styles.sectionTitle}>
                    <Zap size={20} />
                    Quick Actions
                </h3>
                <div className={styles.actionsGrid}>
                    <Link href="/dashboard/seller/products/new" className={`${styles.actionCard} ${styles.actionCardPrimary}`}>
                        <div className={styles.actionIcon}>
                            <Plus size={24} />
                        </div>
                        <span className={styles.actionLabel}>Create New Product</span>
                    </Link>
                    <Link href="/dashboard/seller/payouts" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <Wallet size={24} />
                        </div>
                        <span className={styles.actionLabel}>Request Payout</span>
                    </Link>
                    <Link href="/dashboard/seller/customers" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <UserCircle size={24} />
                        </div>
                        <span className={styles.actionLabel}>View Customers</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
