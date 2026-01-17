'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    ExternalLink,
    Check,
    X,
    Clock,
    Filter,
    Eye,
    DollarSign,
    User,
    Calendar
} from 'lucide-react';
import { Submission } from '@/app/lib/db';
import styles from './submissions.module.css';

// Mock submissions for demo
const mockSubmissions: Submission[] = [
    {
        id: '1',
        campaignId: 'camp-1',
        campaignTitle: 'Summer Vibes Beat',
        creatorId: 'user-1',
        creatorName: 'DJ_Kofi',
        videoUrl: 'https://tiktok.com/@dj_kofi/video/123',
        platform: 'tiktok',
        views: 12500,
        earnings: 62.50,
        status: 'pending',
        submittedAt: new Date().toISOString(),
    },
    {
        id: '2',
        campaignId: 'camp-1',
        campaignTitle: 'Summer Vibes Beat',
        creatorId: 'user-2',
        creatorName: 'AfroDancer',
        videoUrl: 'https://instagram.com/reel/456',
        platform: 'instagram',
        views: 8200,
        earnings: 41.00,
        status: 'approved',
        submittedAt: new Date(Date.now() - 86400000).toISOString(),
        reviewedAt: new Date().toISOString(),
    },
    {
        id: '3',
        campaignId: 'camp-2',
        campaignTitle: 'Afrobeats Anthem',
        creatorId: 'user-3',
        creatorName: 'MusicLover_GH',
        videoUrl: 'https://youtube.com/shorts/789',
        platform: 'youtube',
        views: 5000,
        earnings: 25.00,
        status: 'rejected',
        submittedAt: new Date(Date.now() - 172800000).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000).toISOString(),
        rejectionReason: 'Content did not use the provided audio',
    },
];

export default function SubmissionsPage() {
    const [submissions, setSubmissions] = useState<Submission[]>(mockSubmissions);
    const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
    const [processing, setProcessing] = useState<string | null>(null);

    const filteredSubmissions = filter === 'all'
        ? submissions
        : submissions.filter(s => s.status === filter);

    const stats = {
        total: submissions.length,
        pending: submissions.filter(s => s.status === 'pending').length,
        approved: submissions.filter(s => s.status === 'approved').length,
        rejected: submissions.filter(s => s.status === 'rejected').length,
        totalPaid: submissions.filter(s => s.status === 'approved').reduce((sum, s) => sum + s.earnings, 0),
    };

    const handleApprove = async (id: string) => {
        setProcessing(id);
        await new Promise(r => setTimeout(r, 500));
        setSubmissions(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'approved' as const, reviewedAt: new Date().toISOString() } : s
        ));
        setProcessing(null);
    };

    const handleReject = async (id: string) => {
        const reason = prompt('Reason for rejection (optional):');
        setProcessing(id);
        await new Promise(r => setTimeout(r, 500));
        setSubmissions(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'rejected' as const, reviewedAt: new Date().toISOString(), rejectionReason: reason || undefined } : s
        ));
        setProcessing(null);
    };

    const getPlatformColor = (platform: string) => {
        switch (platform) {
            case 'tiktok': return '#000';
            case 'instagram': return '#E4405F';
            case 'youtube': return '#FF0000';
            case 'twitter': return '#1DA1F2';
            default: return '#64748b';
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'pending': return { bg: '#fef3c7', color: '#92400e', icon: Clock };
            case 'approved': return { bg: '#dcfce7', color: '#166534', icon: Check };
            case 'rejected': return { bg: '#fee2e2', color: '#991b1b', icon: X };
            default: return { bg: '#f1f5f9', color: '#64748b', icon: Clock };
        }
    };

    return (
        <div className={styles.container}>
            <Link href="/dashboard/seller/promotions" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Promotions
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Eye size={28} />
                    Content Submissions
                </h1>
                <p className={styles.subtitle}>Review and approve affiliate content for your campaigns</p>
            </header>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total</span>
                    <span className={styles.statValue}>{stats.total}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Pending</span>
                    <span className={styles.statValue} style={{ color: '#f59e0b' }}>{stats.pending}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Approved</span>
                    <span className={styles.statValue} style={{ color: '#22c55e' }}>{stats.approved}</span>
                </div>
                <div className={styles.statCard}>
                    <span className={styles.statLabel}>Total Paid</span>
                    <span className={styles.statValue} style={{ color: '#3b82f6' }}>GH₵{stats.totalPaid.toFixed(2)}</span>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <Filter size={16} />
                {(['all', 'pending', 'approved', 'rejected'] as const).map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`${styles.filterBtn} ${filter === f ? styles.active : ''}`}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Submissions List */}
            <div className={styles.submissionsList}>
                {filteredSubmissions.length === 0 ? (
                    <div className={styles.emptyState}>
                        <Eye size={48} />
                        <h3>No submissions found</h3>
                        <p>Submissions from affiliates will appear here</p>
                    </div>
                ) : (
                    filteredSubmissions.map(submission => {
                        const statusBadge = getStatusBadge(submission.status);
                        const StatusIcon = statusBadge.icon;

                        return (
                            <div key={submission.id} className={styles.submissionCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.creatorInfo}>
                                        <div className={styles.avatar}>
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3>{submission.creatorName}</h3>
                                            <span className={styles.campaignName}>{submission.campaignTitle}</span>
                                        </div>
                                    </div>
                                    <span
                                        className={styles.statusBadge}
                                        style={{ background: statusBadge.bg, color: statusBadge.color }}
                                    >
                                        <StatusIcon size={12} />
                                        {submission.status}
                                    </span>
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.infoRow}>
                                        <span className={styles.platform} style={{ color: getPlatformColor(submission.platform) }}>
                                            {submission.platform}
                                        </span>
                                        <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                                            View content <ExternalLink size={14} />
                                        </a>
                                    </div>

                                    <div className={styles.statsRow}>
                                        <div className={styles.stat}>
                                            <Eye size={14} />
                                            <span>{submission.views.toLocaleString()} views</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <DollarSign size={14} />
                                            <span>GH₵{submission.earnings.toFixed(2)}</span>
                                        </div>
                                        <div className={styles.stat}>
                                            <Calendar size={14} />
                                            <span>{new Date(submission.submittedAt).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    {submission.rejectionReason && (
                                        <div className={styles.rejectionNote}>
                                            Reason: {submission.rejectionReason}
                                        </div>
                                    )}
                                </div>

                                {submission.status === 'pending' && (
                                    <div className={styles.cardActions}>
                                        <button
                                            onClick={() => handleApprove(submission.id)}
                                            disabled={processing === submission.id}
                                            className={styles.approveBtn}
                                        >
                                            <Check size={16} />
                                            {processing === submission.id ? 'Processing...' : 'Approve'}
                                        </button>
                                        <button
                                            onClick={() => handleReject(submission.id)}
                                            disabled={processing === submission.id}
                                            className={styles.rejectBtn}
                                        >
                                            <X size={16} />
                                            Reject
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
