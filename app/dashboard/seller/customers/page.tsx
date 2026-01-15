import { db } from '@/app/lib/db';
import styles from './customers.module.css';

export default async function CustomersPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const customers = await db.getCustomers(user.id);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Customers</h1>
                <p className={styles.subtitle}>People who have purchased your products</p>
            </header>

            {customers.length === 0 ? (
                <div className={styles.emptyState}>
                    <p>No customers yet. Share your products to get started!</p>
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
