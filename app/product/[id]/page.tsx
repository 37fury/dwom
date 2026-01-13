import PurchaseButton from '../../components/PurchaseButton';
import { db } from '../../lib/db';
import styles from './product.module.css';

export default async function ProductPage({ params }: { params: { id: string } }) {
    const product = await db.getProduct(params.id);

    if (!product) {
        return <div className="container">Product not found</div>;
    }

    return (
        <main className={styles.container}>
            {/* Left Column: Content */}
            <div className={styles.content}>
                <div className={styles.gallery}>
                    <div className={styles.mainImage}>
                        {/* Placeholder for Product Image */}
                        <div className={styles.imagePlaceholder}>{product.title[0]}</div>
                    </div>
                </div>

                <div className={styles.description}>
                    <h1 className={styles.title}>{product.title}</h1>
                    <div className={styles.rating}>
                        ★★★★★ <span>{product.rating} ({product.reviews} reviews)</span>
                    </div>

                    <div className={styles.body}>
                        <p>{product.description}</p>
                        <h3>What's included</h3>
                        <ul className={styles.features}>
                            {product.features.map((feature, i) => (
                                <li key={i}>✓ {feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Right Column: Checkout Card */}
            <div className={styles.sidebar}>
                <div className={styles.purchaseCard}>
                    <div className={styles.price}>
                        {product.currency} {product.price}<span className={styles.period}>/month</span>
                    </div>

                    <PurchaseButton />

                    <div className={styles.guarantee}>
                        Authorized by dwom • Cancel anytime
                    </div>

                    <hr className={styles.divider} />

                    <div className={styles.meta}>
                        <div className={styles.metaItem}>
                            <span>Access</span>
                            <strong>Instant</strong>
                        </div>
                        <div className={styles.metaItem}>
                            <span>Format</span>
                            <strong>Community + Course</strong>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
