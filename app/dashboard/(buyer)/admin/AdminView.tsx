'use client';

import { useState } from 'react';
import styles from './admin.module.css';
import {
    approveKYCAction,
    rejectKYCAction,
    approveCryptoOrderAction,
    rejectCryptoOrderAction,
    processPayoutAction,
    rejectPayoutAction,
    toggleUserBanAction
} from './actions';
import {
    Shield,
    Bitcoin,
    Wallet,
    FileCheck,
    Users,
    CheckCircle,
    XCircle,
    ExternalLink,
    Ban,
    UserCheck
} from 'lucide-react';

interface AdminViewProps {
    pendingCrypto: any[];
    pendingPayouts: any[];
    pendingVerifications: any[];
    users: any[];
}

export default function AdminView({ pendingCrypto, pendingPayouts, pendingVerifications, users }: AdminViewProps) {
    const [activeTab, setActiveTab] = useState<'crypto' | 'payouts' | 'kyc' | 'users'>('crypto');

    const tabs = [
        { id: 'crypto', label: 'Crypto Orders', icon: Bitcoin, count: pendingCrypto.length },
        { id: 'payouts', label: 'Payout Requests', icon: Wallet, count: pendingPayouts.length },
        { id: 'kyc', label: 'KYC Requests', icon: FileCheck, count: pendingVerifications.length },
        { id: 'users', label: 'Users', icon: Users, count: users.length },
    ];

    return (
        <div className={styles.container}>
            {/* Header */}
            <div className={styles.headerSection}>
                <h1 className={styles.title}>
                    <Shield size={28} />
                    Admin Dashboard
                </h1>
                <p className={styles.subtitle}>Manage orders, payouts, verifications, and users</p>
            </div>

            {/* Stats Banner */}
            <div className={styles.statsBanner}>
                <div className={styles.statItem}>
                    <div className={styles.statValue} style={{ color: '#f97316' }}>{pendingCrypto.length}</div>
                    <div className={styles.statLabel}>Crypto Pending</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue} style={{ color: '#3b82f6' }}>{pendingPayouts.length}</div>
                    <div className={styles.statLabel}>Payouts Pending</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue} style={{ color: '#8b5cf6' }}>{pendingVerifications.length}</div>
                    <div className={styles.statLabel}>KYC Pending</div>
                </div>
                <div className={styles.statItem}>
                    <div className={styles.statValue}>{users.length}</div>
                    <div className={styles.statLabel}>Total Users</div>
                </div>
            </div>

            {/* Tabs */}
            <div className={styles.tabs}>
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        className={`${styles.tab} ${activeTab === tab.id ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab.id as any)}
                    >
                        <tab.icon size={18} />
                        {tab.label}
                        {tab.count > 0 && <span className={styles.tabBadge}>{tab.count}</span>}
                    </button>
                ))}
            </div>

            {/* Crypto Orders Section */}
            {activeTab === 'crypto' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <Bitcoin size={20} />
                        Pending Crypto Orders
                    </h2>
                    {pendingCrypto.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><Bitcoin size={28} /></div>
                            <p>No pending crypto orders</p>
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {pendingCrypto.map((order: any) => (
                                <div key={order.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardInfo}>
                                            <h3 className={styles.name}>{order.productTitle}</h3>
                                            <div className={styles.email}>Buyer: {order.userName} ({order.userEmail})</div>
                                        </div>
                                        <span className={styles.date}>{order.date}</span>
                                    </div>
                                    <div className={`${styles.details} ${styles.cryptoDetails}`}>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Amount</span>
                                            <span className={styles.detailValue} style={{ color: '#22c55e', fontSize: '16px' }}>
                                                {order.amount} USDT
                                            </span>
                                        </div>
                                        <div style={{ marginTop: '12px' }}>
                                            <span className={styles.label}>Transaction Hash</span>
                                            <div className={styles.hashBox}>{order.hash}</div>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <form action={async () => { await approveCryptoOrderAction(order.id); }}>
                                            <button className={`${styles.btn} ${styles.approve}`}>
                                                <CheckCircle size={16} />
                                                Approve
                                            </button>
                                        </form>
                                        <form action={async () => { await rejectCryptoOrderAction(order.id); }}>
                                            <button className={`${styles.btn} ${styles.reject}`}>
                                                <XCircle size={16} />
                                                Reject
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Payouts Section */}
            {activeTab === 'payouts' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <Wallet size={20} />
                        Payout Requests
                    </h2>
                    {pendingPayouts.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><Wallet size={28} /></div>
                            <p>No pending payouts</p>
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {pendingPayouts.map((payout: any) => (
                                <div key={payout.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardInfo}>
                                            <h3 className={styles.name}>{payout.sellerName}</h3>
                                            <div className={styles.email}>Amount: GH₵{payout.amount}</div>
                                        </div>
                                        <span className={styles.date}>{payout.date}</span>
                                    </div>
                                    <div className={styles.details}>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Method</span>
                                            <span className={styles.detailValue}>{payout.method}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.label}>Details</span>
                                            <span className={styles.detailValue}>{JSON.stringify(payout.details)}</span>
                                        </div>
                                    </div>
                                    <div className={styles.actions}>
                                        <form action={async () => { await processPayoutAction(payout.id); }}>
                                            <button className={`${styles.btn} ${styles.approve}`}>
                                                <CheckCircle size={16} />
                                                Mark as Paid
                                            </button>
                                        </form>
                                        <form action={async () => { await rejectPayoutAction(payout.id); }}>
                                            <button className={`${styles.btn} ${styles.reject}`}>
                                                <XCircle size={16} />
                                                Reject
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* KYC Section */}
            {activeTab === 'kyc' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <FileCheck size={20} />
                        Pending Verifications
                    </h2>
                    {pendingVerifications.length === 0 ? (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}><FileCheck size={28} /></div>
                            <p>No pending verifications</p>
                        </div>
                    ) : (
                        <div className={styles.list}>
                            {pendingVerifications.map((req: any) => (
                                <div key={req.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.cardInfo}>
                                            <h3 className={styles.name}>{req.full_name}</h3>
                                            <div className={styles.email}>{req.email}</div>
                                        </div>
                                        <span className={styles.date}>
                                            {new Date(req.updated_at || req.created_at).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div className={styles.details}>
                                        <div className={styles.row}>
                                            <span className={styles.label}>ID Type</span>
                                            <span className={styles.detailValue}>{req.payout_details?.provider || 'ID Card'}</span>
                                        </div>
                                        <div className={styles.row}>
                                            <span className={styles.label}>ID Number</span>
                                            <span className={styles.detailValue}>{req.payout_details?.number || 'N/A'}</span>
                                        </div>
                                    </div>
                                    {req.id_document_url && (
                                        <div className={styles.document}>
                                            <a href={req.id_document_url} target="_blank" rel="noopener noreferrer" className={styles.viewDocBtn}>
                                                <ExternalLink size={16} />
                                                View Document
                                            </a>
                                        </div>
                                    )}
                                    <div className={styles.actions}>
                                        <form action={async () => { await approveKYCAction(req.id); }}>
                                            <button className={`${styles.btn} ${styles.approve}`}>
                                                <CheckCircle size={16} />
                                                Approve
                                            </button>
                                        </form>
                                        <form action={async () => { await rejectKYCAction(req.id); }}>
                                            <button className={`${styles.btn} ${styles.reject}`}>
                                                <XCircle size={16} />
                                                Reject
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Users Section */}
            {activeTab === 'users' && (
                <div className={styles.section}>
                    <h2 className={styles.sectionTitle}>
                        <Users size={20} />
                        User Management
                    </h2>
                    <div className={styles.list}>
                        {users.map((user: any) => {
                            const initials = user.name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';
                            return (
                                <div key={user.id} className={styles.card}>
                                    <div className={styles.cardHeader}>
                                        <div className={styles.userCard}>
                                            <div className={styles.userAvatar}>{initials}</div>
                                            <div className={styles.cardInfo}>
                                                <h3 className={styles.name}>{user.name}</h3>
                                                <div className={styles.email}>
                                                    {user.email}
                                                    <span className={`${styles.roleBadge} ${user.role === 'Admin' ? styles.roleAdmin : styles.roleUser}`} style={{ marginLeft: '8px' }}>
                                                        {user.role}
                                                    </span>
                                                    {user.isBanned && <span className={styles.bannedBadge} style={{ marginLeft: '8px' }}>Banned</span>}
                                                </div>
                                            </div>
                                        </div>
                                        <span className={styles.date}>Joined: {user.joined}</span>
                                    </div>
                                    <div className={styles.actions}>
                                        <form action={async () => { await toggleUserBanAction(user.id, !user.isBanned) }}>
                                            <button className={`${styles.btn} ${user.isBanned ? styles.approve : styles.reject}`}>
                                                {user.isBanned ? <UserCheck size={16} /> : <Ban size={16} />}
                                                {user.isBanned ? 'Unban User' : 'Ban User'}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
