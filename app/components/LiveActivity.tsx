'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag, X } from 'lucide-react';
import styles from './LiveActivity.module.css';

const sampleActivities = [
    { name: "John from Accra", product: "Forex Mastery Course", time: "2 minutes ago" },
    { name: "Amara from Lagos", product: "Ultimate Trading Guide", time: "5 minutes ago" },
    { name: "Kwame from Kumasi", product: "Sports Betting Mastery", time: "8 minutes ago" },
    { name: "Fatima from Kano", product: "Digital Marketing Pro", time: "12 minutes ago" },
    { name: "Chidi from Enugu", product: "Music Production Master", time: "15 minutes ago" },
];

export default function LiveActivity() {
    const [currentActivity, setCurrentActivity] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if user dismissed in this session
        if (typeof window !== 'undefined' && sessionStorage.getItem('hideActivity')) {
            setIsDismissed(true);
            return;
        }

        // Show first activity after a longer delay
        const showTimeout = setTimeout(() => {
            setIsVisible(true);
            // Auto-hide after 4 seconds
            setTimeout(() => setIsVisible(false), 4000);
        }, 5000);

        // Rotate activities less frequently (every 20 seconds)
        const interval = setInterval(() => {
            if (isDismissed) return;
            setIsVisible(true);
            setTimeout(() => setIsVisible(false), 4000);
            setCurrentActivity((prev) => (prev + 1) % sampleActivities.length);
        }, 20000);

        return () => {
            clearTimeout(showTimeout);
            clearInterval(interval);
        };
    }, [isDismissed]);

    const handleDismiss = () => {
        setIsVisible(false);
        setIsDismissed(true);
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('hideActivity', 'true');
        }
    };

    if (isDismissed) return null;

    const activity = sampleActivities[currentActivity];

    return (
        <div className={`${styles.widget} ${isVisible ? styles.visible : ''}`}>
            <button
                className={styles.dismissBtn}
                onClick={handleDismiss}
                aria-label="Dismiss"
            >
                <X size={14} />
            </button>
            <div className={styles.pulse}>
                <ShoppingBag size={14} />
            </div>
            <div className={styles.content}>
                <strong>{activity.name}</strong> just purchased
                <span className={styles.product}>{activity.product}</span>
            </div>
            <span className={styles.time}>{activity.time}</span>
        </div>
    );
}

