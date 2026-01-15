'use client';

import { Heart } from 'lucide-react';
import { useWishlist } from './WishlistContext';
import styles from './WishlistButton.module.css';

interface WishlistButtonProps {
    productId: string;
    size?: 'small' | 'medium' | 'large';
    showText?: boolean;
}

export default function WishlistButton({ productId, size = 'medium', showText = false }: WishlistButtonProps) {
    const { isInWishlist, toggleWishlist } = useWishlist();
    const isWishlisted = isInWishlist(productId);

    const iconSizes = {
        small: 16,
        medium: 20,
        large: 24,
    };

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(productId);
    };

    return (
        <button
            onClick={handleClick}
            className={`${styles.button} ${styles[size]} ${isWishlisted ? styles.active : ''}`}
            aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
            <Heart
                size={iconSizes[size]}
                fill={isWishlisted ? 'currentColor' : 'none'}
                className={styles.icon}
            />
            {showText && (
                <span className={styles.text}>
                    {isWishlisted ? 'Saved' : 'Save'}
                </span>
            )}
        </button>
    );
}
