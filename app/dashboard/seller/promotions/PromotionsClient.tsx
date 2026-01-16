'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './promotions.module.css';
import {
    Music,
    Plus,
    Radio,
    DollarSign,
    Wallet,
    Download,
    ExternalLink,
    ListMusic,
    ArrowLeft,
    Package,
    Calendar,
    Smartphone,
    Store,
    GraduationCap,
    Sparkles,
    Filter,
    Trash2,
    MoreVertical
} from 'lucide-react';
import { CampaignType } from '../../../lib/db';
import { useRouter } from 'next/navigation';

// Type icon mapping
const typeIcons: Record<CampaignType, React.ComponentType<{ size?: number }>> = {
    music: Music,
    product: Package,
    event: Calendar,
    app: Smartphone,
    business: Store,
    course: GraduationCap,
    custom: Sparkles
};

const typeLabels: Record<CampaignType, string> = {
    music: 'Music',
    product: 'Products',
    event: 'Events',
    app: 'Apps',
    business: 'Business',
    course: 'Courses',
    custom: 'Custom'
};

const typeColors: Record<CampaignType, string> = {
    music: '#f97316',
    product: '#3b82f6',
    event: '#8b5cf6',
    app: '#22c55e',
    business: '#ec4899',
    course: '#eab308',
    custom: '#06b6d4'
};

interface PromotionsClientProps {
    campaigns: any[];
    stats: {
        activeCampaigns: number;
        totalBudget: number;
        totalRemaining: number;
    };
}

