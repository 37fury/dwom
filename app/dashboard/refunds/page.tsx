'use client';

import { useState, useEffect } from 'react';
import { RotateCcw, Clock, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { getRefundsAction, requestRefundAction } from './actions';
import styles from './refunds.module.css';

interface RefundRequest {
    id: string;
    reason: string;
    status: string;
    amount: number;
    createdAt: string;
    orderId: string;
    productTitle: string;
}

export default function RefundsPage() {
    const [refunds, setRefunds] = useState<RefundRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadRefunds();
    }, []);

    const loadRefunds = async () => {
        const data = await getRefundsAction();
        setRefunds(data);
        setLoading(false);
    };

    const statusIcons: Record<string, any> = {
        approved: <CheckCircle2 size={16} />,
        pending: <Clock size={16} />,
        rejected: <XCircle size={16} />,
    };

    const statusColors: Record<string, string> = {
        approved: '#22c55e',
        pending: '#f59e0b',
        rejected: '#ef4444',
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard" className={styles.backLink}>
                <ArrowLeft size={18} /> Back to Dashboard
            </Link>

            <header className={styles.header}>
                <RotateCcw size={28} />
                <div>
                    <h1>Refund Requests</h1>
                    <p>Track the status of your refund requests</p>
                </div>
            </header>

            {loading ? (
                <div className={styles.empty}>
                    <p>Loading...</p>
                </div>
            ) : refunds.length === 0 ? (
                <div className={styles.empty}>
                    <RotateCcw size={48} />
                    <h3>No refund requests</h3>
                    <p>You haven&apos;t submitted any refund requests yet.</p>
                </div>
            ) : (
                <div className={styles.list}>
                    {refunds.map((refund) => (
                        <div key={refund.id} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.product}>{refund.productTitle}</span>
                                <span
                                    className={styles.status}
                                    style={{
                                        color: statusColors[refund.status],
                                        background: `${statusColors[refund.status]}15`
                                    }}
                                >
                                    {statusIcons[refund.status]}
                                    {refund.status}
                                </span>
                            </div>

                            <p className={styles.reason}>{refund.reason}</p>

                            <div className={styles.cardFooter}>
                                <span className={styles.amount}>GH₵{refund.amount.toFixed(2)}</span>
                                <span className={styles.date}>
                                    {new Date(refund.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className={styles.info}>
                <h4>Refund Policy</h4>
                <ul>
                    <li>Refund requests are reviewed within 2-3 business days</li>
                    <li>Approved refunds are processed within 24 hours</li>
                    <li>Digital products may have limited refund eligibility</li>
                </ul>
            </div>
        </div>
    );
}
