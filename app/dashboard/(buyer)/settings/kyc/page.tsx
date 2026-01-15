import { db } from '@/app/lib/db';
import styles from './kyc.module.css';
import KYCForm from './KYCForm';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function KYCPage() {
    const user = await db.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/dashboard/settings" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#64748b',
                    textDecoration: 'none',
                    fontSize: '14px',
                    marginBottom: '16px',
                    fontWeight: 500
                }}>
                    <ArrowLeft size={16} /> Back to Settings
                </Link>
                <h1 className={styles.title}>Seller Verification (KYC)</h1>
                <p className={styles.description}>
                    To ensure the safety of our marketplace, all sellers must verify their identity before withdrawing funds.
                </p>
            </div>

            <KYCForm
                userId={user.id}
                currentStatus={user.kycStatus || 'unverified'}
                currentProvider={user.payoutDetails?.provider} // Re-using payoutDetails type structure for now as db uses it for kyc info too? 
                // Wait, db.ts submitVerification puts provider/number into payout_details column? 
                // Let's check db.ts again. Yes: payout_details: { provider: data.provider, number: data.number }
                currentNumber={user.payoutDetails?.number}
            />
        </div>
    );
}
