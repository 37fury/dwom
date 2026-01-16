import { db } from '@/app/lib/db';
import Link from 'next/link';
import {
    Users,
    Package,
    DollarSign,
    FileCheck,
    Clock,
    CheckCircle2,
    AlertTriangle,
    TrendingUp,
    ArrowRight
} from 'lucide-react';
import styles from './admin.module.css';

export default async function AdminDashboard() {
    // Fetch admin stats
    const allProducts = await db.getAllProducts();
    const pendingKYC = 3; // Mock data - would come from db
    const totalUsers = 156; // Mock data
    const totalRevenue = 12450; // Mock data

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Admin Dashboard</h1>
                    <p className={styles.subtitle}>Platform overview and management</p>
                </div>
                <div className={styles.headerBadge}>
                    <Clock size={14} />
                    Last updated: Just now
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Users</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Users size={20} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{totalUsers}</div>
                    <div className={styles.statChange}>
                        <TrendingUp size={14} />
                        +12 this week
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Products</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <Package size={20} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{allProducts.length}</div>
                    <div className={styles.statChange}>
                        <TrendingUp size={14} />
                        +5 this week
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Platform Revenue</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                            <DollarSign size={20} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵{totalRevenue.toLocaleString()}</div>
                    <div className={styles.statChange}>
                        <TrendingUp size={14} />
                        +GH₵2,340 this week
                    </div>
                </div>

                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Pending KYC</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>
                            <FileCheck size={20} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{pendingKYC}</div>
                    <div className={styles.statChangeWarning}>
                        <AlertTriangle size={14} />
                        Requires attention
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Quick Actions</h2>
                <div className={styles.actionsGrid}>
                    <Link href="/dashboard/admin/kyc" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #eab308, #ca8a04)' }}>
                            <FileCheck size={24} />
                        </div>
                        <div className={styles.actionContent}>
                            <h3>Review KYC</h3>
                            <p>{pendingKYC} pending verifications</p>
                        </div>
                        <ArrowRight size={20} className={styles.actionArrow} />
                    </Link>

                    <Link href="/dashboard/admin/users" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #3b82f6, #2563eb)' }}>
                            <Users size={24} />
                        </div>
                        <div className={styles.actionContent}>
                            <h3>Manage Users</h3>
                            <p>View and manage all users</p>
                        </div>
                        <ArrowRight size={20} className={styles.actionArrow} />
                    </Link>

                    <Link href="/dashboard/admin/payouts" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)' }}>
                            <DollarSign size={24} />
                        </div>
                        <div className={styles.actionContent}>
                            <h3>Payouts</h3>
                            <p>Review payout requests</p>
                        </div>
                        <ArrowRight size={20} className={styles.actionArrow} />
                    </Link>

                    <Link href="/dashboard/admin/products" className={styles.actionCard}>
                        <div className={styles.actionIcon} style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)' }}>
                            <Package size={24} />
                        </div>
                        <div className={styles.actionContent}>
                            <h3>Products</h3>
                            <p>Moderate marketplace listings</p>
                        </div>
                        <ArrowRight size={20} className={styles.actionArrow} />
                    </Link>
                </div>
            </div>

            {/* Recent Activity */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Recent Activity</h2>
                <div className={styles.activityList}>
                    <div className={styles.activityItem}>
                        <div className={styles.activityIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
                            <CheckCircle2 size={18} />
                        </div>
                        <div className={styles.activityContent}>
                            <p><strong>User verified:</strong> kofi@example.com passed KYC</p>
                            <span>2 hours ago</span>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <div className={styles.activityIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
                            <Clock size={18} />
                        </div>
                        <div className={styles.activityContent}>
                            <p><strong>New KYC submission:</strong> ama@example.com submitted documents</p>
                            <span>5 hours ago</span>
                        </div>
                    </div>
                    <div className={styles.activityItem}>
                        <div className={styles.activityIcon} style={{ background: '#dbeafe', color: '#2563eb' }}>
                            <Users size={18} />
                        </div>
                        <div className={styles.activityContent}>
                            <p><strong>New user signup:</strong> yaw@example.com joined the platform</p>
                            <span>1 day ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
