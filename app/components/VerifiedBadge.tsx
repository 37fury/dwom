'use client';

import { BadgeCheck } from 'lucide-react';
import styles from './VerifiedBadge.module.css';

interface VerifiedBadgeProps {
    size?: 'small' | 'medium' | 'large';
    showText?: boolean;
}

export default function VerifiedBadge({ size = 'medium', showText = false }: VerifiedBadgeProps) {
    const sizes = {
        small: 14,
        medium: 18,
        large: 22,
    };

    return (
        <span className={`${styles.badge} ${styles[size]}`} title="Verified Seller">
            <BadgeCheck size={sizes[size]} />
            {showText && <span className={styles.text}>Verified</span>}
        </span>
    );
}
