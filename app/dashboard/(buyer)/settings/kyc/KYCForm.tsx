'use client';

import { useState } from 'react';
import { submitVerificationAction } from '../actions';
import styles from './kyc.module.css';
import { useRouter } from 'next/navigation';
import {
    Shield,
    Upload,
    CheckCircle2,
    Clock,
    AlertTriangle,
    FileText,
    Camera,
    User,
    Calendar,
    MapPin,
    Phone
} from 'lucide-react';

interface KYCFormProps {
    userId: string;
    currentStatus: string;
    currentProvider?: string;
    currentNumber?: string;
    rejectionReason?: string;
}

export default function KYCForm({ userId, currentStatus, currentProvider, currentNumber, rejectionReason }: KYCFormProps) {
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [idFrontFile, setIdFrontFile] = useState<File | null>(null);
    const [idBackFile, setIdBackFile] = useState<File | null>(null);
    const [selfieFile, setSelfieFile] = useState<File | null>(null);
    const router = useRouter();

    const isPending = currentStatus === 'pending';
    const isVerified = currentStatus === 'verified';
    const isRejected = currentStatus === 'rejected';

    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setMessage(null);

        try {
            const success = await submitVerificationAction(userId, formData);
            if (success) {
                setMessage({ type: 'success', text: 'Verification submitted successfully! Our team will review it within 24-48 hours.' });
                router.refresh();
            } else {
                setMessage({ type: 'error', text: 'Failed to submit verification. Please try again.' });
            }
        } catch (e: any) {
            setMessage({ type: 'error', text: e.message || 'An unexpected error occurred.' });
        }
        setLoading(false);
    }

    // Verified Status
    if (isVerified) {
        return (
            <div className={styles.statusCard}>
                <div className={styles.statusIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <CheckCircle2 size={32} />
                </div>
                <h3 className={styles.statusTitle}>Account Verified</h3>
                <p className={styles.statusText}>
                    Your identity has been verified. You can now access all seller features and withdraw funds.
                </p>
                <div className={styles.verifiedBadge}>
                    <CheckCircle2 size={18} />
                    Verified Seller
                </div>
            </div>
        );
    }

    // Pending Status
    if (isPending) {
        return (
            <div className={styles.statusCard}>
                <div className={styles.statusIcon} style={{ background: '#fef3c7', color: '#f59e0b' }}>
                    <Clock size={32} />
                </div>
                <h3 className={styles.statusTitle}>Verification In Progress</h3>
                <p className={styles.statusText}>
                    Your documents are being reviewed by our team. This typically takes 24-48 hours.
                </p>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: '60%' }} />
                </div>
                <p className={styles.progressLabel}>Document review in progress...</p>
            </div>
        );
    }

    // Rejected Status
    if (isRejected) {
        return (
            <div className={styles.container}>
                {/* Rejection Notice */}
                <div className={styles.rejectionCard}>
                    <div className={styles.rejectionIcon}>
                        <AlertTriangle size={24} />
                    </div>
                    <div className={styles.rejectionContent}>
                        <h4>Verification Unsuccessful</h4>
                        <p>We couldn't verify your identity. Please review the reason below and resubmit.</p>
                        {rejectionReason && (
                            <div className={styles.rejectionReason}>
                                <strong>Reason:</strong> {rejectionReason}
                            </div>
                        )}
                    </div>
                </div>

                {/* Resubmit Form */}
                <VerificationForm
                    loading={loading}
                    message={message}
                    handleSubmit={handleSubmit}
                    idFrontFile={idFrontFile}
                    setIdFrontFile={setIdFrontFile}
                    idBackFile={idBackFile}
                    setIdBackFile={setIdBackFile}
                    selfieFile={selfieFile}
                    setSelfieFile={setSelfieFile}
                />
            </div>
        );
    }

    // Unverified - Show Form
    return (
        <VerificationForm
            loading={loading}
            message={message}
            handleSubmit={handleSubmit}
            idFrontFile={idFrontFile}
            setIdFrontFile={setIdFrontFile}
            idBackFile={idBackFile}
            setIdBackFile={setIdBackFile}
            selfieFile={selfieFile}
            setSelfieFile={setSelfieFile}
        />
    );
}

