'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CreditCard, CheckCircle2, XCircle, Clock } from 'lucide-react';
import styles from './payouts.module.css';

// Mock payout requests
const mockPayouts = [
    { id: '1', seller: 'Kofi Mensah', amount: 450, method: 'MTN MoMo', status: 'pending', date: '2024-01-15' },
    { id: '2', seller: 'Ama Osei', amount: 1200, method: 'Vodafone Cash', status: 'pending', date: '2024-01-14' },
    { id: '3', seller: 'Yaw Asante', amount: 320, method: 'Bank Transfer', status: 'completed', date: '2024-01-12' },
];

export default function AdminPayoutsPage() {
    const [payouts, setPayouts] = useState(mockPayouts);

    const handleApprove = (id: string) => {
        if (!confirm('Are you sure you want to approve this payout?')) return;
        setPayouts(prev =>
            prev.map(p => p.id === id ? { ...p, status: 'completed' } : p)
        );
        alert('Payout approved!');
    };

    const handleReject = (id: string) => {
        if (!confirm('Are you sure you want to reject this payout?')) return;
        setPayouts(prev =>
            prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p)
        );
        alert('Payout rejected!');
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <CreditCard size={28} />
                    Payout Requests
                </h1>
                <p className={styles.subtitle}>Review and process seller payout requests</p>
            </header>

            <div className={styles.payoutsList}>
                {payouts.map(payout => (
                    <div key={payout.id} className={styles.payoutCard}>
                        <div className={styles.payoutHeader}>
                            <div className={styles.payoutIcon}>
                                <CreditCard size={20} />
                            </div>
                            <div className={styles.payoutInfo}>
                                <h4>{payout.seller}</h4>
                                <span>{payout.method} • {payout.date}</span>
                            </div>
                        </div>
                        <div className={styles.payoutDetails}>
                            <div className={styles.payoutAmount}>
                                <span className={styles.amount}>GH₵{payout.amount}</span>
                                <span className={`${styles.status} ${styles[payout.status]}`}>
                                    {payout.status === 'pending' && <Clock size={12} />}
                                    {payout.status === 'completed' && <CheckCircle2 size={12} />}
                                    {payout.status === 'rejected' && <XCircle size={12} />}
                                    {payout.status}
                                </span>
                            </div>
                            {payout.status === 'pending' && (
                                <div className={styles.payoutActions}>
                                    <button
                                        className={styles.approveBtn}
                                        onClick={() => handleApprove(payout.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className={styles.rejectBtn}
                                        onClick={() => handleReject(payout.id)}
                                    >
                                        Reject
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
