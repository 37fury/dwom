'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
    Music,
    Package,
    Calendar,
    Smartphone,
    Store,
    GraduationCap,
    Sparkles,
    ArrowLeft,
    Download,
    ExternalLink,
    Radio,
    DollarSign,
    Megaphone
} from 'lucide-react';
import { Campaign, CampaignType } from '@/app/lib/db';

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

interface CreatorHubClientProps {
    campaigns: Campaign[];
    stats: {
        activeCampaigns: number;
        totalBudget: number;
        remainingBudget: number;
    };
}

export default function CreatorHubClient({ campaigns, stats }: CreatorHubClientProps) {
    const [activeFilter, setActiveFilter] = useState<CampaignType | 'all'>('all');

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

    return (
        <div style={{ maxWidth: '1000px', margin: '0 auto', paddingBottom: '48px' }}>
            {/* Back Link */}
            <Link href="/dashboard/affiliates" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                color: '#64748b',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                marginBottom: '24px'
            }}>
                <ArrowLeft size={16} />
                Back to Affiliate Dashboard
            </Link>

            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '32px',
                flexWrap: 'wrap',
                gap: '16px'
            }}>
                <div>
                    <h1 style={{
                        fontSize: '28px',
                        fontWeight: '800',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        marginBottom: '8px'
                    }}>
                        <Megaphone size={28} />
                        Creator Hub
                    </h1>
                    <p style={{ fontSize: '15px', color: '#64748b' }}>
                        Browse active campaigns and earn by creating content.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '32px'
            }}>
                <StatCard
                    title="Available Campaigns"
                    value={stats.activeCampaigns.toString()}
                    icon={<Radio size={18} />}
                    iconBg="rgba(59, 130, 246, 0.1)"
                    iconColor="#3b82f6"
                />
                <StatCard
                    title="Total Budget Pool"
                    value={`GH₵${stats.totalBudget.toLocaleString()}`}
                    icon={<DollarSign size={18} />}
                    iconBg="rgba(34, 197, 94, 0.1)"
                    iconColor="#22c55e"
                />
                <StatCard
                    title="Available to Earn"
                    value={`GH₵${stats.remainingBudget.toLocaleString()}`}
                    icon={<DollarSign size={18} />}
                    iconBg="rgba(249, 115, 22, 0.1)"
                    iconColor="#f97316"
                    highlight
                />
            </div>

            {/* Filter Tabs */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '8px',
                    overflowX: 'auto',
                    paddingBottom: '8px'
                }}>
                    {filterTabs.map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveFilter(tab.key)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '10px',
                                fontSize: '13px',
                                fontWeight: '600',
                                color: activeFilter === tab.key ? 'white' : '#64748b',
                                background: activeFilter === tab.key ? '#0f172a' : 'white',
                                border: activeFilter === tab.key ? 'none' : '1px solid #e2e8f0',
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                whiteSpace: 'nowrap'
                            }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Campaigns Section */}
            <div style={{ marginBottom: '32px' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h3 style={{
                        fontSize: '18px',
                        fontWeight: '700',
                        color: '#0f172a',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px'
                    }}>
                        Active Campaigns
                        {activeFilter !== 'all' && (
                            <span style={{
                                background: 'rgba(249, 115, 22, 0.1)',
                                color: '#f97316',
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '12px'
                            }}>
                                {typeLabels[activeFilter]}
                            </span>
                        )}
                    </h3>
                    <span style={{ fontSize: '13px', color: '#64748b' }}>
                        {filteredCampaigns.length} campaign{filteredCampaigns.length !== 1 ? 's' : ''}
                    </span>
                </div>

                {filteredCampaigns.length === 0 ? (
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '20px',
                        padding: '64px',
                        textAlign: 'center'
                    }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            background: 'white',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            color: '#94a3b8'
                        }}>
                            <Radio size={32} />
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                            {activeFilter === 'all' ? 'No campaigns available' : `No ${typeLabels[activeFilter]} campaigns`}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b' }}>
                            Check back soon for new opportunities!
                        </p>
                    </div>
                ) : (
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
                        gap: '20px'
                    }}>
                        {filteredCampaigns.map((campaign) => {
                            const campaignType = (campaign.type || 'music') as CampaignType;
                            const TypeIcon = typeIcons[campaignType] || Radio;
                            const typeColor = typeColors[campaignType] || '#f97316';

                            return (
                                <div key={campaign.id} style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '20px',
                                    overflow: 'hidden',
                                    transition: 'all 0.2s'
                                }}>
                                    {/* Cover */}
                                    <div style={{
                                        height: '120px',
                                        background: `linear-gradient(135deg, ${typeColor}20 0%, ${typeColor}40 100%)`,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        position: 'relative'
                                    }}>
                                        <div style={{
                                            width: '64px',
                                            height: '64px',
                                            borderRadius: '50%',
                                            background: `${typeColor}20`,
                                            border: `2px solid ${typeColor}50`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            color: typeColor
                                        }}>
                                            <TypeIcon size={28} />
                                        </div>
                                        <div style={{
                                            position: 'absolute',
                                            top: '12px',
                                            left: '12px',
                                            right: '12px',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                            <span style={{
                                                padding: '5px 12px',
                                                borderRadius: '8px',
                                                fontSize: '11px',
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                                background: `${typeColor}20`,
                                                color: typeColor
                                            }}>
                                                {campaign.customType || typeLabels[campaignType]}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Body */}
                                    <div style={{ padding: '20px' }}>
                                        <h3 style={{
                                            fontSize: '18px',
                                            fontWeight: '700',
                                            color: '#0f172a',
                                            marginBottom: '4px'
                                        }}>
                                            {campaign.title || campaign.songTitle}
                                        </h3>
                                        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '16px' }}>
                                            {campaign.subtitle || campaign.artistName}
                                        </p>

                                        {/* Earnings Card */}
                                        <div style={{
                                            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                                            border: '1px solid #bbf7d0',
                                            borderRadius: '12px',
                                            padding: '14px',
                                            marginBottom: '16px'
                                        }}>
                                            <div style={{
                                                fontSize: '10px',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.5px',
                                                color: '#166534',
                                                fontWeight: '700',
                                                marginBottom: '4px'
                                            }}>
                                                Earn per 1k views
                                            </div>
                                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                                                <span style={{ fontSize: '22px', fontWeight: '800', color: '#22c55e' }}>
                                                    GH₵{campaign.ratePer1kViews}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Requirements */}
                                        {campaign.requirements && (
                                            <div style={{ marginBottom: '16px' }}>
                                                <div style={{ fontSize: '11px', color: '#64748b', marginBottom: '2px' }}>
                                                    Requirements:
                                                </div>
                                                <div style={{ fontSize: '13px', fontWeight: '600', color: '#0f172a' }}>
                                                    {campaign.requirements}
                                                </div>
                                            </div>
                                        )}

                                        {/* Actions */}
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            {campaignType === 'music' && campaign.audioUrl && (
                                                <button style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    gap: '6px',
                                                    flex: 1,
                                                    padding: '12px',
                                                    background: 'white',
                                                    border: '1px solid #e2e8f0',
                                                    borderRadius: '10px',
                                                    fontWeight: '600',
                                                    fontSize: '13px',
                                                    color: '#334155',
                                                    cursor: 'pointer'
                                                }}>
                                                    <Download size={16} />
                                                    Download
                                                </button>
                                            )}
                                            <button style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: '6px',
                                                flex: 2,
                                                padding: '12px',
                                                background: `linear-gradient(135deg, ${typeColor}, ${typeColor}dd)`,
                                                border: 'none',
                                                borderRadius: '10px',
                                                fontWeight: '600',
                                                fontSize: '13px',
                                                color: 'white',
                                                cursor: 'pointer'
                                            }}>
                                                <ExternalLink size={16} />
                                                Submit Content
                                            </button>
                                        </div>
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

function StatCard({
    title,
    value,
    icon,
    iconBg,
    iconColor,
    highlight = false
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    highlight?: boolean;
}) {
    return (
        <div style={{
            background: 'white',
            border: '1px solid #e2e8f0',
            borderRadius: '16px',
            padding: '24px',
            transition: 'all 0.2s'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '12px'
            }}>
                <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>
                    {title}
                </span>
                <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '10px',
                    background: iconBg,
                    color: iconColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {icon}
                </div>
            </div>
            <div style={{
                fontSize: '32px',
                fontWeight: '800',
                color: highlight ? '#f97316' : '#0f172a',
                letterSpacing: '-1px'
            }}>
                {value}
            </div>
        </div>
    );
}
