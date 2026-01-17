'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { signout } from '@/app/login/actions';
import styles from './SellerSidebar.module.css';
import {
    Menu,
    X,
    Megaphone,
    MessageCircle,
    LayoutDashboard,
    Package,
    Wallet,
    ShoppingBag,
    ChevronRight,
    Settings,
    LogOut
} from 'lucide-react';

export default function SellerSidebar() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10 || currentScrollY < lastScrollY) {
                setIsVisible(true);
            } else if (currentScrollY > 20 && currentScrollY > lastScrollY && !isMobileOpen) {
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMobileOpen]);

    const businessLinks = [
        { href: '/dashboard/seller', label: 'Overview', icon: LayoutDashboard, exact: true },
        { href: '/dashboard/seller/products', label: 'Products', icon: Package },
        { href: '/dashboard/seller/payouts', label: 'Payouts', icon: Wallet },
        { href: '/dashboard/seller/promotions', label: 'Promotions', icon: Megaphone },
        { href: '/dashboard/seller/messages', label: 'Messages', icon: MessageCircle },
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
                        <span className={styles.sellerBadge}>seller</span>
                    </div>
                </Link>

                <nav className={styles.nav}>
                    {/* Business Section */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Business</h4>
                        {businessLinks.map((link) => {
                            const isActive = link.exact
                                ? pathname === link.href
                                : pathname.startsWith(link.href);
                            const isPro = 'isPro' in link && link.isPro;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`${styles.navLink} ${isActive ? styles.active : ''} ${isPro ? styles.proLink : ''}`}
                                >
                                    <link.icon size={18} className={styles.navIcon} />
                                    <span className={styles.navLabel}>{link.label}</span>
                                    {isPro && <span className={styles.proBadge}>✨</span>}
                                    {isActive && <div className={styles.activeIndicator} />}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Account Section */}
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Account</h4>
                        <Link
                            href="/dashboard/seller/settings"
                            onClick={() => setIsMobileOpen(false)}
                            className={`${styles.navLink} ${pathname.startsWith('/dashboard/seller/settings') ? styles.active : ''}`}
                        >
                            <Settings size={18} className={styles.navIcon} />
                            <span className={styles.navLabel}>Settings</span>
                            {pathname.startsWith('/dashboard/seller/settings') && <div className={styles.activeIndicator} />}
                        </Link>
                        <Link
                            href="/dashboard"
                            onClick={() => setIsMobileOpen(false)}
                            className={`${styles.navLink} ${styles.switchLink}`}
                        >
                            <ShoppingBag size={18} className={styles.navIcon} />
                            <span className={styles.navLabel}>Switch to Buying</span>
                            <ChevronRight size={16} className={styles.chevron} />
                        </Link>
                        <form action={signout}>
                            <button type="submit" className={`${styles.navLink} ${styles.signOutBtn}`}>
                                <LogOut size={18} className={styles.navIcon} />
                                <span className={styles.navLabel}>Sign Out</span>
                            </button>
                        </form>
                    </div>
                </nav>

                {/* Footer Stats */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.footerStats}>
                        <div className={styles.footerStat}>
                            <span className={styles.footerStatValue}>GH₵0</span>
                            <span className={styles.footerStatLabel}>This Month</span>
                        </div>
                        <div className={styles.footerDivider}></div>
                        <div className={styles.footerStat}>
                            <span className={styles.footerStatValue}>0</span>
                            <span className={styles.footerStatLabel}>Products</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
