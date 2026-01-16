import { db } from '../../../lib/db';
import Link from 'next/link';
import { ArrowLeft, Package, Plus, Star } from 'lucide-react';
import styles from './products.module.css';
import ProductsClient from './ProductsClient';

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

            <ProductsClient products={products} />
        </div>
    );
}
