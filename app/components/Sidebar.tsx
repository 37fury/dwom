'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { signout } from '@/app/login/actions';
import styles from './Sidebar.module.css';
import { useTheme } from '@/app/components/ThemeProvider';
import {
    Shield,
    Menu,
    X,
    LayoutDashboard,
    Wallet,
    CreditCard,
    Link2,
    Users,
    MessageCircle,
    BarChart3,
    Store,
    Settings,
    LogOut,
    ChevronRight
} from 'lucide-react';

export default function Sidebar() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Scroll visibility logic
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show if at top or scrolling up
            if (currentScrollY < 10 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > 20 && currentScrollY > lastScrollY && !isMobileOpen) {
                // Hide if scrolling down (past threshold) and menu is closed
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMobileOpen]);

    const mainLinks = [
        { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
        { href: '/dashboard/wallet', label: 'Wallet', icon: Wallet, badge: 'GH₵' },
        { href: '/dashboard/memberships', label: 'Memberships', icon: CreditCard },
        { href: '/dashboard/integrations', label: 'Integrations', icon: Link2 },
        { href: '/dashboard/affiliates', label: 'Affiliates', icon: Users },
        { href: '/dashboard/messages', label: 'Messages', icon: MessageCircle },
        { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3 },
    ];

    return (
        <>
            {/* Mobile Toggle Button */}
            <button
                className={`${styles.mobileToggle} ${isMobileOpen ? styles.toggleOpen : ''} ${!isVisible && !isMobileOpen ? styles.scrollHidden : ''}`}
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop */}
            {isMobileOpen && (
                <div
                    className={styles.backdrop}
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <aside className={`${styles.sidebar} ${isMobileOpen ? styles.open : ''}`}>
                {/* Logo */}
                <Link href="/" className={styles.logoLink} onClick={() => setIsMobileOpen(false)}>
                    <div className={styles.logoContainer}>
                        <span className={styles.logoText}>dwom</span>
                        <span className={styles.tagline}>#1 digital marketplace in Africa</span>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    {/* Main Section */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Main</h4>
                        {mainLinks.map((link) => {
                            const isActive = pathname === link.href ||
                                (link.href !== '/dashboard' && pathname.startsWith(link.href));
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                                >
                                    <link.icon size={18} className={styles.navIcon} />
                                    <span className={styles.navLabel}>{link.label}</span>
                                    {link.badge && (
                                        <span className={styles.navBadge}>{link.badge}</span>
                                    )}
                                    {isActive && <div className={styles.activeIndicator} />}
                                </Link>
                            );
                        })}

                        {/* Admin Link */}
                        <Link
                            href="/dashboard/admin"
                            onClick={() => setIsMobileOpen(false)}
                            className={`${styles.navLink} ${pathname === '/dashboard/admin' ? styles.active : ''}`}
                        >
                            <Shield size={18} className={styles.navIcon} />
                            <span className={styles.navLabel}>Admin</span>
                            {pathname === '/dashboard/admin' && <div className={styles.activeIndicator} />}
                        </Link>
                    </div>

                    {/* Selling Section */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Selling</h4>
                        <Link
                            href="/dashboard/seller"
                            onClick={() => setIsMobileOpen(false)}
                            className={`${styles.navLink} ${styles.sellerLink}`}
                        >
                            <Store size={18} className={styles.navIcon} />
                            <span className={styles.navLabel}>Switch to Seller</span>
                            <ChevronRight size={16} className={styles.chevron} />
                        </Link>
                    </div>

                    {/* Account Section */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Account</h4>
                        <Link
                            href="/dashboard/settings"
                            onClick={() => setIsMobileOpen(false)}
                            className={`${styles.navLink} ${pathname.startsWith('/dashboard/settings') ? styles.active : ''}`}
                        >
                            <Settings size={18} className={styles.navIcon} />
                            <span className={styles.navLabel}>Settings</span>
                            {pathname.startsWith('/dashboard/settings') && <div className={styles.activeIndicator} />}
                        </Link>
                        <form action={signout}>
                            <button type="submit" className={`${styles.navLink} ${styles.signOutBtn}`}>
                                <LogOut size={18} className={styles.navIcon} />
                                <span className={styles.navLabel}>Sign Out</span>
                            </button>
                        </form>
                    </div>
                </nav>

                {/* Footer */}
                <div className={styles.sidebarFooter}>
                    <Link
                        href="/dashboard/pro"
                        onClick={() => setIsMobileOpen(false)}
                        className={styles.footerCard}
                    >
                        <div className={styles.footerIcon}>🚀</div>
                        <div className={styles.footerContent}>
                            <span className={styles.footerTitle}>Go Pro</span>
                            <span className={styles.footerText}>Unlock all features</span>
                        </div>
                    </Link>
                </div>
            </aside>
        </>
    );
}
