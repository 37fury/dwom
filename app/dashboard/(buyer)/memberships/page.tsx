import Link from 'next/link';
import { redirect } from 'next/navigation';
import styles from './memberships.module.css';
import { db } from '../../../lib/db';
import {
    Package,
    ArrowLeft,
    Download,
    ExternalLink,
    Calendar,
    Zap,
    ShoppingBag,
    Star
} from 'lucide-react';

export default async function MembershipsPage() {
    const user = await db.getUser();

    if (!user) {
        redirect('/login');
    }

    const memberships = await db.getUserMemberships(user.id);

    // Stats
    const activeCount = memberships.filter(m => m.status === 'active').length;
    const totalProducts = memberships.length;

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <h1 className={styles.pageTitle}>
                    <Package size={28} />
                    My Memberships
                </h1>
            </div>

            {/* Stats Banner - Only show if has memberships */}
            {memberships.length > 0 && (
                <div className={styles.statsBanner}>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{totalProducts}</div>
                        <div className={styles.statLabel}>Total Products</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue} style={{ color: '#22c55e' }}>{activeCount}</div>
                        <div className={styles.statLabel}>Active</div>
                    </div>
                    <div className={styles.statItem}>
                        <div className={styles.statValue}>{totalProducts - activeCount}</div>
                        <div className={styles.statLabel}>Expired</div>
                    </div>
                </div>
            )}

            {memberships.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <Package size={36} strokeWidth={1.5} />
                    </div>
                    <h3 className={styles.emptyTitle}>No active memberships</h3>
                    <p className={styles.emptyText}>
                        You haven't subscribed to any products yet. Explore our marketplace to find amazing digital products.
                    </p>
                    <Link href="/" className={styles.browseBtn}>
                        <Zap size={18} />
                        Browse Marketplace
                    </Link>
                </div>
            ) : (
                <div className={styles.membershipsList}>
                    {memberships.map((membership) => (
                        <div key={membership.id} className={styles.membershipCard}>
                            <div className={styles.productIcon}>
                                {membership.productType === 'software' ? (
                                    <Download size={24} />
                                ) : membership.productType === 'course' ? (
                                    <Star size={24} />
                                ) : (
                                    <ShoppingBag size={24} />
                                )}
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productName}>{membership.productName}</h3>
                                <div className={styles.productMeta}>
                                    <span className={`${styles.statusBadge} ${membership.status === 'active' ? styles.statusActive : styles.statusExpired}`}>
                                        <span className={styles.statusDot}></span>
                                        {membership.status}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <Calendar size={14} />
                                        Next billing: {membership.nextBilling}
                                    </span>
                                </div>
                                {membership.productType === 'software' && membership.licenseKey && (
                                    <div className={styles.licenseBox}>
                                        <div className={styles.licenseLabel}>License Key</div>
                                        <code className={styles.licenseKey}>{membership.licenseKey}</code>
                                    </div>
                                )}
                            </div>
                            <div className={styles.cardActions}>
                                {membership.productType === 'software' && (
                                    <button className={styles.downloadBtn}>
                                        <Download size={16} />
                                        Download
                                    </button>
                                )}
                                <Link href={`/product/${membership.productId}`} className={styles.viewBtn}>
                                    <ExternalLink size={16} />
                                    View
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
