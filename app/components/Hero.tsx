import Link from 'next/link';
import styles from './Hero.module.css';
import SearchBar from './SearchBar';
import { Users, Zap, Shield, TrendingUp } from 'lucide-react';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={`container ${styles.content}`}>
                <h1 className={styles.title}>
                    <span>Turn your digital hustle</span>
                    <br />
                    <span className="text-gradient">into a global business</span>
                </h1>
                <p className={styles.subtitle}>
                    The #1 platform for African creators to sell courses, communities, and software. Get paid instantly in Cedis, Naira, or Crypto.
                </p>
                <SearchBar />
                <div className={styles.actions}>
                    <Link href="/#marketplace" className="btn btn-primary">Explore Marketplace</Link>
                    <Link href="/sell" className="btn btn-secondary">Start Selling</Link>
                </div>

                {/* Trust Indicators */}
                <div className={styles.trustBadges}>
                    <div className={styles.trustItem}>
                        <Shield size={16} className={styles.trustIcon} />
                        Secure Payments
                    </div>
                    <div className={styles.trustItem}>
                        <Zap size={16} className={styles.trustIcon} />
                        Instant Access
                    </div>
                    <div className={styles.trustItem}>
                        <Users size={16} className={styles.trustIcon} />
                        50K+ Creators
                    </div>
                </div>

                {/* Floating Stats */}
                <div className={styles.statsWrapper}>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <TrendingUp size={20} />
                        </div>
                        <div className={styles.statInfo}>
                            <h4>GHS 2M+</h4>
                            <p>Paid to creators</p>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <div className={styles.statIcon}>
                            <Users size={20} />
                        </div>
                        <div className={styles.statInfo}>
                            <h4>100K+</h4>
                            <p>Happy buyers</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