// Verification Form Component
function VerificationForm({
    loading,
    message,
    handleSubmit,
    idFrontFile,
    setIdFrontFile,
    idBackFile,
    setIdBackFile,
    selfieFile,
    setSelfieFile
}: any) {
    return (
        <div className={styles.formCard}>
            <div className={styles.formHeader}>
                <div className={styles.formIcon}>
                    <Shield size={24} />
                </div>
                <div>
                    <h3>Identity Verification</h3>
                    <p>Complete all fields to verify your identity</p>
                </div>
            </div>

            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
                    {message.text}
                </div>
            )}

            <form action={handleSubmit} className={styles.form}>
                {/* Personal Information Section */}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                        <User size={18} />
                        Personal Information
                    </h4>
                    <p className={styles.sectionNote}>This must match your government-issued ID</p>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Legal First Name</label>
                            <input type="text" name="firstName" className={styles.input} placeholder="As shown on ID" required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Legal Last Name</label>
                            <input type="text" name="lastName" className={styles.input} placeholder="As shown on ID" required />
                        </div>
                    </div>

                    <div className={styles.row}>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Date of Birth</label>
                            <input type="date" name="dateOfBirth" className={styles.input} required />
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Phone Number</label>
                            <input type="tel" name="phone" className={styles.input} placeholder="024 XXX XXXX" required />
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Residential Address</label>
                        <input type="text" name="address" className={styles.input} placeholder="Street address, city, region" required />
                    </div>
                </div>

                {/* ID Document Section */}
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>
                        <FileText size={18} />
                        Government-Issued ID
                    </h4>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>ID Type</label>
                        <select name="provider" className={styles.select} required>
                            <option value="">Select ID type...</option>
                            <option value="Ghana Card">Ghana Card (Recommended)</option>
                            <option value="Passport">International Passport</option>
                            <option value="Drivers License">Driver's License</option>
                            <option value="Voter ID">Voter's ID</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>ID Number</label>
                        <input
                            type="text"
                            name="number"
                            className={styles.input}
                            placeholder="e.g. GHA-123456789-0"
                            required
                        />
                    </div>

                    <div className={styles.uploadGrid}>
                        {/* ID Front */}
                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                name="idFront"
                                id="idFront"
                                accept="image/*,.pdf"
                                className={styles.fileInput}
                                onChange={(e) => setIdFrontFile(e.target.files?.[0] || null)}
                                required
                            />
                            <label htmlFor="idFront" className={styles.uploadLabel}>
                                {idFrontFile ? (
                                    <CheckCircle2 size={24} className={styles.uploadSuccess} />
                                ) : (
                                    <Upload size={24} />
                                )}
                                <span>{idFrontFile ? idFrontFile.name : 'ID Front'}</span>
                                <small>Click to upload</small>
                            </label>
                        </div>

                        {/* ID Back */}
                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                name="idBack"
                                id="idBack"
                                accept="image/*,.pdf"
                                className={styles.fileInput}
                                onChange={(e) => setIdBackFile(e.target.files?.[0] || null)}
                            />
                            <label htmlFor="idBack" className={styles.uploadLabel}>
                                {idBackFile ? (
                                    <CheckCircle2 size={24} className={styles.uploadSuccess} />
                                ) : (
                                    <Upload size={24} />
                                )}
                                <span>{idBackFile ? idBackFile.name : 'ID Back'}</span>
                                <small>Optional</small>
                            </label>
                        </div>

                        {/* Selfie */}
                        <div className={styles.uploadBox}>
                            <input
                                type="file"
                                name="selfie"
                                id="selfie"
                                accept="image/*"
                                className={styles.fileInput}
                                onChange={(e) => setSelfieFile(e.target.files?.[0] || null)}
                                required
                            />
                            <label htmlFor="selfie" className={styles.uploadLabel}>
                                {selfieFile ? (
                                    <CheckCircle2 size={24} className={styles.uploadSuccess} />
                                ) : (
                                    <Camera size={24} />
                                )}
                                <span>{selfieFile ? selfieFile.name : 'Selfie with ID'}</span>
                                <small>Hold ID next to face</small>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Privacy Note */}
                <div className={styles.privacyNote}>
                    <Shield size={16} />
                    <span>Your personal data is encrypted and only accessible by our verification team and platform administrators for security purposes.</span>
                </div>

                <button type="submit" className={styles.submitBtn} disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit for Verification'}
                </button>
            </form>
        </div>
    );
}
