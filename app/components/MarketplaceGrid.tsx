import ProductCard from './ProductCard';
import styles from './MarketplaceGrid.module.css';
import { Product } from '../lib/db';

type Props = {
    products: Product[];
};

export default function MarketplaceGrid({ products }: Props) {
    if (!products || products.length === 0) {
        return (
            <section id="marketplace" className={styles.gridSection}>
                <div className="container">
                    <h2 className={styles.heading}>Trending in Africa</h2>
                    <p style={{ textAlign: 'center', color: '#64748b', padding: '48px' }}>
                        No products found yet. Be the first to sell!
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section id="marketplace" className={styles.gridSection}>
            <div className="container">
                <h2 className={styles.heading}>Trending in Africa</h2>
                <div className={styles.grid}>
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
