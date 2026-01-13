'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Sidebar.module.css';

export default function Sidebar() {
    const pathname = usePathname();

    return (
        <aside className={styles.sidebar}>
            <Link href="/" className={styles.logo}>
                dwom
            </Link>

            <nav className={styles.nav}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Main</h4>
                    <Link href="/dashboard" className={`${styles.link} ${pathname === '/dashboard' ? styles.active : ''}`}>
                        Overview
                    </Link>
                    <Link href="/dashboard/wallet" className={`${styles.link} ${pathname === '/dashboard/wallet' ? styles.active : ''}`}>
                        Wallet (GH₵)
                    </Link>
                    <Link href="/dashboard/memberships" className={`${styles.link} ${pathname === '/dashboard/memberships' ? styles.active : ''}`}>
                        Memberships
                    </Link>
                    <Link href="/dashboard/integrations" className={`${styles.link} ${pathname === '/dashboard/integrations' ? styles.active : ''}`}>
                        Integrations
                    </Link>
                    <Link href="/dashboard/affiliates" className={`${styles.link} ${pathname === '/dashboard/affiliates' ? styles.active : ''}`}>
                        Affiliates
                    </Link>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Selling</h4>
                    <Link href="/dashboard/seller" className={styles.link}>
                        Switch to Seller
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
