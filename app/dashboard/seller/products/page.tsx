import { db } from '../../../lib/db';
import Link from 'next/link';
import styles from './products.module.css';

export default async function ProductsPage() {
    const user = await db.getUser();

    if (!user) {
        return <div>Please log in to manage products.</div>;
    }

    const products = await db.getSellerProducts(user.id);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>Your Products</h1>
                    <p className={styles.subtitle}>Manage your listings and content.</p>
                </div>
                <Link href="/dashboard/seller/products/new" className={styles.newProductBtn}>
                    + New Product
                </Link>
            </header>

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <h3 className={styles.emptyTitle}>No products yet</h3>
                    <p className={styles.emptyText}>Create your first digital product to start selling.</p>
                    <Link href="/dashboard/seller/products/new" className={styles.emptyLink}>Create Product &rarr;</Link>
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productCard}>
                            <div className={styles.productImage}>
                                <span>📦</span>
                            </div>
                            <div className={styles.productInfo}>
                                <h3 className={styles.productTitle}>{product.title}</h3>
                                <div className={styles.productMeta}>{product.currency}{product.price.toFixed(2)} • {product.reviews} reviews</div>
                            </div>
                            <div className={styles.productActions}>
                                <button className={styles.actionBtn}>Edit</button>
                                <button className={styles.actionBtn}>Manage Content</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

