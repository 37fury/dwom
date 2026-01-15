import Link from 'next/link';
import styles from './manage.module.css';
import { ArrowLeft } from 'lucide-react';

export default function SellerLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className={styles.layout}>
            {/* Dark Sidebar */}
            <aside className={styles.sidebar}>
                <Link href="/" className={styles.logo}>dwom <span className={styles.badge}>Seller</span></Link>

                <nav className={styles.nav}>
                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Business</span>
                        <Link href="/manage" className={styles.link}>Overview</Link>
                        <Link href="/manage/products/new" className={styles.link}>Products</Link>
                        <Link href="/manage" className={styles.link}>Payouts</Link>
                    </div>

                    <div className={styles.section}>
                        <span className={styles.sectionTitle}>Switch</span>
                        <Link href="/dashboard" className={styles.linkBack} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <ArrowLeft size={16} /> Back to Buyer
                        </Link>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className={styles.main}>
                <header className={styles.header}>
                    <div className={styles.breadcrumbs}>Dashboard / Overview</div>
                    <div className={styles.user}>
                        <div className={styles.avatar}>D</div>
                    </div>
                </header>
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}
