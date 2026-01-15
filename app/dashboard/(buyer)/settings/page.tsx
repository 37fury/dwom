import { db } from '../../../lib/db';
import styles from './settings.module.css';
import ProfileForm from '../../../components/ProfileForm';
import PasswordForm from '../../../components/PasswordForm';
import {
    Settings,
    User,
    Shield,
    Lock,
    CheckCircle,
    Clock,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default async function SettingsPage() {
    const user = await db.getUser();
    const kycStatus = user?.kycStatus || 'unverified';

    const getStatusClass = (status: string) => {
        switch (status) {
            case 'verified': return styles.statusVerified;
            case 'pending': return styles.statusPending;
            default: return styles.statusUnverified;
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'verified': return <CheckCircle size={14} />;
            case 'pending': return <Clock size={14} />;
            default: return <AlertCircle size={14} />;
        }
    };

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>
                    <Settings size={28} />
                    Settings
                </h1>
                <p className={styles.pageSubtitle}>Manage your profile, security, and payment details.</p>
            </div>

            {/* Profile Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <div className={styles.sectionIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <User size={20} />
                        </div>
                        Profile Details
                    </h2>
                </div>
                <ProfileForm user={user} />
            </div>

            {/* Verification Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <div className={styles.sectionIcon} style={{
                            background: kycStatus === 'verified' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(249, 115, 22, 0.1)',
                            color: kycStatus === 'verified' ? '#22c55e' : '#f97316'
                        }}>
                            <Shield size={20} />
                        </div>
                        Seller Verification
                    </h2>
                    <span className={`${styles.statusBadge} ${getStatusClass(kycStatus)}`}>
                        <span className={styles.statusDot}></span>
                        {kycStatus}
                    </span>
                </div>

                <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '20px' }}>
                    {kycStatus === 'verified'
                        ? 'Your account is fully verified. You can withdraw funds and access all features.'
                        : kycStatus === 'pending'
                            ? 'Your verification is being reviewed. This usually takes 1-2 business days.'
                            : 'Verify your identity to enable withdrawals and unlock all seller features.'}
                </p>

                {kycStatus !== 'verified' && (
                    <div className={styles.verificationCard}>
                        <div className={styles.verificationContent}>
                            <div className={styles.verificationIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                                <Shield size={24} />
                            </div>
                            <div className={styles.verificationInfo}>
                                <div className={styles.verificationTitle}>
                                    {kycStatus === 'pending' ? 'Verification in Progress' : 'Complete Your Verification'}
                                </div>
                                <div className={styles.verificationText}>
                                    {kycStatus === 'pending'
                                        ? 'We\'ll notify you once the review is complete.'
                                        : 'Upload your ID and complete the verification process.'}
                                </div>
                            </div>
                            <Link href="/dashboard/settings/kyc" className={styles.verificationBtn}>
                                {kycStatus === 'pending' ? 'View Status' : 'Start Verification'}
                                <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                )}
            </div>

            {/* Password Section */}
            <div className={styles.section}>
                <div className={styles.sectionHeader}>
                    <h2 className={styles.sectionTitle}>
                        <div className={styles.sectionIcon} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
                            <Lock size={20} />
                        </div>
                        Change Password
                    </h2>
                </div>
                <PasswordForm />
            </div>
        </div>
    );
}
