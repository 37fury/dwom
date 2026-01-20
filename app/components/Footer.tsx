'use client';

import Link from 'next/link';
import styles from './Footer.module.css';
import { useTheme } from './ThemeProvider';

export default function Footer() {
    const { theme } = useTheme();

    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div className={styles.top}>
                    <div className={styles.brand}>
                        <Link href="/" style={{ display: 'inline-block', marginBottom: '1rem' }}>
                            <span style={{ fontSize: '32px', fontWeight: 'bold', color: '#f97316', fontFamily: 'var(--font-heading)', letterSpacing: '-1px' }}>dwam</span>
                        </Link>
                        <p className={styles.tagline}>Empowering African creators.</p>
                    </div>
                    <div className={styles.links}>
                        <div className={styles.column}>
                            <h4>Discover</h4>
                            <Link href="/marketplace?category=trading">Trading</Link>
                            <Link href="/marketplace?category=sports">Sports</Link>
                            <Link href="/marketplace?category=software">Software</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>Sell</h4>
                            <Link href="/dashboard">Start Selling</Link>
                            <Link href="/">Features</Link>
                            <Link href="/dashboard/affiliate">Affiliates</Link>
                        </div>
                        <div className={styles.column}>
                            <h4>Support</h4>
                            <Link href="mailto:dwam.store@gmail.com">Contact Us</Link>
                            <Link href="/terms">Terms</Link>
                            <Link href="/privacy">Privacy</Link>
                        </div>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <p>&copy; 2025 dwam Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
