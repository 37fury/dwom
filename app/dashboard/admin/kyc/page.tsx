'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    FileCheck,
    CheckCircle2,
    XCircle,
    User,
    Phone,
    Calendar,
    MapPin,
    FileText,
    Eye,
    Clock,
    Search
} from 'lucide-react';
import styles from './kyc.module.css';

// Mock KYC submissions
const mockSubmissions = [
    {
        id: '1',
        name: 'Kofi Mensah',
        email: 'kofi@example.com',
        phone: '+233 24 123 4567',
        dob: '1995-03-15',
        address: 'East Legon, Accra',
        idType: 'Ghana Card',
        idNumber: 'GHA-123456789-0',
        submittedAt: '2024-01-15',
        status: 'pending'
    },
    {
        id: '2',
        name: 'Ama Osei',
        email: 'ama@example.com',
        phone: '+233 50 987 6543',
        dob: '1992-08-22',
        address: 'Kumasi, Ashanti',
        idType: 'Passport',
        idNumber: 'G12345678',
        submittedAt: '2024-01-14',
        status: 'pending'
    },
    {
        id: '3',
        name: 'Yaw Asante',
        email: 'yaw@example.com',
        phone: '+233 27 555 1234',
        dob: '1988-12-01',
        address: 'Takoradi, Western',
        idType: 'Driver\'s License',
        idNumber: 'DL-GH-9876543',
        submittedAt: '2024-01-13',
        status: 'pending'
    }
];

