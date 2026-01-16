import Link from 'next/link';
import { ArrowLeft, Package, Plus } from 'lucide-react';
import ProductForm from './ProductForm';
import styles from './new-product.module.css';

export default function NewProductPage() {
    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller/products" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Products
            </Link>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <Plus size={28} />
                        Create New Product
                    </h1>
                    <p className={styles.subtitle}>Add a new digital product to your store.</p>
                </div>
            </header>

            {/* Form */}
            <ProductForm />
        </div>
    );
}
