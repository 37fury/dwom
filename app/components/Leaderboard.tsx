'use client';

import { Trophy, TrendingUp } from 'lucide-react';

type TopSeller = {
    id: string;
    name: string;
    avatar?: string;
    sales: number;
    revenue: number;
};

type Props = {
    sellers: TopSeller[];
    title?: string;
    period?: string;
};

export default function Leaderboard({ sellers, title = "Top Creators", period = "This Month" }: Props) {
    const getRankStyle = (rank: number) => {
        switch (rank) {
            case 1:
                return { bg: 'linear-gradient(135deg, #fbbf24, #f59e0b)', color: 'white', emoji: '🥇' };
            case 2:
                return { bg: 'linear-gradient(135deg, #94a3b8, #64748b)', color: 'white', emoji: '🥈' };
            case 3:
                return { bg: 'linear-gradient(135deg, #d97706, #b45309)', color: 'white', emoji: '🥉' };
            default:
                return { bg: '#f1f5f9', color: '#64748b', emoji: '' };
        }
    };

    const formatRevenue = (amount: number) => {
        if (amount >= 1000) {
            return `GH₵${(amount / 1000).toFixed(1)}k`;
        }
        return `GH₵${amount}`;
    };

    return (
        <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '28px',
            border: '1px solid #e2e8f0'
        }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '44px',
                        height: '44px',
                        background: 'linear-gradient(135deg, #f97316, #ea580c)',
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        <Trophy size={22} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                            {title}
                        </h3>
                        <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
                            {period}
                        </p>
                    </div>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#22c55e',
                    fontSize: '13px',
                    fontWeight: '600'
                }}>
                    <TrendingUp size={16} />
                    Live
                </div>
            </div>

            {/* Leaderboard List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sellers.slice(0, 5).map((seller, index) => {
                    const rank = index + 1;
                    const rankStyle = getRankStyle(rank);
                    const initials = seller.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

                    return (
                        <div
                            key={seller.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '14px',
                                padding: '14px 16px',
                                background: rank <= 3 ? '#fffbeb' : '#f8fafc',
                                borderRadius: '14px',
                                transition: 'transform 0.2s',
                                cursor: 'pointer'
                            }}
                        >
                            {/* Rank Badge */}
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '8px',
                                background: rankStyle.bg,
                                color: rankStyle.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: '700',
                                fontSize: rank <= 3 ? '16px' : '14px',
                                flexShrink: 0
                            }}>
                                {rankStyle.emoji || rank}
                            </div>

                            {/* Avatar */}
                            {seller.avatar ? (
                                <img
                                    src={seller.avatar}
                                    alt={seller.name}
                                    style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        objectFit: 'cover'
                                    }}
                                />
                            ) : (
                                <div style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600',
                                    fontSize: '14px'
                                }}>
                                    {initials}
                                </div>
                            )}

                            {/* Info */}
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{
                                    fontWeight: '600',
                                    color: '#0f172a',
                                    fontSize: '15px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {seller.name}
                                </div>
                                <div style={{ fontSize: '13px', color: '#64748b' }}>
                                    {seller.sales} sales
                                </div>
                            </div>

                            {/* Revenue */}
                            <div style={{
                                fontWeight: '700',
                                color: rank === 1 ? '#f97316' : '#0f172a',
                                fontSize: '15px'
                            }}>
                                {formatRevenue(seller.revenue)}
                            </div>
                        </div>
                    );
                })}
            </div>

            {sellers.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '32px',
                    color: '#94a3b8'
                }}>
                    <Trophy size={40} style={{ opacity: 0.3, marginBottom: '12px' }} />
                    <p>No sellers yet this period</p>
                </div>
            )}
        </div>
    );
}

// Mock data generator for preview
export const mockTopSellers: TopSeller[] = [
    { id: '1', name: 'Kofi Tech Academy', sales: 156, revenue: 12500 },
    { id: '2', name: 'Ama Digital Skills', sales: 98, revenue: 8200 },
    { id: '3', name: 'Lagos Code Hub', sales: 87, revenue: 7100 },
    { id: '4', name: 'AfroBeats Studio', sales: 65, revenue: 5400 },
    { id: '5', name: 'Naija Finance Pro', sales: 52, revenue: 4300 },
];
