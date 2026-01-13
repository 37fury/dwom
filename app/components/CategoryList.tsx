import Link from 'next/link';
import styles from './CategoryList.module.css';

const CATEGORIES = [
    'Forex & Crypto', 'Afrobeats', 'Tech Skills', 'Business', 'Event Tickets',
    'Fashion', 'Betting', 'Real Estate', 'Photography', 'Art'
];

export default function CategoryList() {
    return (
        <section className={styles.wrapper}>
            <div className={`container ${styles.container}`}>
                <div className={styles.scrollArea}>
                    {CATEGORIES.map((cat) => (
                        <Link key={cat} href={`/category/${cat.toLowerCase().replace(/\s+/g, '-')}`} className={styles.pill}>
                            {cat}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
