import Link from 'next/link';
import { db } from '../../../../lib/db';
import styles from './marketplace.module.css';
import {
    ArrowLeft,
    Package,
    Store,
    Search,
    Filter,
    Link2,
    Users,
    TrendingUp
} from 'lucide-react';

export default async function AffiliateMarketplacePage() {
    const products = await db.getAllProducts();

    return (
        <div className={styles.container}>
            <Link href="/dashboard/affiliates" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>
                    <Store size={28} />
                    Affiliate Marketplace
                </h1>
                <p className={styles.subtitle}>
                    Find high-converting products to promote and earn commissions.
                </p>
            </div>

            {/* Filter Bar */}
            <div className={styles.filterBar}>
                <div className={styles.searchBox}>
                    <Search size={18} color="#94a3b8" />
                    <input type="text" placeholder="Search products..." />
                </div>
                <button className={styles.filterBtn}>
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Products Grid */}
            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <Package size={32} />
                    </div>
                    <h3 className={styles.emptyTitle}>No products available</h3>
                    <p className={styles.emptyText}>Check back later for new products to promote.</p>
                </div>
            ) : (
                <div className={styles.productsGrid}>
                    {products.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productHeader}>
                                <div className={styles.productIcon}>
                                    <Package size={24} />
                                </div>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <span className={styles.commissionBadge}>
                                        <TrendingUp size={14} />
                                        {product.commission || 0}% Commission
                                    </span>
                                </div>
                            </div>

                            <p className={styles.productDescription}>
                                {product.description}
                            </p>

                            <div className={styles.priceBox}>
                                <span className={styles.priceLabel}>Price</span>
                                <span className={styles.priceValue}>{product.currency}{product.price}</span>
                            </div>

                            <button className={styles.referralBtn}>
                                <Link2 size={18} />
                                Get Referral Link
                            </button>

                            <div className={styles.statsBar}>
                                <div className={styles.statItem}>
                                    <Users size={14} />
                                    <span className={styles.statValue}>124</span> affiliates
                                </div>
                                <div className={styles.statItem}>
                                    <TrendingUp size={14} />
                                    <span className={styles.statValue}>4.2%</span> conversion
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
