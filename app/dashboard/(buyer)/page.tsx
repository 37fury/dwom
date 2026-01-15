import Link from 'next/link';
import { db } from '../../lib/db';
import styles from './page.module.css';
import FadeIn from '@/app/components/FadeIn';
import { redirect } from 'next/navigation';
import {
    Wallet,
    ArrowUpRight,
    ArrowDownLeft,
    CreditCard,
    Package,
    TrendingUp,
    Calendar,
    ExternalLink,
    Settings,
    ChevronRight,
    Zap,
    ShoppingBag,
    Star
} from 'lucide-react';

export default async function DashboardPage() {
    const user = await db.getUser();

    if (!user) {
        redirect('/login');
    }

    // Quick actions for the dashboard
    const quickActions = [
        { icon: ShoppingBag, label: 'Browse Marketplace', href: '/', color: '#f97316' },
        { icon: CreditCard, label: 'Add Funds', href: '/dashboard/wallet', color: '#3b82f6' },
        { icon: Star, label: 'My Purchases', href: '/dashboard/memberships', color: '#8b5cf6' },
        { icon: TrendingUp, label: 'Analytics', href: '/dashboard/analytics', color: '#10b981' },
    ];

    return (
        <FadeIn className={styles.container}>
            {/* Welcome Header */}
            <div className={styles.welcomeHeader}>
                <div>
                    <h1 className={styles.welcomeTitle}>
                        Welcome back, {user.name?.split(' ')[0] || 'there'}! 👋
                    </h1>
                    <p className={styles.welcomeSubtitle}>
                        Here's an overview of your account
                    </p>
                </div>
            </div>

            {/* Wallet Card - Premium Gradient Design */}
            <div className={styles.walletCard}>
                <div className={styles.walletGlow}></div>
                <div className={styles.walletContent}>
                    <div className={styles.walletTop}>
                        <div className={styles.walletIconWrapper}>
                            <Wallet size={24} />
                        </div>
                        <span className={styles.walletCurrency}>GH₵</span>
                    </div>

                    <div className={styles.walletBalance}>
                        <span className={styles.balanceLabel}>Available Balance</span>
                        <div className={styles.balanceAmount}>
                            <span className={styles.balanceCurrency}>GH₵</span>
                            <span className={styles.balanceValue}>{user.balance.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className={styles.walletActions}>
                        <Link href="/dashboard/wallet" className={styles.walletBtn}>
                            <ArrowDownLeft size={18} />
                            <span>Withdraw</span>
                        </Link>
                        <Link href="/dashboard/wallet" className={styles.walletBtnSecondary}>
                            <ArrowUpRight size={18} />
                            <span>Top Up</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.walletPattern}></div>
            </div>

            {/* Quick Actions */}
            <div className={styles.quickActionsSection}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.quickActionsGrid}>
                    {quickActions.map((action, i) => (
                        <Link key={i} href={action.href} className={styles.quickActionCard}>
                            <div className={styles.quickActionIcon} style={{ background: `${action.color}15`, color: action.color }}>
                                <action.icon size={22} />
                            </div>
                            <span className={styles.quickActionLabel}>{action.label}</span>
                            <ChevronRight size={16} className={styles.quickActionArrow} />
                        </Link>
                    ))}
                </div>
            </div>

            {/* Memberships Section */}
            <div className={styles.membershipsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <Package size={20} />
                        Your Memberships
                    </h2>
                    <Link href="/dashboard/memberships" className={styles.viewAllLink}>
                        View All <ChevronRight size={16} />
                    </Link>
                </div>

                {user.memberships.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <Package size={32} />
                        </div>
                        <h3>No active memberships</h3>
                        <p>Browse the marketplace to find amazing products</p>
                        <Link href="/" className={styles.browseBtn}>
                            <Zap size={18} />
                            Explore Marketplace
                        </Link>
                    </div>
                ) : (
                    <div className={styles.membershipGrid}>
                        {user.memberships.slice(0, 3).map((membership) => (
                            <div key={membership.id} className={styles.membershipCard}>
                                <div className={styles.membershipHeader}>
                                    <div className={`${styles.statusBadge} ${membership.status === 'active' ? styles.statusActive : styles.statusPending}`}>
                                        <span className={styles.statusDot}></span>
                                        {membership.status}
                                    </div>
                                </div>
                                <h3 className={styles.membershipTitle}>{membership.productName}</h3>
                                <div className={styles.membershipMeta}>
                                    <Calendar size={14} />
                                    <span>Renews {membership.nextBilling}</span>
                                </div>
                                <div className={styles.membershipActions}>
                                    <Link href={`/course/${membership.productId}`} className={styles.accessBtn}>
                                        <ExternalLink size={16} />
                                        Access Content
                                    </Link>
                                    <Link href="/dashboard/settings" className={styles.manageBtn}>
                                        <Settings size={16} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </FadeIn>
    );
}
