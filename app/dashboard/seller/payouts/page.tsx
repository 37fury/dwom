import { db } from '@/app/lib/db';
import styles from './payouts.module.css';
import PayoutRequestForm from './PayoutForm';

export default async function PayoutsPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const history = await db.getPayoutHistory();

    return (
        <div className={styles.container}>
            <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '24px', color: '#0f172a' }}>Payouts</h1>

            <div className={styles.balanceCard}>
                <div>
                    <div className={styles.balanceLabel}>Available Balance</div>
                    <div className={styles.balanceAmount}>GH₵{user.balance.toFixed(2)}</div>
                </div>
            </div>

            <PayoutRequestForm balance={user.balance} payoutDetails={user.payoutDetails} />

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Transaction History</h3>
                {history.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                        No transactions yet.
                    </div>
                ) : (
                    <div className={styles.historyList}>
                        {history.map((tx) => (
                            <div key={tx.id} className={styles.historyItem}>
                                <div className={styles.itemLeft}>
                                    <span className={styles.itemMethod}>{tx.method}</span>
                                    <span className={styles.itemDate}>{tx.date}</span>
                                </div>
                                <div className={styles.itemRight}>
                                    <div className={styles.itemAmount}>GH₵{tx.amount.toFixed(2)}</div>
                                    <span className={`${styles.itemStatus} ${styles[`status-${tx.status.toLowerCase()}`]}`}>
                                        {tx.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
