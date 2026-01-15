'use client';

import { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
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

    useEffect(() => {
        // Show first activity after a delay
        const showTimeout = setTimeout(() => {
            setIsVisible(true);
        }, 3000);

        // Rotate activities
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrentActivity((prev) => (prev + 1) % sampleActivities.length);
                setIsVisible(true);
            }, 500);
        }, 8000);

        return () => {
            clearTimeout(showTimeout);
            clearInterval(interval);
        };
    }, []);

    const activity = sampleActivities[currentActivity];

    return (
        <div className={`${styles.widget} ${isVisible ? styles.visible : ''}`}>
            <div className={styles.pulse}>
                <ShoppingBag size={16} />
            </div>
            <div className={styles.content}>
                <strong>{activity.name}</strong> just purchased
                <span className={styles.product}>{activity.product}</span>
            </div>
            <span className={styles.time}>{activity.time}</span>
        </div>
    );
}
