'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    Shield,
    Upload,
    CheckCircle2,
    Clock,
    AlertTriangle,
    User,
    FileText,
    Camera
} from 'lucide-react';
import styles from './kyc.module.css';

export default function SellerKYCPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'unverified' | 'pending' | 'verified' | 'rejected'>('unverified');
    const [rejectionReason] = useState<string | null>(null);
    const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
    const [idBackFile, setIdBackFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        // Simulate submission
        await new Promise(r => setTimeout(r, 1500));
        setLoading(false);
        setStatus('pending');
    }

    // Verified Status
    if (status === 'verified') {
        return (
            <div className={styles.container}>
                <Link href="/dashboard/seller/settings" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Settings
                </Link>

                <div className={styles.statusCard}>
                    <div className={styles.statusIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
                        <CheckCircle2 size={36} />
                    </div>
                    <h2>Account Verified</h2>
                    <p>Your identity is verified. You can withdraw funds and access all features.</p>
                    <div className={styles.verifiedBadge}>
                        <CheckCircle2 size={18} />
                        Verified Seller
                    </div>
                </div>
            </div>
        );
    }

    // Pending Status
    if (status === 'pending') {
        return (
            <div className={styles.container}>
                <Link href="/dashboard/seller/settings" className={styles.backLink}>
                    <ArrowLeft size={16} />
                    Back to Settings
                </Link>

                <div className={styles.statusCard}>
                    <div className={styles.statusIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                        <Clock size={36} />
                    </div>
                    <h2>Verification In Progress</h2>
                    <p>Our team is reviewing your documents. This typically takes 24-48 hours.</p>
                    <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{ width: '60%' }} />
                    </div>
                    <span className={styles.progressLabel}>Document review in progress...</span>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller/settings" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Settings
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Shield size={28} />
                    Seller Verification (KYC)
                </h1>
                <p className={styles.subtitle}>
                    Verify your identity to enable withdrawals and build trust with buyers.
                </p>
            </header>

            {/* Rejection Notice */}
            {status === 'rejected' && rejectionReason && (
                <div className={styles.rejectionCard}>
                    <AlertTriangle size={22} />
                    <div>
                        <strong>Verification Unsuccessful</strong>
                        <p>{rejectionReason}</p>
                    </div>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className={styles.formCard}>
                <div className={styles.formHeader}>
                    <Shield size={24} />
                    <div>
                        <h3>Identity Verification</h3>
                        <p>Complete all fields to verify your identity</p>
                    </div>
                </div>

                <div className={styles.formBody}>
                    {/* Personal Info */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                            <User size={18} />
                            Personal Information
                        </h4>
                        <p className={styles.sectionNote}>Must match your government-issued ID</p>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label>Legal First Name</label>
                                <input type="text" placeholder="As shown on ID" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Legal Last Name</label>
                                <input type="text" placeholder="As shown on ID" required />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.formGroup}>
                                <label>Date of Birth</label>
                                <input type="date" required />
                            </div>
                            <div className={styles.formGroup}>
                                <label>Phone Number</label>
                                <input type="tel" placeholder="024 XXX XXXX" required />
                            </div>
                        </div>

                        <div className={styles.formGroup}>
                            <label>Residential Address</label>
                            <input type="text" placeholder="Street, City, Region" required />
                        </div>
                    </div>

                    {/* ID Document */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>
                            <FileText size={18} />
                            Government-Issued ID
                        </h4>

                        <div className={styles.formGroup}>
                            <label>ID Type</label>
                            <select required>
                                <option value="">Select ID type...</option>
                                <option value="Ghana Card">Ghana Card</option>
                                <option value="Passport">International Passport</option>
                                <option value="Drivers License">Driver's License</option>
                                <option value="Voter ID">Voter's ID</option>
                            </select>
                        </div>

                        <div className={styles.formGroup}>
                            <label>ID Number</label>
                            <input type="text" placeholder="e.g. GHA-123456789-0" required />
                        </div>

                        {/* Upload Grid */}
                        <div className={styles.uploadGrid}>
                            <div className={styles.uploadBox}>
                                <input
                                    type="file"
                                    id="idFront"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setIdFrontFile(e.target.files?.[0] || null)}
                                    required
                                />
                                <label htmlFor="idFront">
                                    {idFrontFile ? <CheckCircle2 size={24} className={styles.success} /> : <Upload size={24} />}
                                    <span>{idFrontFile ? 'Uploaded' : 'ID Front'}</span>
                                    <small>Required</small>
                                </label>
                            </div>

                            <div className={styles.uploadBox}>
                                <input
                                    type="file"
                                    id="idBack"
                                    accept="image/*,.pdf"
                                    onChange={(e) => setIdBackFile(e.target.files?.[0] || null)}
                                />
                                <label htmlFor="idBack">
                                    {idBackFile ? <CheckCircle2 size={24} className={styles.success} /> : <Upload size={24} />}
                                    <span>{idBackFile ? 'Uploaded' : 'ID Back'}</span>
                                    <small>Optional</small>
                                </label>
                            </div>

                            <div className={styles.uploadBox}>
                                <input
                                    type="file"
                                    id="selfie"
                                    accept="image/*"
                                    onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
                                    required
                                />
                                <label htmlFor="selfie">
                                    {selfieFile ? <CheckCircle2 size={24} className={styles.success} /> : <Camera size={24} />}
                                    <span>{selfieFile ? 'Uploaded' : 'Selfie + ID'}</span>
                                    <small>Hold ID near face</small>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Privacy Note */}
                    <div className={styles.privacyNote}>
                        <Shield size={16} />
                        <span>Your data is encrypted and only accessible by authorized administrators.</span>
                    </div>

                    <button type="submit" disabled={loading} className={styles.submitBtn}>
                        {loading ? 'Submitting...' : 'Submit for Verification'}
                    </button>
                </div>
            </form>
        </div>
    );
}
