'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Package, Search, Eye, Trash2, ExternalLink } from 'lucide-react';
import styles from './products.module.css';

interface Product {
    id: string;
    title: string;
    price: number;
    currency: string;
    category: string;
}

interface AdminProductsClientProps {
    products: Product[];
}

export default function AdminProductsClient({ products: initialProducts }: AdminProductsClientProps) {
    const [products, setProducts] = useState(initialProducts);
    const [deleting, setDeleting] = useState<string | null>(null);

    const handleView = (productId: string) => {
        window.open(`/product/${productId}`, '_blank');
    };

    const handleRemove = async (productId: string, productTitle: string) => {
        if (!confirm(`Are you sure you want to remove "${productTitle}" from the marketplace?`)) {
            return;
        }
        setDeleting(productId);
        try {
            // TODO: Implement actual delete API call
            setProducts(prev => prev.filter(p => p.id !== productId));
            alert('Product removed successfully');
        } catch (error) {
            alert('Failed to remove product');
        }
        setDeleting(null);
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Package size={28} />
                    Products
                </h1>
                <p className={styles.subtitle}>Moderate and manage marketplace listings</p>
            </header>

            {products.length === 0 ? (
                <div className={styles.emptyState}>
                    <Package size={40} />
                    <h3>No products yet</h3>
                    <p>Products will appear here when sellers create them.</p>
                </div>
            ) : (
                <div className={styles.productGrid}>
                    {products.map(product => (
                        <div key={product.id} className={styles.productCard}>
                            <span className={styles.categoryBadge}>
                                {product.category}
                            </span>
                            <h3 className={styles.productTitle}>{product.title}</h3>
                            <p className={styles.productPrice}>{product.currency}{product.price}</p>
                            <div className={styles.productActions}>
                                <button
                                    className={styles.viewBtn}
                                    onClick={() => handleView(product.id)}
                                >
                                    <Eye size={16} />
                                    View
                                </button>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => handleRemove(product.id, product.title)}
                                    disabled={deleting === product.id}
                                >
                                    <Trash2 size={16} />
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
