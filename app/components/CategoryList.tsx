'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import styles from './CategoryList.module.css';

const CATEGORIES = [
    'All', 'Forex & Crypto', 'Afrobeats', 'Tech Skills', 'Business', 'Event Tickets',
    'Fashion', 'Betting', 'Real Estate', 'Photography', 'Art'
];

export default function CategoryList() {
    const searchParams = useSearchParams();
    const currentCategory = searchParams.get('category') || 'All';

    return (
        <section className={styles.wrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.scrollArea}>
                    {CATEGORIES.map((cat) => {
                        const isActive = currentCategory === cat;
                        // Build URL: keep search query if exists, update category
                        const params = new URLSearchParams(searchParams.toString());
                        if (cat === 'All') params.delete('category');
                        else params.set('category', cat);

                        return (
                            <Link
                                key={cat}
                                href={`/?${params.toString()}`}
                                className={`${styles.pill} ${isActive ? styles.active : ''}`}
                                style={isActive ? { background: '#ff5f00', color: 'white', borderColor: '#ff5f00' } : {}}
                            >
                                {cat}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
