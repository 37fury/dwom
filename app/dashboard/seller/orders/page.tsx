import { db } from '@/app/lib/db';
import Link from 'next/link';
import { ArrowLeft, Package, Download, Clock, CheckCircle2, XCircle, Eye } from 'lucide-react';
import styles from './orders.module.css';

export default async function OrdersPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const orders = await db.getSellerOrders();

    const statusIcons: Record<string, any> = {
        completed: <CheckCircle2 size={16} />,
        pending: <Clock size={16} />,
        refunded: <XCircle size={16} />,
    };

    const statusColors: Record<string, string> = {
        completed: '#22c55e',
        pending: '#f59e0b',
        refunded: '#ef4444',
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <header className={styles.header}>
                <div>
                    <h1><Package size={28} /> Orders</h1>
                    <p>Track and manage all your customer orders</p>
                </div>
                <div className={styles.stats}>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>{orders.length}</span>
                        <span className={styles.statLabel}>Total Orders</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statValue}>
                            {orders.filter(o => o.status === 'completed').length}
                        </span>
                        <span className={styles.statLabel}>Completed</span>
                    </div>
                </div>
            </header>

            {orders.length === 0 ? (
                <div className={styles.empty}>
                    <Package size={64} />
                    <h3>No orders yet</h3>
                    <p>When customers purchase your products, orders will appear here.</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th>Amount</th>
                                <th>Status</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order: any) => (
                                <tr key={order.id}>
                                    <td className={styles.orderId}>
                                        #{order.id.substring(0, 8)}
                                    </td>
                                    <td className={styles.product}>
                                        {order.productTitle || 'Unknown Product'}
                                    </td>
                                    <td className={styles.customer}>
                                        {order.customerName || order.customerEmail || 'Customer'}
                                    </td>
                                    <td className={styles.amount}>
                                        GH₵{Number(order.amount).toFixed(2)}
                                    </td>
                                    <td>
                                        <span
                                            className={styles.status}
                                            style={{
                                                color: statusColors[order.status] || '#64748b',
                                                background: `${statusColors[order.status] || '#64748b'}15`
                                            }}
                                        >
                                            {statusIcons[order.status]}
                                            {order.status}
                                        </span>
                                    </td>
                                    <td className={styles.date}>
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                    <td className={styles.actions}>
                                        <Link
                                            href={`/dashboard/seller/orders/${order.id}`}
                                            className={styles.actionBtn}
                                            title="View Details"
                                        >
                                            <Eye size={16} />
                                        </Link>
                                        <Link
                                            href={`/api/invoice/${order.id}`}
                                            className={styles.actionBtn}
                                            title="Download Invoice"
                                            target="_blank"
                                        >
                                            <Download size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
