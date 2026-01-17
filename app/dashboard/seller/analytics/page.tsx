import { db } from '@/app/lib/db';
import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp, Eye, ShoppingCart, Users, DollarSign, Package } from 'lucide-react';
import styles from './analytics.module.css';

export default async function AnalyticsPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    // Fetch analytics data
    const stats = user.sellerStats;
    const revenueData = await db.getRevenueAnalytics();
    const products = await db.getSellerProducts(user.id) as any[];

    // Calculate metrics (viewCount and salesCount may come from extended product data)
    const totalViews = products.reduce((sum, p) => sum + (p.view_count || p.viewCount || 0), 0);
    const totalSales = stats?.salesCount || 0;
    const conversionRate = totalViews > 0 ? ((totalSales / totalViews) * 100).toFixed(1) : '0.0';

    // Top performing products (by reviews as proxy for sales since salesCount may not exist)
    const topProducts = [...products]
        .sort((a, b) => (b.reviews_count || b.reviews || 0) - (a.reviews_count || a.reviews || 0))
        .slice(0, 5);

    const maxRevenue = Math.max(...revenueData.map(d => d.revenue), 10);

    // Calculate week-over-week growth
    const thisWeekRevenue = revenueData.slice(-7).reduce((sum, d) => sum + d.revenue, 0);
    const lastWeekRevenue = revenueData.slice(-14, -7).reduce((sum, d) => sum + d.revenue, 0);
    const weekGrowth = lastWeekRevenue > 0
        ? (((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue) * 100).toFixed(1)
        : '100';

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1><BarChart3 size={28} /> Analytics</h1>
                <p>Track your store performance and growth</p>
            </header>

            {/* Key Metrics */}
            <div className={styles.metricsGrid}>
                <div className={styles.metricCard}>
                    <div className={styles.metricIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <DollarSign size={20} />
                    </div>
                    <div className={styles.metricContent}>
                        <span className={styles.metricLabel}>Total Revenue</span>
                        <span className={styles.metricValue}>GH₵{(stats?.totalRevenue || 0).toFixed(2)}</span>
                        <span className={`${styles.metricChange} ${Number(weekGrowth) >= 0 ? styles.positive : styles.negative}`}>
                            <TrendingUp size={12} /> {weekGrowth}% vs last week
                        </span>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <Eye size={20} />
                    </div>
                    <div className={styles.metricContent}>
                        <span className={styles.metricLabel}>Total Views</span>
                        <span className={styles.metricValue}>{totalViews.toLocaleString()}</span>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                        <ShoppingCart size={20} />
                    </div>
                    <div className={styles.metricContent}>
                        <span className={styles.metricLabel}>Total Sales</span>
                        <span className={styles.metricValue}>{totalSales}</span>
                    </div>
                </div>

                <div className={styles.metricCard}>
                    <div className={styles.metricIcon} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div className={styles.metricContent}>
                        <span className={styles.metricLabel}>Conversion Rate</span>
                        <span className={styles.metricValue}>{conversionRate}%</span>
                    </div>
                </div>
            </div>

            {/* Revenue Chart */}
            <section className={styles.chartSection}>
                <div className={styles.chartHeader}>
                    <h2><BarChart3 size={20} /> Revenue Over Time</h2>
                    <div className={styles.chartLegend}>
                        <span>Last 30 days</span>
                    </div>
                </div>

                {revenueData.length === 0 ? (
                    <div className={styles.emptyChart}>
                        <BarChart3 size={48} />
                        <p>No revenue data yet. Start selling to see analytics!</p>
                    </div>
                ) : (
                    <div className={styles.chartContainer}>
                        <div className={styles.chartYAxis}>
                            <span>GH₵{maxRevenue}</span>
                            <span>GH₵{(maxRevenue / 2).toFixed(0)}</span>
                            <span>GH₵0</span>
                        </div>
                        <div className={styles.chartBars}>
                            {revenueData.slice(-30).map((d, i) => (
                                <div key={i} className={styles.barWrapper}>
                                    <div
                                        className={styles.bar}
                                        style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                                        title={`${d.name}: GH₵${d.revenue.toFixed(2)}`}
                                    />
                                    {i % 5 === 0 && <span className={styles.barLabel}>{d.name}</span>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Top Products */}
            <section className={styles.productsSection}>
                <div className={styles.sectionHeader}>
                    <h2><Package size={20} /> Top Performing Products</h2>
                </div>

                {topProducts.length === 0 ? (
                    <div className={styles.emptyProducts}>
                        <Package size={48} />
                        <p>Add products to see performance data</p>
                    </div>
                ) : (
                    <div className={styles.productsTable}>
                        <div className={styles.tableHeader}>
                            <span>Product</span>
                            <span>Views</span>
                            <span>Sales</span>
                            <span>Revenue</span>
                            <span>Conv. Rate</span>
                        </div>
                        {topProducts.map(product => {
                            const views = product.viewCount || 0;
                            const sales = product.salesCount || 0;
                            const revenue = sales * product.price;
                            const convRate = views > 0 ? ((sales / views) * 100).toFixed(1) : '0.0';

                            return (
                                <div key={product.id} className={styles.tableRow}>
                                    <span className={styles.productName}>{product.title}</span>
                                    <span>{views.toLocaleString()}</span>
                                    <span>{sales}</span>
                                    <span className={styles.revenue}>GH₵{revenue.toFixed(2)}</span>
                                    <span className={styles.convRate}>{convRate}%</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </section>

            {/* Customer Stats */}
            <section className={styles.customersSection}>
                <div className={styles.sectionHeader}>
                    <h2><Users size={20} /> Customer Insights</h2>
                </div>
                <div className={styles.customerStats}>
                    <div className={styles.customerStat}>
                        <span className={styles.customerValue}>{stats?.activeCustomers || 0}</span>
                        <span className={styles.customerLabel}>Total Customers</span>
                    </div>
                    <div className={styles.customerStat}>
                        <span className={styles.customerValue}>
                            GH₵{stats?.totalRevenue && stats?.activeCustomers
                                ? (stats.totalRevenue / stats.activeCustomers).toFixed(2)
                                : '0.00'}
                        </span>
                        <span className={styles.customerLabel}>Avg. Order Value</span>
                    </div>
                    <div className={styles.customerStat}>
                        <span className={styles.customerValue}>{products.length}</span>
                        <span className={styles.customerLabel}>Active Products</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
