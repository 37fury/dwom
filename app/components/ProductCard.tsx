'use client';

import Link from 'next/link';
import styles from './ProductCard.module.css';
import { Product } from '../lib/db';
import ProductImage from './ProductImage';
import { Users, Star } from 'lucide-react';
import WishlistButton from './WishlistButton';

// Known demo product titles - these show DEMO badge
const DEMO_PRODUCT_TITLES = [
    'Ultimate Forex Mastery Course',
    'Accra Tech Community Access',
    'AfroBeats Production Masterclass',
    'Ghana Stock Market Guide 2024',
    'VS Code Pro Setup'
];

export default function ProductCard({ product }: { product: Product }) {
    // Deterministic member count based on reviews (avoids hydration mismatch)
    const memberCount = (product.reviews || 0) * 3 + 50;

    // Check if product is a demo - by title or isDemo flag
    const isDemo = (product as any).isDemo || DEMO_PRODUCT_TITLES.includes(product.title);

    return (
        <div className={styles.cardWrapper}>
            <Link href={`/product/${product.id}`} className={styles.card}>
                <div className={styles.imageWrapper}>
                    <ProductImage
                        src={product.image}
                        alt={product.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    {/* DEMO Badge */}
                    {isDemo && (
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '10px',
                            background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                            color: 'white',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            letterSpacing: '0.5px',
                            boxShadow: '0 2px 8px rgba(139, 92, 246, 0.4)'
                        }}>
                            DEMO
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{product.title}</h3>
                        <span className={styles.price}>{product.currency}{product.price}</span>
                    </div>
                    <p className={styles.category}>{product.category}</p>

                    {/* Social Proof Stats */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '8px', fontSize: '13px', color: '#64748b' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Users size={14} style={{ color: '#f97316' }} />
                            {memberCount}+ members
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontWeight: '600' }}>
                            <Star size={14} fill="currentColor" />
                            {product.rating}
                        </span>
                    </div>
                </div>
            </Link>
            {/* Wishlist Button - Outside the link for independent click handling */}
            <div className={styles.wishlistBtn}>
                <WishlistButton productId={product.id} size="small" />
            </div>
        </div>
    );
}

