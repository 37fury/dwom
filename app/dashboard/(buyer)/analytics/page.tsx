'use client';

import { useState, useEffect } from 'react';
import { getAnalyticsAction } from '@/app/lib/actions';
import styles from '@/app/components/Analytics/Analytics.module.css';
import {
    BarChart3,
    Eye,
    DollarSign,
    TrendingUp,
    TrendingDown,
    Banknote,
    ArrowUpRight,
    ArrowDownRight,
    Activity
} from 'lucide-react';

function MetricCard({
    title,
    value,
    trend,
    trendDirection,
    icon,
    iconBg
}: {
    title: string,
    value: string,
    trend: string,
    trendDirection: 'up' | 'down' | 'neutral',
    icon: React.ReactNode,
    iconBg: string
}) {
    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <span className={styles.title}>{title}</span>
                <div className={styles.icon} style={{ background: iconBg }}>
                    {icon}
                </div>
            </div>
            <div className={styles.value}>{value}</div>
            <div className={`${styles.trend} ${trendDirection === 'up' ? styles.trendUp :
                    trendDirection === 'down' ? styles.trendDown :
                        styles.trendNeutral
                }`}>
                {trendDirection === 'up' && <ArrowUpRight size={16} />}
                {trendDirection === 'down' && <ArrowDownRight size={16} />}
                {trend} vs last month
            </div>
        </div>
    );
}

function DailyChart({ title, data, color }: { title: string, data: { date: string, value: number }[], color: string }) {
    const maxValue = Math.max(...data.map(d => d.value), 1);

    return (
        <div className={styles.chartContainer}>
            <div className={styles.chartHeader}>
                <h3 className={styles.chartTitle}>
                    <Activity size={18} />
                    {title}
                </h3>
                <div className={styles.chartLegend}>
                    <span className={styles.legendItem}>
                        <span className={styles.legendDot} style={{ background: color }}></span>
                        Daily
                    </span>
                </div>
            </div>
            {data.length > 0 ? (
                <div className={styles.chartArea}>
                    {data.map((item, i) => (
                        <div
                            key={i}
                            className={styles.chartBar}
                            style={{
                                height: `${(item.value / maxValue) * 100}%`,
                                background: `linear-gradient(180deg, ${color} 0%, ${color}99 100%)`
                            }}
                            title={`${item.date}: ${item.value}`}
                        />
                    ))}
                </div>
            ) : (
                <div className={styles.empty}>
                    <BarChart3 size={32} className={styles.emptyIcon} />
                    <span>No data available for this period</span>
                </div>
            )}
        </div>
    );
}

export default function AnalyticsPage() {
    const [pageViews, setPageViews] = useState<{ date: string, value: number }[]>([]);
    const [sales, setSales] = useState<{ date: string, value: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30');

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const days = parseInt(dateRange);
            const viewsData = await getAnalyticsAction('view_product', undefined, days);
            const salesData = await getAnalyticsAction('purchase', undefined, days);
            setPageViews(viewsData);
            setSales(salesData);
            setLoading(false);
        };
        loadData();
    }, [dateRange]);

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.empty}>
                    <Activity size={32} className={styles.emptyIcon} />
                    Loading analytics...
                </div>
            </div>
        );
    }

    const totalViews = pageViews.reduce((acc, curr) => acc + curr.value, 0);
    const totalSales = sales.reduce((acc, curr) => acc + curr.value, 0);
    const conversionRate = totalViews > 0 ? ((totalSales / totalViews) * 100).toFixed(1) : '0';

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <BarChart3 size={28} />
                    Analytics Dashboard
                </h1>
                <p className={styles.pageSubtitle}>Track your performance and insights</p>
            </div>

            {/* Date Filter */}
            <div className={styles.dateFilter}>
                {['7', '30', '90'].map(range => (
                    <button
                        key={range}
                        className={`${styles.dateBtn} ${dateRange === range ? styles.active : ''}`}
                        onClick={() => setDateRange(range)}
                    >
                        Last {range} days
                    </button>
                ))}
            </div>

            {/* Metric Cards */}
            <div className={styles.grid}>
                <MetricCard
                    title="Total Page Views"
                    value={totalViews.toLocaleString()}
                    trend="+12%"
                    trendDirection="up"
                    icon={<Eye size={18} color="#3b82f6" />}
                    iconBg="rgba(59, 130, 246, 0.1)"
                />
                <MetricCard
                    title="Total Sales"
                    value={totalSales.toLocaleString()}
                    trend="+5%"
                    trendDirection="up"
                    icon={<DollarSign size={18} color="#22c55e" />}
                    iconBg="rgba(34, 197, 94, 0.1)"
                />
                <MetricCard
                    title="Conversion Rate"
                    value={`${conversionRate}%`}
                    trend="0%"
                    trendDirection="neutral"
                    icon={<TrendingUp size={18} color="#f97316" />}
                    iconBg="rgba(249, 115, 22, 0.1)"
                />
                <MetricCard
                    title="Avg. Order Value"
                    value="GH₵45.00"
                    trend="-2%"
                    trendDirection="down"
                    icon={<Banknote size={18} color="#8b5cf6" />}
                    iconBg="rgba(139, 92, 246, 0.1)"
                />
            </div>

            {/* Charts */}
            <DailyChart
                title="Page Views"
                data={pageViews}
                color="#f97316"
            />

            <DailyChart
                title="Sales"
                data={sales}
                color="#22c55e"
            />

            {/* Summary Cards */}
            <div className={styles.summaryGrid}>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Total Revenue</div>
                    <div className={styles.summaryValue}>GH₵ {(totalSales * 45).toLocaleString()}</div>
                </div>
                <div className={styles.summaryCard}>
                    <div className={styles.summaryLabel}>Active Users</div>
                    <div className={styles.summaryValue}>{Math.floor(totalViews * 0.3).toLocaleString()}</div>
                </div>
            </div>
        </div>
    );
}
