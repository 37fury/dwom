import styles from './page.module.css';

export default function SellerOverview() {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.pageTitle}>Business Overview</h1>
                <div className={styles.timeRange}>Last 30 Days ▼</div>
            </div>

            {/* KPI Cards */}
            <div className={styles.kpiGrid}>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Total Revenue</span>
                    <span className={styles.kpiValue}>GH₵ 12,450.00</span>
                    <span className={styles.kpiChange}>+12% vs last month</span>
                </div>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Active Members</span>
                    <span className={styles.kpiValue}>1,240</span>
                    <span className={styles.kpiChange}>+5% vs last month</span>
                </div>
                <div className={styles.kpiCard}>
                    <span className={styles.kpiLabel}>Page Views</span>
                    <span className={styles.kpiValue}>45.2k</span>
                    <span className={styles.kpiChange}>+24% vs last month</span>
                </div>
            </div>

            {/* Main Chart Area */}
            <div className={styles.chartContainer}>
                <h3 className={styles.chartTitle}>Revenue Trends</h3>
                <div className={styles.chartMock}>
                    {/* Visual simulation of a bar chart */}
                    {[40, 60, 45, 70, 85, 60, 90, 75, 50, 65, 80, 95].map((h, i) => (
                        <div key={i} className={styles.bar} style={{ height: `${h}%` }}></div>
                    ))}
                </div>
                <div className={styles.chartLabels}>
                    <span>Oct 1</span>
                    <span>Oct 8</span>
                    <span>Oct 15</span>
                    <span>Oct 22</span>
                </div>
            </div>
        </div>
    );
}
