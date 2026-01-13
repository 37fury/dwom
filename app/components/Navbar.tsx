'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo}>
                        dwom
                    </Link>
                    <div className={styles.links}>
                        <Link href="/discover" className={pathname === '/discover' ? styles.active : ''}>Discover</Link>
                        <Link href="/sell" className={pathname === '/sell' ? styles.active : ''}>Sell</Link>
                        <Link href="/pricing">Pricing</Link>
                    </div>
                </div>
                <div className={styles.right}>
                    <button className={styles.loginBtn}>On dashboard</button>
                </div>
            </div>
        </nav>
    );
}
