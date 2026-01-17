'use client';

import { useState, useEffect } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import styles from './SocialProofPopup.module.css';

const recentPurchases = [
    { name: 'Kwesi A.', product: 'Ultimate Forex Mastery', location: 'Accra', time: '2 minutes ago' },
    { name: 'Ama K.', product: 'Afrobeats Production Pro', location: 'Kumasi', time: '5 minutes ago' },
    { name: 'Kofi M.', product: 'Digital Marketing Academy', location: 'Takoradi', time: '8 minutes ago' },
    { name: 'Yaa F.', product: 'Sports Betting Guide', location: 'Cape Coast', time: '12 minutes ago' },
    { name: 'Prince O.', product: 'E-commerce Starter Kit', location: 'Tema', time: '15 minutes ago' },
    { name: 'Akua B.', product: 'Crypto Trading Secrets', location: 'Ho', time: '18 minutes ago' },
];

export default function SocialProofPopup() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if dismissed in sessionStorage
        const dismissed = sessionStorage.getItem('socialProofDismissed');
        if (dismissed) {
            setIsDismissed(true);
            return;
        }

        // Initial delay before showing first popup
        const initialDelay = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        // Cycle through purchases
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % recentPurchases.length);
                setIsVisible(true);
            }, 500);
        }, 8000);

        return () => {
            clearTimeout(initialDelay);
            clearInterval(interval);
        };
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        sessionStorage.setItem('socialProofDismissed', 'true');
    };

    if (isDismissed || !isVisible) return null;

    const purchase = recentPurchases[currentIndex];

    return (
        <div className={styles.popup}>
            <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Dismiss">
                <X size={14} />
            </button>

            <div className={styles.icon}>
                <ShoppingBag size={20} />
            </div>

            <div className={styles.content}>
                <p className={styles.message}>
                    <strong>{purchase.name}</strong> from {purchase.location} just purchased
                </p>
                <p className={styles.product}>{purchase.product}</p>
                <p className={styles.time}>{purchase.time}</p>
            </div>
        </div>
    );
}
