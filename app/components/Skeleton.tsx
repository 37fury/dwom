import styles from './Skeleton.module.css';

// Base skeleton component
export function Skeleton({ className, style }: { className?: string; style?: React.CSSProperties }) {
    return <div className={`${styles.skeleton} ${className || ''}`} style={style} />;
}

// Product Card Skeleton
export function ProductCardSkeleton() {
    return (
        <div className={styles.productCardSkeleton}>
            <div className={`${styles.skeleton} ${styles.imageSkeleton}`} />
            <div className={styles.contentSkeleton}>
                <div className={`${styles.skeleton} ${styles.titleSkeleton}`} />
                <div className={`${styles.skeleton} ${styles.priceSkeleton}`} />
                <div className={`${styles.skeleton} ${styles.ratingSkeleton}`} />
            </div>
        </div>
    );
}

// Multiple Product Cards Skeleton
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '32px'
        }}>
            {Array.from({ length: count }).map((_, i) => (
                <ProductCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Stat Card Skeleton
export function StatCardSkeleton() {
    return (
        <div className={styles.statCardSkeleton}>
            <div className={`${styles.skeleton} ${styles.statLabelSkeleton}`} />
            <div className={`${styles.skeleton} ${styles.statValueSkeleton}`} />
        </div>
    );
}

// Stats Grid Skeleton
export function StatsGridSkeleton({ count = 3 }: { count?: number }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${count}, 1fr)`,
            gap: '16px',
            marginBottom: '32px'
        }}>
            {Array.from({ length: count }).map((_, i) => (
                <StatCardSkeleton key={i} />
            ))}
        </div>
    );
}

// Table Row Skeleton
export function TableRowSkeleton() {
    return (
        <div className={styles.tableRowSkeleton}>
            <div className={`${styles.skeleton} ${styles.avatarSkeleton}`} />
            <div className={`${styles.skeleton} ${styles.textSkeleton}`} />
            <div className={`${styles.skeleton}`} style={{ height: 14, width: 80 }} />
        </div>
    );
}

// Table Skeleton
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
            {Array.from({ length: rows }).map((_, i) => (
                <TableRowSkeleton key={i} />
            ))}
        </div>
    );
}

// Dashboard Page Skeleton
export function DashboardSkeleton() {
    return (
        <div className={styles.dashboardSkeleton}>
            <div className={`${styles.skeleton} ${styles.headerSkeleton}`} />
            <StatsGridSkeleton count={4} />
            <TableSkeleton rows={5} />
        </div>
    );
}

// Hero Section Skeleton
export function HeroSkeleton() {
    return (
        <div className={styles.heroSkeleton}>
            <div className={`${styles.skeleton} ${styles.heroTitleSkeleton}`} />
            <div className={`${styles.skeleton} ${styles.heroSubtitleSkeleton}`} />
            <div className={`${styles.skeleton} ${styles.heroSearchSkeleton}`} />
        </div>
    );
}
