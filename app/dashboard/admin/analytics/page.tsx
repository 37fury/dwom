import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, Users, Package, Store } from 'lucide-react';
import styles from './analytics.module.css';

export default function AdminAnalyticsPage() {
    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <BarChart3 size={28} />
                    Platform Analytics
                </h1>
                <p className={styles.subtitle}>Overview of platform performance and trends</p>
            </header>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3 className={styles.statLabel}>Revenue This Month</h3>
                    <p className={styles.statValue} style={{ color: '#22c55e' }}>GH₵12,450</p>
                    <span className={styles.statChange}>
                        <TrendingUp size={14} />
                        +23% from last month
                    </span>
                </div>

                <div className={styles.statCard}>
                    <h3 className={styles.statLabel}>New Users This Month</h3>
                    <p className={styles.statValue} style={{ color: '#3b82f6' }}>156</p>
                    <span className={styles.statChange}>
                        <TrendingUp size={14} />
                        +12% from last month
                    </span>
                </div>

                <div className={styles.statCard}>
                    <h3 className={styles.statLabel}>Products Sold</h3>
                    <p className={styles.statValue} style={{ color: '#f97316' }}>89</p>
                    <span className={styles.statChange}>
                        <TrendingUp size={14} />
                        +8% from last month
                    </span>
                </div>

                <div className={styles.statCard}>
                    <h3 className={styles.statLabel}>Active Sellers</h3>
                    <p className={styles.statValue} style={{ color: '#8b5cf6' }}>34</p>
                    <span className={styles.statChange}>
                        <TrendingUp size={14} />
                        +5 new this month
                    </span>
                </div>
            </div>
        </div>
    );
}
