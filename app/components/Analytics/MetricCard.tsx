'use client';

import styles from './Analytics.module.css';

interface MetricCardProps {
    title: string;
    value: string | number;
    trend?: string; // e.g. "+15%"
    trendDirection?: 'up' | 'down' | 'neutral';
    icon?: React.ReactNode;
}

export default function MetricCard({ title, value, trend, trendDirection = 'neutral', icon }: MetricCardProps) {
    const trendColor =
        trendDirection === 'up' ? 'var(--success-green, #10b981)' :
            trendDirection === 'down' ? 'var(--error-red, #ef4444)' :
                'var(--text-muted)';

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                {icon && <span className={styles.icon}>{icon}</span>}
            </div>
            <div className={styles.value}>{value}</div>
            {trend && (
                <div className={styles.trend} style={{ color: trendColor }}>
                    {trend} vs last month
                </div>
            )}
        </div>
    );
}
