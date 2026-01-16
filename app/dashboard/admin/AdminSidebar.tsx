'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Shield,
    LayoutDashboard,
    Users,
    Package,
    CreditCard,
    Settings,
    FileCheck,
    LogOut,
    ChevronRight,
    Menu,
    X,
    BarChart3
} from 'lucide-react';
import { useState } from 'react';
import { signout } from '@/app/login/actions';
import styles from './AdminSidebar.module.css';

const navItems = [
    { icon: LayoutDashboard, label: 'Overview', href: '/dashboard/admin' },
    { icon: FileCheck, label: 'KYC Review', href: '/dashboard/admin/kyc' },
    { icon: Users, label: 'Users', href: '/dashboard/admin/users' },
    { icon: Package, label: 'Products', href: '/dashboard/admin/products' },
    { icon: CreditCard, label: 'Payouts', href: '/dashboard/admin/payouts' },
    { icon: BarChart3, label: 'Analytics', href: '/dashboard/admin/analytics' },
    { icon: Settings, label: 'Settings', href: '/dashboard/admin/settings' },
];

interface AdminSidebarProps {
    userEmail: string;
}

export default function AdminSidebar({ userEmail }: AdminSidebarProps) {
    const pathname = usePathname();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile Header */}
            <div className={styles.mobileHeader}>
                <div className={styles.mobileLogo}>
                    <Shield size={20} />
                    <span>Admin</span>
                </div>
                <button
                    className={styles.menuBtn}
                    onClick={() => setIsMobileOpen(!isMobileOpen)}
                >
                    {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Overlay */}
            {isMobileOpen && (
                <div
                    className={styles.overlay}
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ''}`}>
                {/* Logo */}
                <div className={styles.logoSection}>
                    <div className={styles.logo}>
                        <Shield size={24} />
                        <span>dwom Admin</span>
                    </div>
                    <div className={styles.adminBadge}>
                        <span>Administrator</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={styles.nav}>
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href ||
                            (item.href !== '/dashboard/admin' && pathname.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileOpen(false)}
                                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                            >
                                <Icon size={20} className={styles.navIcon} />
                                <span>{item.label}</span>
                                {isActive && <div className={styles.activeIndicator} />}
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                            <Shield size={18} />
                        </div>
                        <div className={styles.userDetails}>
                            <span className={styles.userName}>Admin</span>
                            <span className={styles.userEmail}>{userEmail}</span>
                        </div>
                    </div>

                    <Link href="/dashboard" className={styles.switchLink}>
                        <ChevronRight size={16} />
                        Exit Admin
                    </Link>

                    <form action={signout}>
                        <button type="submit" className={styles.signOutBtn}>
                            <LogOut size={18} />
                            Sign Out
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
}
