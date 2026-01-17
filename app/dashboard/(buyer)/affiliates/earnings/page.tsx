'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    DollarSign,
    TrendingUp,
    Clock,
    CheckCircle,
    ExternalLink,
    Calendar,
    Wallet
} from 'lucide-react';
import { Submission } from '@/app/lib/db';
import styles from './earnings.module.css';

// Mock earnings data
const mockEarnings: Submission[] = [
    {
        id: '1',
        campaignId: 'camp-1',
        campaignTitle: 'Summer Vibes Beat',
        creatorId: 'current-user',
        creatorName: 'You',
        videoUrl: 'https://tiktok.com/@you/video/123',
        platform: 'tiktok',
        views: 25000,
        earnings: 125.00,
        status: 'approved',
        submittedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
    {
        id: '2',
        campaignId: 'camp-2',
        campaignTitle: 'Afrobeats Anthem',
        creatorId: 'current-user',
        creatorName: 'You',
        videoUrl: 'https://instagram.com/reel/456',
        platform: 'instagram',
        views: 12000,
        earnings: 60.00,
        status: 'pending',
        submittedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
        id: '3',
        campaignId: 'camp-1',
        campaignTitle: 'Summer Vibes Beat',
        creatorId: 'current-user',
        creatorName: 'You',
        videoUrl: 'https://youtube.com/shorts/789',
        platform: 'youtube',
        views: 8500,
        earnings: 42.50,
        status: 'approved',
        submittedAt: new Date(Date.now() - 86400000 * 7).toISOString(),
        reviewedAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    },
];

export default function EarningsPage() {
    const [earnings] = useState<Submission[]>(mockEarnings);

    const stats = {
        totalEarned: earnings.filter(e => e.status === 'approved').reduce((sum, e) => sum + e.earnings, 0),
        pendingEarnings: earnings.filter(e => e.status === 'pending').reduce((sum, e) => sum + e.earnings, 0),
        totalViews: earnings.reduce((sum, e) => sum + e.views, 0),
        totalSubmissions: earnings.length,
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

    return (
        <div className={styles.container}>
            <Link href="/dashboard/affiliates" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Affiliates
            </Link>

            <header className={styles.header}>
                <h1 className={styles.title}>
                    <Wallet size={28} />
                    My Earnings
                </h1>
                <p className={styles.subtitle}>Track your affiliate earnings from content creation</p>
            </header>

            {/* Stats */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                        <DollarSign size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Total Earned</span>
                        <span className={styles.statValue} style={{ color: '#22c55e' }}>GH₵{stats.totalEarned.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
                        <Clock size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Pending</span>
                        <span className={styles.statValue} style={{ color: '#f59e0b' }}>GH₵{stats.pendingEarnings.toFixed(2)}</span>
                    </div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                        <TrendingUp size={20} />
                    </div>
                    <div>
                        <span className={styles.statLabel}>Total Views</span>
                        <span className={styles.statValue}>{stats.totalViews.toLocaleString()}</span>
                    </div>
                </div>
            </div>

            {/* Earnings List */}
            <div className={styles.section}>
                <h2 className={styles.sectionTitle}>Submission History</h2>
                <div className={styles.earningsList}>
                    {earnings.map(submission => (
                        <div key={submission.id} className={styles.earningCard}>
                            <div className={styles.cardLeft}>
                                <div className={styles.campaignInfo}>
                                    <h3>{submission.campaignTitle}</h3>
                                    <span
                                        className={styles.platform}
                                        style={{ color: getPlatformColor(submission.platform) }}
                                    >
                                        {submission.platform}
                                    </span>
                                </div>
                                <div className={styles.meta}>
                                    <span className={styles.metaItem}>
                                        <Calendar size={14} />
                                        {new Date(submission.submittedAt).toLocaleDateString()}
                                    </span>
                                    <span className={styles.metaItem}>
                                        {submission.views.toLocaleString()} views
                                    </span>
                                    <a href={submission.videoUrl} target="_blank" rel="noopener noreferrer" className={styles.viewLink}>
                                        <ExternalLink size={14} />
                                        View
                                    </a>
                                </div>
                            </div>
                            <div className={styles.cardRight}>
                                <span className={styles.earning}>GH₵{submission.earnings.toFixed(2)}</span>
                                <span className={`${styles.status} ${styles[submission.status]}`}>
                                    {submission.status === 'approved' && <CheckCircle size={14} />}
                                    {submission.status === 'pending' && <Clock size={14} />}
                                    {submission.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Withdraw Section */}
            <div className={styles.withdrawSection}>
                <div className={styles.withdrawInfo}>
                    <h3>Available for Withdrawal</h3>
                    <span className={styles.withdrawAmount}>GH₵{stats.totalEarned.toFixed(2)}</span>
                </div>
                <button className={styles.withdrawBtn}>
                    Withdraw to Wallet
                </button>
            </div>
        </div>
    );
}
