'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ user }: { user?: any }) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Close menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isMenuOpen]);

    // Scroll visibility logic - hide on scroll down, show on scroll up
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < 10 || currentScrollY < lastScrollY) {
                // Show if at top or scrolling up
                setIsVisible(true);
            } else if (currentScrollY > 100 && currentScrollY > lastScrollY && !isMenuOpen) {
                // Hide if scrolling down past threshold and menu is closed
                setIsVisible(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isMenuOpen]);

    return (
        <nav className={`${styles.navbar} ${!isVisible ? styles.navbarHidden : ''}`}>
            <div className={`container ${styles.navContainer}`}>
                <div className={styles.left}>
                    <Link href="/" className={styles.logo} style={{ textDecoration: 'none' }}>
                        <div className={styles.logoContainer}>
                            <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#f97316', fontFamily: 'var(--font-heading)', letterSpacing: '-1px', lineHeight: '1' }}>dwom</span>
                            <span className={styles.tagline}>#1 digital marketplace in Africa</span>
                        </div>
                    </Link>

                    {/* Desktop Links */}
                    <div className={styles.links}>
                        <Link href="/#marketplace" className={pathname === '/' ? styles.active : ''}>Discover</Link>
                        <Link href="/sell" className={pathname === '/sell' ? styles.active : ''}>Sell</Link>
                        <Link href="/sell">Pricing</Link>
                    </div>
                </div>

                <div className={styles.rightActions}>
                    {/* Theme Toggle */}
                    <div className={styles.themeToggle}>
                        <ThemeToggle />
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className={styles.authButtons}>
                        {user ? (
                            <Link href="/dashboard" className={styles.loginBtn}>Dashboard</Link>
                        ) : (
                            <>
                                <Link href="/login" className={styles.loginBtn}>Login</Link>
                                <Link href="/login" className={styles.loginBtn} style={{ marginLeft: '10px', background: 'transparent', border: '1px solid currentColor', color: 'inherit' }}>Sign Up</Link>
                            </>
                        )}
                    </div>

                    {/* Hamburger Toggle */}
                    <button
                        className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}>
                <div className={styles.mobileLinks}>
                    <Link href="/#marketplace" className={pathname === '/' ? styles.mobileActive : ''} onClick={() => setIsMenuOpen(false)}>Discover</Link>
                    <Link href="/sell" className={pathname === '/sell' ? styles.mobileActive : ''} onClick={() => setIsMenuOpen(false)}>Sell</Link>
                    <Link href="/sell" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
                    <hr className={styles.divider} />
                    {user ? (
                        <Link href="/dashboard" className={styles.mobileAuthBtn}>Dashboard</Link>
                    ) : (
                        <div className={styles.mobileAuthGroup}>
                            <Link href="/login" className={styles.mobileAuthBtn}>Login</Link>
                            <Link href="/login" className={`${styles.mobileAuthBtn} ${styles.mobileSignup}`}>Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
