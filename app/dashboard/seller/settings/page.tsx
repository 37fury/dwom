import { db } from '@/app/lib/db';
import Link from 'next/link';
import {
    ArrowLeft,
    Settings,
    Store,
    CreditCard,
    Bell,
    Shield,
    Globe,
    Palette,
    ChevronRight,
    User,
    Wallet,
    FileText
} from 'lucide-react';
import styles from './settings.module.css';

export default async function SellerSettingsPage() {
    const user = await db.getUser();
    if (!user) return <div>Unauthorized</div>;

    const settingsSections = [
        {
            title: 'Store',
            items: [
                {
                    icon: Store,
                    label: 'Store Profile',
                    description: 'Business name, logo, and description',
                    href: '/dashboard/seller/settings/store',
                    color: '#3b82f6'
                },
                {
                    icon: Globe,
                    label: 'Custom Domain',
                    description: 'Connect your own domain',
                    href: '/dashboard/seller/settings/domain',
                    color: '#8b5cf6',
                    badge: 'Pro'
                },
                {
                    icon: Palette,
                    label: 'Branding',
                    description: 'Colors, fonts, and styling',
                    href: '/dashboard/seller/settings/branding',
                    color: '#ec4899',
                    badge: 'Pro'
                }
            ]
        },
        {
            title: 'Payments',
            items: [
                {
                    icon: Wallet,
                    label: 'Payout Methods',
                    description: 'Mobile money, bank accounts',
                    href: '/dashboard/seller/settings/payouts',
                    color: '#22c55e'
                },
                {
                    icon: CreditCard,
                    label: 'Payment Settings',
                    description: 'Currencies and pricing',
                    href: '/dashboard/seller/settings/payments',
                    color: '#f97316'
                },
                {
                    icon: FileText,
                    label: 'Tax & Invoices',
                    description: 'Tax settings and invoice templates',
                    href: '/dashboard/seller/settings/tax',
                    color: '#64748b',
                    badge: 'Pro'
                }
            ]
        },
        {
            title: 'Notifications',
            items: [
                {
                    icon: Bell,
                    label: 'Email Notifications',
                    description: 'Sales, reviews, and updates',
                    href: '/dashboard/seller/settings/notifications',
                    color: '#eab308'
                }
            ]
        },
        {
            title: 'Security',
            items: [
                {
                    icon: User,
                    label: 'Account Settings',
                    description: 'Profile, email, and personal details',
                    href: '/dashboard/seller/settings/account',
                    color: '#6366f1'
                },
                {
                    icon: Shield,
                    label: 'Verification (KYC)',
                    description: 'Verify identity for withdrawals',
                    href: '/dashboard/seller/settings/kyc',
                    color: '#22c55e'
                },
                {
                    icon: Shield,
                    label: 'Security & Privacy',
                    description: 'Password, 2FA, and data',
                    href: '/dashboard/seller/settings/security',
                    color: '#14b8a6'
                }
            ]
        }
    ];

    return (
        <div className={styles.container}>
            {/* Back Link */}
            <Link href="/dashboard/seller" className={styles.backLink}>
                <ArrowLeft size={16} />
                Back to Dashboard
            </Link>

            {/* Header */}
            <header className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        <Settings size={28} />
                        Seller Settings
                    </h1>
                    <p className={styles.subtitle}>Manage your store, payments, and preferences.</p>
                </div>
            </header>

            {/* Settings Sections */}
            <div className={styles.sections}>
                {settingsSections.map((section) => (
                    <div key={section.title} className={styles.section}>
                        <h3 className={styles.sectionTitle}>{section.title}</h3>
                        <div className={styles.settingsGrid}>
                            {section.items.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={styles.settingCard}
                                >
                                    <div
                                        className={styles.settingIcon}
                                        style={{ background: `${item.color}15`, color: item.color }}
                                    >
                                        <item.icon size={22} />
                                    </div>
                                    <div className={styles.settingInfo}>
                                        <div className={styles.settingLabel}>
                                            {item.label}
                                            {item.badge && (
                                                <span className={styles.proBadge}>{item.badge}</span>
                                            )}
                                        </div>
                                        <div className={styles.settingDesc}>{item.description}</div>
                                    </div>
                                    <ChevronRight size={18} className={styles.chevron} />
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Stats */}
            <div className={styles.infoCard}>
                <div className={styles.infoHeader}>
                    <Store size={20} />
                    <span>Store Status</span>
                </div>
                <div className={styles.infoContent}>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Account Type</span>
                        <span className={styles.infoValue}>
                            <span className={styles.badge}>Free</span>
                        </span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Seller Since</span>
                        <span className={styles.infoValue}>January 2026</span>
                    </div>
                    <div className={styles.infoItem}>
                        <span className={styles.infoLabel}>Verification</span>
                        <span className={`${styles.infoValue} ${styles.pending}`}>Pending</span>
                    </div>
                </div>
                <Link href="/dashboard/seller/settings/upgrade" className={styles.upgradeBtn}>
                    Upgrade to Pro
                </Link>
            </div>
        </div>
    );
}
