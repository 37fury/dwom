import Image from 'next/image';
import Link from 'next/link';
import styles from './ProductCard.module.css';

interface ProductProps {
    id: string;
    title: string;
    category: string;
    price: string;
    rating: number;
    imageUrl: string;
}

export default function ProductCard({ product }: { product: ProductProps }) {
    return (
        <Link href={`/product/${product.id}`} className={styles.card}>
            <div className={styles.imageWrapper}>
                <div className={styles.placeholderImage} style={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
                    {/* Using a gradient placeholder instead of external image for reliability */}
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <span className={styles.price}>{product.price}</span>
                </div>
                <p className={styles.category}>{product.category}</p>
                <div className={styles.rating}>
                    {'★'.repeat(Math.round(product.rating))} <span className={styles.ratingNum}>({product.rating})</span>
                </div>
            </div>
        </Link>
    );
}
