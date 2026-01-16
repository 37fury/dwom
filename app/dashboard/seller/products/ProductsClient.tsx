'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Package, Plus, Edit3, Settings, Star, Trash2 } from 'lucide-react';
import styles from './products.module.css';

interface Product {
    id: string;
    title: string;
    price: number;
    currency: string;
    category: string;
    reviews: number;
}

interface ProductsClientProps {
    products: Product[];
}

export default function ProductsClient({ products: initialProducts }: ProductsClientProps) {
    const [products, setProducts] = useState(initialProducts);
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleDelete = async (productId: string, productTitle: string) => {
        if (!confirm(`Are you sure you want to delete "${productTitle}"? This action cannot be undone.`)) {
            return;
        }
        setDeleting(productId);
        try {
            // TODO: Implement actual delete API call
            setProducts(prev => prev.filter(p => p.id !== productId));
            alert('Product deleted successfully');
        } catch (error) {
            alert('Failed to delete product');
        }
        setDeleting(null);
    };

    if (products.length === 0) {
        return (
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
        );
    }

    return (
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
                            <button
                                className={styles.deleteBtn}
                                onClick={() => handleDelete(product.id, product.title)}
                                disabled={deleting === product.id}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
