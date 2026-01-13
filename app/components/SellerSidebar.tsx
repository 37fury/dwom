'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './SellerSidebar.module.css';

export default function SellerSidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.logo}>
                dwom <span style={{ fontSize: '12px', fontWeight: 'normal', opacity: 0.7 }}>seller</span>
            </Link>

            <nav className={styles.nav}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Business</h4>
                    <Link href="/dashboard/seller" className={`${styles.link} ${pathname === '/dashboard/seller' ? styles.active : ''}`}>
                        Overview
                    </Link>
                    <Link href="/dashboard/seller/products" className={`${styles.link} ${pathname.startsWith('/dashboard/seller/products') ? styles.active : ''}`}>
                        Products
                    </Link>
                    <Link href="/dashboard/seller/payouts" className={`${styles.link} ${pathname === '/dashboard/seller/payouts' ? styles.active : ''}`}>
                        Payouts
                    </Link>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Account</h4>
                    <Link href="/dashboard" className={styles.link}>
                        Switch to Buying
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