export default function PromotionsClient({ campaigns: initialCampaigns, stats }: PromotionsClientProps) {
    const [activeFilter, setActiveFilter] = useState<CampaignType | 'all'>('all');
    const [campaigns, setCampaigns] = useState(initialCampaigns);
    const [submitModalOpen, setSubmitModalOpen] = useState<string | null>(null);
    const [submissionLink, setSubmissionLink] = useState('');
    const [deleting, setDeleting] = useState<string | null>(null);
    const router = useRouter();

    const filterTabs: { key: CampaignType | 'all'; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'music', label: 'Music' },
        { key: 'product', label: 'Products' },
        { key: 'event', label: 'Events' },
        { key: 'app', label: 'Apps' },
        { key: 'business', label: 'Business' },
        { key: 'course', label: 'Courses' },
        { key: 'custom', label: 'Custom' }
    ];

    const filteredCampaigns = activeFilter === 'all'
        ? campaigns
        : campaigns.filter(c => c.type === activeFilter);

    const handleDownload = (audioUrl: string, title: string) => {
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = `${title}.mp3`;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleSubmitLink = async (campaignId: string) => {
        if (!submissionLink.trim()) {
            alert('Please enter a valid link');
            return;
        }
        // TODO: Implement actual submission to backend
        alert(`Link submitted: ${submissionLink}`);
        setSubmitModalOpen(null);
        setSubmissionLink('');
    };

    const handleDeleteCampaign = async (campaignId: string) => {
        if (!confirm('Are you sure you want to delete this campaign? This action cannot be undone.')) {
            return;
        }
        setDeleting(campaignId);
        try {
            // TODO: Implement actual delete API call
            setCampaigns(prev => prev.filter(c => c.id !== campaignId));
            alert('Campaign deleted successfully');
        } catch (error) {
            alert('Failed to delete campaign');
        }
        setDeleting(null);
    };

    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1>
                        <Radio size={28} />
                        Promotions
                    </h1>
                    <p>Create and manage promotional campaigns across all categories.</p>
                </div>
                <Link href="/dashboard/seller/promotions/new" className={styles.newCampaignBtn}>
                    <Plus size={18} />
                    New Campaign
                </Link>
            </div>

            {/* Stats Grid */}
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Active Campaigns</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
                            <Radio size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>{stats.activeCampaigns}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Total Budget</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>
                            <DollarSign size={18} />
                        </div>
                    </div>
                    <div className={styles.statValue}>GH₵{stats.totalBudget.toLocaleString()}</div>
                </div>
                <div className={styles.statCard}>
                    <div className={styles.statHeader}>
                        <span className={styles.statLabel}>Remaining Budget</span>
                        <div className={styles.statIcon} style={{ background: 'rgba(249, 115, 22, 0.1)', color: '#f97316' }}>
                            <Wallet size={18} />
                        </div>
                    </div>
                    <div className={`${styles.statValue} ${styles.statValueOrange}`}>
                        GH₵{stats.totalRemaining.toLocaleString()}
                    </div>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className={styles.filterSection}>
                <div className={styles.filterTabs}>
                    {filterTabs.map(tab => (
                        <button
                            key={tab.key}
                            className={`${styles.filterTab} ${activeFilter === tab.key ? styles.filterTabActive : ''}`}
                            onClick={() => setActiveFilter(tab.key)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Campaigns Section */}
            <div className={styles.campaignsSection}>
                <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>
                        <ListMusic size={20} />
                        Campaigns
                        {activeFilter !== 'all' && (
                            <span className={styles.filterBadge}>{typeLabels[activeFilter]}</span>
                        )}
                    </h3>
                    <div className={styles.campaignCount}>
                        {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
                    </div>
                </div>

                {filteredCampaigns.length === 0 ? (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            {activeFilter === 'all' ? <Radio size={32} /> :
                                (() => {
                                    const Icon = typeIcons[activeFilter];
                                    return <Icon size={32} />;
                                })()
                            }
                        </div>
                        <h3 className={styles.emptyTitle}>
                            {activeFilter === 'all' ? 'No campaigns yet' : `No ${typeLabels[activeFilter]} campaigns`}
                        </h3>
                        <p className={styles.emptyText}>
                            {activeFilter === 'all'
                                ? 'Start promoting to reach more audiences!'
                                : `Create a ${typeLabels[activeFilter]} campaign to get started.`
                            }
                        </p>
                    </div>
                ) : (
                    <div className={styles.campaignsGrid}>
                        {filteredCampaigns.map((campaign) => {
                            const campaignType = campaign.type || 'music';
                            const TypeIcon = typeIcons[campaignType as CampaignType] || Radio;
                            const typeColor = typeColors[campaignType as CampaignType] || '#f97316';

                            return (
                                <div key={campaign.id} className={styles.campaignCard}>
                                    {/* Cover */}
                                    <div className={styles.campaignCover} style={{
                                        background: `linear-gradient(135deg, ${typeColor}20 0%, ${typeColor}40 100%)`
                                    }}>
                                        <div className={styles.campaignCoverIcon} style={{
                                            background: `${typeColor}20`,
                                            borderColor: `${typeColor}50`,
                                            color: typeColor
                                        }}>
                                            <TypeIcon size={32} />
                                        </div>
                                        <div className={styles.campaignBadges}>
                                            <span className={styles.typeBadge} style={{
                                                background: `${typeColor}20`,
                                                color: typeColor
                                            }}>
                                                {campaign.customType || typeLabels[campaignType as CampaignType]}
                                            </span>
                                            <span className={`${styles.campaignStatus} ${campaign.status === 'active' ? styles.statusActive : styles.statusPaused}`}>
                                                {campaign.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div className={styles.campaignBody}>
                                        <div className={styles.campaignInfo}>
                                            <h3 className={styles.campaignTitle}>
                                                {campaign.title || campaign.songTitle}
                                            </h3>
                                            <p className={styles.campaignSubtitle}>
                                                {campaign.subtitle || campaign.artistName}
                                            </p>
                                        </div>

                                        {/* Earnings Rate */}
                                        <div className={styles.earningsCard}>
                                            <div className={styles.earningsLabel}>Earnings Rate</div>
                                            <div className={styles.earningsValue}>
                                                <span className={styles.earningsAmount}>GH₵{campaign.ratePer1kViews}</span>
                                                <span className={styles.earningsUnit}>/ 1k views</span>
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        {campaign.requirements && (
                                            <div className={styles.requirements}>
                                                <div className={styles.requirementsLabel}>Requirements:</div>
                                                <div className={styles.requirementsValue}>{campaign.requirements}</div>
                                            </div>
                                        )}

                                        {/* Budget Progress */}
                                        <div className={styles.budgetProgress}>
                                            <div className={styles.budgetInfo}>
                                                <span>Budget remaining</span>
                                                <span>GH₵{campaign.remainingBudget.toLocaleString()} / GH₵{campaign.budget.toLocaleString()}</span>
                                            </div>
                                            <div className={styles.progressBar}>
                                                <div
                                                    className={styles.progressFill}
                                                    style={{
                                                        width: `${(campaign.remainingBudget / campaign.budget) * 100}%`,
                                                        background: typeColor
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className={styles.campaignActions}>
                                            {campaignType === 'music' && campaign.audioUrl && (
                                                <button
                                                    className={styles.downloadBtn}
                                                    onClick={() => handleDownload(campaign.audioUrl, campaign.title || campaign.songTitle)}
                                                >
                                                    <Download size={18} />
                                                    Download
                                                </button>
                                            )}
                                            <button
                                                className={styles.submitBtn}
                                                onClick={() => setSubmitModalOpen(campaign.id)}
                                            >
                                                <ExternalLink size={18} />
                                                Submit Link
                                            </button>
                                            <button
                                                className={styles.deleteBtn}
                                                onClick={() => handleDeleteCampaign(campaign.id)}
                                                disabled={deleting === campaign.id}
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        {/* Submit Link Modal */}
                                        {submitModalOpen === campaign.id && (
                                            <div className={styles.submitModal}>
                                                <div className={styles.submitModalContent}>
                                                    <h4>Submit Your Link</h4>
                                                    <p>Paste the link to your promotion post:</p>
                                                    <input
                                                        type="url"
                                                        placeholder="https://tiktok.com/..."
                                                        value={submissionLink}
                                                        onChange={(e) => setSubmissionLink(e.target.value)}
                                                        className={styles.submitInput}
                                                    />
                                                    <div className={styles.submitModalActions}>
                                                        <button
                                                            onClick={() => { setSubmitModalOpen(null); setSubmissionLink(''); }}
                                                            className={styles.cancelBtn}
                                                        >
                                                            Cancel
                                                        </button>
                                                        <button
                                                            onClick={() => handleSubmitLink(campaign.id)}
                                                            className={styles.confirmBtn}
                                                        >
                                                            Submit
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
