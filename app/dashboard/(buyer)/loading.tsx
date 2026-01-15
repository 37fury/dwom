import styles from './page.module.css';

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            {/* Header Skeleton */}
            <div className={styles.skeletonHeader}>
                <div className={styles.skeletonTitle}></div>
                <div className={styles.skeletonSubtitle}></div>
            </div>

            {/* Quick Actions Skeleton */}
            <div className={styles.skeletonGrid}>
                <div className={styles.skeletonCard}></div>
                <div className={styles.skeletonCard}></div>
                <div className={styles.skeletonCard}></div>
            </div>

            {/* Content Skeleton */}
            <div className={styles.skeletonContent}>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
                <div className={styles.skeletonLine}></div>
            </div>
        </div>
    );
}
