import Link from 'next/link';
import styles from './wallet.module.css';
import { db } from '../../../lib/db';
import TopUpButton from './TopUpButton';
import WithdrawButton from './WithdrawButton';
import {
    ArrowLeft,
    Wallet,
    ArrowDownLeft,
    ArrowUpRight,
    TrendingUp,
    TrendingDown,
    Clock,
    History,
    Receipt,
    Calendar
} from 'lucide-react';

export default async function WalletPage() {
    const user = await db.getUser();
    const transactions = user ? await db.getWalletTransactions(user.id) : [];

    // Calculate stats
    const totalIn = transactions
        .filter(tx => tx.type === 'credit')
        .reduce((sum, tx) => sum + tx.amount, 0);
    const totalOut = transactions
        .filter(tx => tx.type === 'debit')
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);
    const txCount = transactions.length;

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.header}>
                <Link href="/dashboard" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Dashboard
                </Link>
                <h1 className={styles.pageTitle}>
                    <Wallet size={28} />
                    My Wallet
                </h1>
            </div>

            {/* Premium Wallet Card */}
            <div className={styles.walletCard}>
                <div className={styles.walletGlow}></div>
                <div className={styles.walletPattern}></div>
                <div className={styles.walletContent}>
                    <div className={styles.walletTop}>
                        <div className={styles.walletIcon}>
                            <Wallet size={28} />
                        </div>
                        <div className={styles.walletStatus}>
                            <span className={styles.statusDot}></span>
                            Active
                        </div>
                    </div>

                    <div className={styles.balanceSection}>
                        <span className={styles.balanceLabel}>Available Balance</span>
                        <div className={styles.balanceRow}>
                            <span className={styles.balanceCurrency}>GH₵</span>
                            <span className={styles.balanceValue}>{user?.balance.toFixed(2) || '0.00'}</span>
                        </div>
                    </div>

                    <div className={styles.walletActions}>
                        <WithdrawButton balance={user?.balance || 0} />
                        <TopUpButton />
                    </div>
                </div>
            </div>

            {/* Quick Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <TrendingUp size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statLabel}>Total Received</div>
                        <div className={styles.statValue}>GH₵ {totalIn.toFixed(2)}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444' }}>
                        <TrendingDown size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statLabel}>Total Spent</div>
                        <div className={styles.statValue}>GH₵ {totalOut.toFixed(2)}</div>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <Receipt size={24} />
                    </div>
                    <div className={styles.statContent}>
                        <div className={styles.statLabel}>Transactions</div>
                        <div className={styles.statValue}>{txCount}</div>
                    </div>
                </div>
            </div>

            {/* Transaction History */}
            <div className={styles.transactionsSection}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <History size={20} />
                        Transaction History
                    </h2>
                    <div className={styles.filterTabs}>
                        <button className={`${styles.filterTab} ${styles.active}`}>All</button>
                        <button className={styles.filterTab}>Received</button>
                        <button className={styles.filterTab}>Sent</button>
                    </div>
                </div>

                <div className={styles.transactionsList}>
                    {transactions.length > 0 ? (
                        transactions.map((tx) => {
                            const isCredit = tx.type === 'credit';
                            return (
                                <div key={tx.id} className={styles.transactionItem}>
                                    <div className={`${styles.txIcon} ${isCredit ? styles.txIconCredit : styles.txIconDebit}`}>
                                        {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                                    </div>
                                    <div className={styles.txDetails}>
                                        <div className={styles.txDescription}>{tx.description}</div>
                                        <div className={styles.txMeta}>
                                            <span className={styles.txDate}>
                                                <Calendar size={12} />
                                                {tx.date}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={`${styles.txAmount} ${isCredit ? styles.txAmountCredit : styles.txAmountDebit}`}>
                                        {isCredit ? '+' : '-'}GH₵ {Math.abs(tx.amount).toFixed(2)}
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <Clock size={28} />
                            </div>
                            <div className={styles.emptyTitle}>No transactions yet</div>
                            <p className={styles.emptyText}>
                                Your transaction history will appear here once you make your first transaction.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
