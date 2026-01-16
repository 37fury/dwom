import { db } from '@/app/lib/db';
import styles from './kyc.module.css';
import KYCForm from './KYCForm';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Shield, CheckCircle2 } from 'lucide-react';

export default async function KYCPage() {
    const user = await db.getUser();

    if (!user) {
        redirect('/login');
    }

    const isVerified = user.kycStatus === 'verified';

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/dashboard/settings" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '14px',
                    marginBottom: '24px',
                    fontWeight: 500
                }}>
                    <ArrowLeft size={16} /> Back to Settings
                </Link>
                <h1 className={styles.title}>
                    <Shield size={28} />
                    Seller Verification (KYC)
                </h1>
                <p className={styles.description}>
                    {isVerified
                        ? 'Your identity has been verified successfully.'
                        : 'To ensure the safety of our marketplace, all sellers must verify their identity before withdrawing funds. Your personal information is kept secure and only accessible by authorized administrators.'
                    }
                </p>
            </div>

            <KYCForm
                userId={user.id}
                currentStatus={user.kycStatus || 'unverified'}
                currentProvider={user.payoutDetails?.provider}
                currentNumber={user.payoutDetails?.number}
                rejectionReason={user.kycRejectionReason}
            />
        </div>
    );
}
