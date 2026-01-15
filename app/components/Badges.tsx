'use client';

import { Star, ShoppingBag, MessageSquare, Award, Shield, Zap, Trophy, Heart } from 'lucide-react';

export type BadgeType =
    | 'first_purchase'
    | 'reviewer'
    | 'verified'
    | 'power_buyer'
    | 'early_adopter'
    | 'top_referrer'
    | 'loyal_member'
    | 'premium';

type Badge = {
    id: BadgeType;
    name: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    bgColor: string;
};

const BADGE_CONFIG: Record<BadgeType, Omit<Badge, 'id'>> = {
    first_purchase: {
        name: 'First Purchase',
        description: 'Made your first purchase on dwom',
        icon: <ShoppingBag size={16} />,
        color: '#f97316',
        bgColor: '#fff7ed'
    },
    reviewer: {
        name: 'Reviewer',
        description: 'Left a review on a product',
        icon: <MessageSquare size={16} />,
        color: '#8b5cf6',
        bgColor: '#f5f3ff'
    },
    verified: {
        name: 'Verified',
        description: 'Completed identity verification',
        icon: <Shield size={16} />,
        color: '#22c55e',
        bgColor: '#f0fdf4'
    },
    power_buyer: {
        name: 'Power Buyer',
        description: 'Made 5+ purchases',
        icon: <Zap size={16} />,
        color: '#eab308',
        bgColor: '#fefce8'
    },
    early_adopter: {
        name: 'Early Adopter',
        description: 'Joined during beta',
        icon: <Star size={16} />,
        color: '#3b82f6',
        bgColor: '#eff6ff'
    },
    top_referrer: {
        name: 'Top Referrer',
        description: 'Referred 10+ users',
        icon: <Award size={16} />,
        color: '#ec4899',
        bgColor: '#fdf2f8'
    },
    loyal_member: {
        name: 'Loyal Member',
        description: 'Member for 1+ year',
        icon: <Heart size={16} />,
        color: '#ef4444',
        bgColor: '#fef2f2'
    },
    premium: {
        name: 'Premium',
        description: 'Premium subscription active',
        icon: <Trophy size={16} />,
        color: '#d97706',
        bgColor: '#fffbeb'
    }
};

type Props = {
    badges: BadgeType[];
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
};

export default function Badges({ badges, size = 'md', showLabel = false }: Props) {
    const sizeConfig = {
        sm: { icon: 24, padding: 6 },
        md: { icon: 32, padding: 8 },
        lg: { icon: 40, padding: 10 }
    };

    const config = sizeConfig[size];

    if (badges.length === 0) return null;

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {badges.map((badgeId) => {
                const badge = BADGE_CONFIG[badgeId];
                if (!badge) return null;

                return (
                    <div
                        key={badgeId}
                        title={`${badge.name}: ${badge.description}`}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: `${config.padding}px ${showLabel ? '12px' : `${config.padding}px`}`,
                            background: badge.bgColor,
                            borderRadius: showLabel ? '20px' : '50%',
                            color: badge.color,
                            cursor: 'default',
                            transition: 'transform 0.2s'
                        }}
                    >
                        {badge.icon}
                        {showLabel && (
                            <span style={{
                                fontSize: size === 'sm' ? '11px' : '12px',
                                fontWeight: '600'
                            }}>
                                {badge.name}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// Helper to get user badges based on their stats
export function getUserBadges(stats: {
    purchases?: number;
    reviews?: number;
    isVerified?: boolean;
    referrals?: number;
    joinDate?: string;
    isPremium?: boolean;
}): BadgeType[] {
    const badges: BadgeType[] = [];

    if ((stats.purchases ?? 0) >= 1) badges.push('first_purchase');
    if ((stats.purchases ?? 0) >= 5) badges.push('power_buyer');
    if ((stats.reviews ?? 0) >= 1) badges.push('reviewer');
    if (stats.isVerified) badges.push('verified');
    if ((stats.referrals ?? 0) >= 10) badges.push('top_referrer');
    if (stats.isPremium) badges.push('premium');

    // Early adopter - joined before 2027
    if (stats.joinDate) {
        const joinYear = new Date(stats.joinDate).getFullYear();
        if (joinYear <= 2026) badges.push('early_adopter');
    }

    return badges;
}
