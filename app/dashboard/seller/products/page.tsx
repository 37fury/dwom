import { db } from '../../../lib/db';
import Link from 'next/link';
import { ArrowLeft, Package, Plus, Edit3, Settings, Star } from 'lucide-react';
import styles from './products.module.css';

export default async function ProductsPage() {
    const user = await db.getUser();

    if (!user) {
        return <div>Please log in to manage products.</div>;
    }

    const products = await db.getSellerProducts(user.id);

    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <Package size={28} />
                        Your Products
                    </h1>
                    <p className={styles.subtitle}>Manage your listings, pricing, and digital content.</p>
                </div>
                <Link href="/dashboard/seller/products/new" className={styles.newProductBtn}>
                    <Plus size={18} />
                    New Product
                </Link>
            </header>

            {/* Stats Summary */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Products</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Package size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{products.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Published</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <Star size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{products.length}</div>
                </div>
            </div>

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <Package size={40} />
                    </div>
                    <h3 className={styles.emptyTitle}>No products yet</h3>
                    <p className={styles.emptyText}>Create your first digital product to start earning.</p>
                    <Link href="/dashboard/seller/products/new" className={styles.emptyBtn}>
                        <Plus size={18} />
                        Create Your First Product
                    </Link>
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productCover}>
                                <div className={styles.productImage}>
                                    <Package size={32} />
                                </div>
                                <span className={styles.productBadge}>
                                    {product.category || 'Digital'}
                                </span>
                            </div>
                            <div className={styles.productBody}>
                                <div className={styles.productInfo}>
                                    <h3 className={styles.productTitle}>{product.title}</h3>
                                    <div className={styles.productMeta}>
                                        <span className={styles.productPrice}>{product.currency}{product.price.toFixed(2)}</span>
                                        <span className={styles.productReviews}>
                                            <Star size={12} fill="#fbbf24" color="#fbbf24" />
                                            {product.reviews || 0} reviews
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.productActions}>
                                    <button className={styles.actionBtn}>
                                        <Edit3 size={16} />
                                        Edit
                                    </button>
                                    <button className={styles.actionBtnSecondary}>
                                        <Settings size={16} />
                                        Manage
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}


