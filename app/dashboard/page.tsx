import Link from 'next/link';
import { db } from '../lib/db';
import styles from './page.module.css';

export default async function DashboardPage() {
    const user = await db.getUser();

    return (
        <div className={styles.container}>
            {/* Wallet Card */}
            <div className={styles.walletCard}>
                <div className={styles.walletHeader}>
                    <span className={styles.walletLabel}>Total Balance</span>
                    <span className={styles.currency}>GH₵</span>
                </div>
                <div className={styles.balance}>{user.balance.toFixed(2)}</div>
                <div className={styles.actions}>
                    <button className={styles.btnPrimary}>Withdraw</button>
                    <button className={styles.btnSecondary}>Top Up</button>
                </div>
            </div>

            {/* Active Memberships */}
            <h2 className={styles.sectionTitle}>Your Memberships</h2>
            <div className={styles.grid}>
                {user.memberships.map((membership) => (
                    <div key={membership.id} className={styles.card}>
                        <div className={styles.cardHeader}>
                            <div className={styles.statusBadge}>{membership.status}</div>
                        </div>
                        <h3 className={styles.productTitle}>{membership.productName}</h3>
                        <div className={styles.billingInfo}>Renews on {membership.nextBilling}</div>
                        <div className={styles.cardActions}>
                            <button className={styles.btnAccess}>Access Content</button>
                            <button className={styles.btnSettings}>Manage</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
