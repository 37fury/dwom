import Link from 'next/link';
import VideoPlayer from '../../components/VideoPlayer';
import ReviewList from '../../components/ReviewList';
import { db } from '../../lib/db';
import ContactSellerButton from '@/app/components/ContactSellerButton';
import ProductImage from '../../components/ProductImage';
import AffiliatePromoteButton from '@/app/components/AffiliatePromoteButton';
import FreePreview from '@/app/components/FreePreview';
import styles from './product.module.css';
import { ArrowLeft, Star, Check } from 'lucide-react';

import FadeIn from '../../components/FadeIn';

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await db.getProduct(id);
    const reviews = await db.getReviews(id);

    if (!product) {
        return <div className="container">Product not found</div>;
    }

    return (
        <main>
            <FadeIn className={styles.layout}>
                {/* Left Column: Content */}
                <div className={styles.content}>
                    {/* Back Arrow */}
                    <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#64748b', textDecoration: 'none', marginBottom: '24px', fontWeight: '500' }}>
                        <ArrowLeft size={18} /> Back to Marketplace
                    </Link>

                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            {product.videoUrl ? (
                                <VideoPlayer url={product.videoUrl} title={product.title} />
                            ) : (
                                <ProductImage
                                    src={product.image}
                                    alt={product.title}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.description}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <div className={styles.rating}>
                            <span style={{ display: 'inline-flex', gap: '2px', color: '#f59e0b' }}>
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#f59e0b" />)}
                            </span>
                            <span style={{ marginLeft: '8px' }}>{product.rating} ({reviews.length} reviews)</span>
                        </div>

                        <div className={styles.body}>
                            <p>{product.description}</p>
                            <h3>What's included</h3>
                            <ul className={styles.features}>
                                {product.features.map((feature, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        <Check size={16} color="#22c55e" /> {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <ReviewList productId={product.id} reviews={reviews} />
                    </div>
                </div>

                {/* Right Column: Checkout Card */}
                <div className={styles.sidebar}>
                    <div className={styles.purchaseCard}>
                        <div className={styles.price}>
                            {product.currency} {product.price}<span className={styles.period}>/month</span>
                        </div>

                        <Link
                            href={`/checkout/${product.id}`}
                            className={styles.btnBuy}
                            style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                        >
                            Get Access Now
                        </Link>

                        {/* Free Preview Button */}
                        <div style={{ marginTop: '12px' }}>
                            <FreePreview
                                productTitle={product.title}
                                content={product.content}
                                previewVideoUrl={product.videoUrl}
                            />
                        </div>

                        <div style={{ marginTop: '16px', marginBottom: '12px' }}>
                            <ContactSellerButton sellerId={product.sellerId} />
                        </div>

                        <AffiliatePromoteButton productId={product.id} />

                        <div className={styles.guarantee} style={{ marginTop: '24px' }}>
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
            </FadeIn>
        </main>
    );
}