export default function AdminKYCPage() {
    const [submissions, setSubmissions] = useState(mockSubmissions);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [rejectionReason, setRejectionReason] = useState('');
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');

    const handleApprove = (id: string) => {
        setSubmissions(prev =>
            prev.map(s => s.id === id ? { ...s, status: 'approved' } : s)
        );
        alert('User verified successfully! They will receive an email notification.');
    };

    const handleReject = (id: string) => {
        if (!rejectionReason.trim()) {
            alert('Please provide a rejection reason');
            return;
        }
        setSubmissions(prev =>
            prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s)
        );
        setShowRejectModal(false);
        setRejectionReason('');
        setSelectedId(null);
        alert('User verification rejected. They will receive an email with the reason.');
    };

    const filteredSubmissions = filter === 'all'
        ? submissions
        : submissions.filter(s => s.status === filter);

    const selectedSubmission = submissions.find(s => s.id === selectedId);

    return (
        <div className={styles.container}>
            <Link href="/dashboard/admin" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            <header className={styles.header}>
                <div>
                    <h1 className={styles.title}>
                        <FileCheck size={28} />
                        KYC Review
                    </h1>
                    <p className={styles.subtitle}>Review and approve seller verification requests</p>
                </div>
            </header>

            {/* Stats */}
            <div className={styles.statsRow}>
                <div className={styles.statBadge} style={{ background: '#fef3c7', color: '#d97706' }}>
                    <Clock size={16} />
                    {submissions.filter(s => s.status === 'pending').length} Pending
                </div>
                <div className={styles.statBadge} style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <CheckCircle2 size={16} />
                    {submissions.filter(s => s.status === 'approved').length} Approved
                </div>
                <div className={styles.statBadge} style={{ background: '#fee2e2', color: '#dc2626' }}>
                    <XCircle size={16} />
                    {submissions.filter(s => s.status === 'rejected').length} Rejected
                </div>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterTabs}>
                {['pending', 'approved', 'rejected', 'all'].map(f => (
                    <button
                        key={f}
                        className={`${styles.filterTab} ${filter === f ? styles.filterTabActive : ''}`}
                        onClick={() => setFilter(f as typeof filter)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className={styles.mainContent}>
                {/* Submissions List */}
                <div className={styles.submissionsList}>
                    {filteredSubmissions.length === 0 ? (
                        <div className={styles.emptyState}>
                            <FileCheck size={40} />
                            <h3>No {filter} submissions</h3>
                            <p>All caught up!</p>
                        </div>
                    ) : (
                        filteredSubmissions.map(submission => (
                            <div
                                key={submission.id}
                                className={`${styles.submissionCard} ${selectedId === submission.id ? styles.selected : ''}`}
                                onClick={() => setSelectedId(submission.id)}
                            >
                                <div className={styles.submissionHeader}>
                                    <div className={styles.userAvatar}>
                                        <User size={20} />
                                    </div>
                                    <div className={styles.userInfo}>
                                        <h4>{submission.name}</h4>
                                        <span>{submission.email}</span>
                                    </div>
                                    <span className={`${styles.statusBadge} ${styles[submission.status]}`}>
                                        {submission.status}
                                    </span>
                                </div>
                                <div className={styles.submissionMeta}>
                                    <span><FileText size={12} /> {submission.idType}</span>
                                    <span><Clock size={12} /> {submission.submittedAt}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Details Panel */}
                {selectedSubmission && (
                    <div className={styles.detailsPanel}>
                        <h3>Verification Details</h3>

                        <div className={styles.detailGroup}>
                            <label><User size={14} /> Full Name</label>
                            <p>{selectedSubmission.name}</p>
                        </div>

                        <div className={styles.detailGroup}>
                            <label><Phone size={14} /> Phone</label>
                            <p>{selectedSubmission.phone}</p>
                        </div>

                        <div className={styles.detailGroup}>
                            <label><Calendar size={14} /> Date of Birth</label>
                            <p>{selectedSubmission.dob}</p>
                        </div>

                        <div className={styles.detailGroup}>
                            <label><MapPin size={14} /> Address</label>
                            <p>{selectedSubmission.address}</p>
                        </div>

                        <div className={styles.detailGroup}>
                            <label><FileText size={14} /> ID Type</label>
                            <p>{selectedSubmission.idType}</p>
                        </div>

                        <div className={styles.detailGroup}>
                            <label><FileText size={14} /> ID Number</label>
                            <p>{selectedSubmission.idNumber}</p>
                        </div>

                        {/* Document Preview Buttons */}
                        <div className={styles.documentsSection}>
                            <h4>Submitted Documents</h4>
                            <div className={styles.docButtons}>
                                <button className={styles.docBtn}>
                                    <Eye size={16} />
                                    View ID Front
                                </button>
                                <button className={styles.docBtn}>
                                    <Eye size={16} />
                                    View ID Back
                                </button>
                                <button className={styles.docBtn}>
                                    <Eye size={16} />
                                    View Selfie
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        {selectedSubmission.status === 'pending' && (
                            <div className={styles.actionButtons}>
                                <button
                                    className={styles.approveBtn}
                                    onClick={() => handleApprove(selectedSubmission.id)}
                                >
                                    <CheckCircle2 size={18} />
                                    Approve
                                </button>
                                <button
                                    className={styles.rejectBtn}
                                    onClick={() => {
                                        setShowRejectModal(true);
                                    }}
                                >
                                    <XCircle size={18} />
                                    Reject
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Reject Modal */}
            {showRejectModal && selectedSubmission && (
                <>
                    <div className={styles.modalOverlay} onClick={() => setShowRejectModal(false)} />
                    <div className={styles.modal}>
                        <h3>Reject Verification</h3>
                        <p>Please provide a reason for rejecting {selectedSubmission.name}'s verification:</p>
                        <textarea
                            value={rejectionReason}
                            onChange={(e) => setRejectionReason(e.target.value)}
                            placeholder="e.g., ID document is blurry, name doesn't match..."
                            rows={4}
                        />
                        <div className={styles.modalActions}>
                            <button onClick={() => setShowRejectModal(false)} className={styles.cancelBtn}>
                                Cancel
                            </button>
                            <button onClick={() => handleReject(selectedSubmission.id)} className={styles.confirmRejectBtn}>
                                Confirm Rejection
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
