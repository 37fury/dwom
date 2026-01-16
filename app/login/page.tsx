import { Shield, Zap, Lock } from 'lucide-react'
import styles from './login.module.css'
import LoginForm from './LoginForm'

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

                    <LoginForm
                        redirectTo={redirectTo}
                        message={searchParams.message}
                    />

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

