import { login, signup } from './actions'
import styles from './login.module.css'
import { Shield, Zap, Lock } from 'lucide-react'

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function LoginPage(props: {
    searchParams: Promise<{ message?: string; redirect?: string }>
}) {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const searchParams = await props.searchParams;
    const redirectTo = searchParams.redirect;

    if (user) {
        redirect(redirectTo || '/dashboard');
    }

    return (
        <div className={styles.container}>
            {/* Left Side - Image (Desktop only) */}
            <div className={styles.imageSection}>
                <img
                    src="/login_hero.png"
                    alt="Dwom - Courses, Communities, Software & Payments"
                    className={styles.heroImage}
                />
                {/* Overlay content */}
                <div className={styles.imageOverlay}>
                    <h3 className={styles.overlayTitle}>Sell Your Digital Products</h3>
                    <p className={styles.overlayText}>Courses • Communities • Software</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className={styles.formSection}>
                {/* Mobile Hero Banner */}
                <div className={styles.mobileHero}>
                    <img
                        src="/login_hero.png"
                        alt="Dwom Platform"
                        className={styles.mobileHeroImage}
                    />
                    <div className={styles.mobileHeroOverlay}>
                        <span className={styles.mobileHeroText}>Courses • Communities • Software</span>
                    </div>
                </div>

                <div className={styles.formCard}>
                    <div className={styles.logoContainer}>
                        <span style={{ fontSize: '36px', fontWeight: 'bold', color: '#f97316', fontFamily: 'var(--font-heading)', letterSpacing: '-1px' }}>dwom</span>
                        <span style={{ fontSize: '13px', color: '#64748b' }}>#1 African Digital Marketplace</span>
                    </div>
                    <h2 className={styles.title}>Welcome back</h2>
                    <p className={styles.subtitle}>Sign in to access your courses, communities, and purchases.</p>

                    {searchParams.message && (
                        <div className={styles.errorMessage}>
                            {searchParams.message}
                        </div>
                    )}

                    <form>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email" className={styles.label}>Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={styles.input}
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>Password</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className={styles.input}
                                placeholder="••••••••"
                            />
                        </div>
                        {redirectTo && (
                            <input type="hidden" name="redirect" value={redirectTo} />
                        )}
                        <div className={styles.buttonGroup}>
                            <button formAction={login} className={styles.buttonPrimary}>Log in</button>
                            <button formAction={signup} className={styles.buttonSecondary}>Create Account</button>
                        </div>
                        <a href="/forgot-password" style={{
                            display: 'block',
                            textAlign: 'center',
                            marginTop: '16px',
                            fontSize: '14px',
                            color: '#f97316',
                            textDecoration: 'none'
                        }}>
                            Forgot Password?
                        </a>
                    </form>

                    {/* Trust Indicators */}
                    <div className={styles.trustBadges}>
                        <div className={styles.trustItem}>
                            <Shield size={14} className={styles.trustIcon} />
                            <span>Secure</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Zap size={14} className={styles.trustIcon} />
                            <span>Instant Access</span>
                        </div>
                        <div className={styles.trustItem}>
                            <Lock size={14} className={styles.trustIcon} />
                            <span>Private</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
