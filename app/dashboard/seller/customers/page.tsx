import { db } from '@/app/lib/db';
import Link from 'next/link';
import { ArrowLeft, Users, UserCheck, ShoppingBag, TrendingUp } from 'lucide-react';
import styles from './customers.module.css';

export default async function CustomersPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const customers = await db.getCustomers(user.id);
    const totalSpent = customers.reduce((sum, c) => sum + c.totalSpent, 0);

    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <Users size={28} />
                        Customers
                    </h1>
                    <p className={styles.subtitle}>People who have purchased your products.</p>
                </div>
            </header>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Customers</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <UserCheck size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{customers.length}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Orders</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <ShoppingBag size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{customers.reduce((sum, c) => sum + c.productsPurchased, 0)}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Revenue</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                            <TrendingUp size={18} />
                        </div>
                    </div>
                    <div className={`${styles.statValue} ${styles.statValueOrange}`}>GH₵{totalSpent.toFixed(0)}</div>
                </div>
            </div>

            {customers.length === 0 ? (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}>
                        <Users size={40} />
                    </div>
                    <h3 className={styles.emptyTitle}>No customers yet</h3>
                    <p className={styles.emptyText}>Share your products to get started!</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Joined</th>
                                <th>Orders</th>
                                <th>Total Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>
                                        <div className={styles.userCell}>
                                            <div className={styles.avatar}>
                                                {customer.avatarUrl ? (
                                                    <img src={customer.avatarUrl} alt={customer.name} />
                                                ) : (
                                                    <span>{customer.name.charAt(0)}</span>
                                                )}
                                            </div>
                                            <span className={styles.name}>{customer.name}</span>
                                        </div>
                                    </td>
                                    <td>{customer.email}</td>
                                    <td>{customer.joinedDate}</td>
                                    <td>{customer.productsPurchased}</td>
                                    <td className={styles.amount}>GH₵{customer.totalSpent.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

