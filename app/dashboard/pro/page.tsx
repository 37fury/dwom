'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ArrowLeft,
    Crown,
    Check,
    Zap,
    Clock,
    Percent,
    Coins,
    Shield,
    Users,
    Star,
    MessageCircle,
    TrendingUp
} from 'lucide-react';
import styles from './pro.module.css';
import { initProSubscription } from './actions';

const buyerBenefits = [
    { icon: Percent, title: '5% Off All Purchases', description: 'Save on every order you make' },
    { icon: Coins, title: '2% Cashback', description: 'Earn cashback to your wallet' },
    { icon: Clock, title: 'Early Access', description: '24-48 hours before public release' },
    { icon: Crown, title: 'Pro Badge', description: 'Stand out with a golden badge' },
    { icon: MessageCircle, title: 'Priority Support', description: 'Skip the queue, get help fast' },
    { icon: Star, title: 'Exclusive Content', description: 'Access Pro-only products' },
    { icon: Users, title: 'Pro Community', description: 'Join our exclusive member group' },
];

const sellerBenefits = [
    { icon: Percent, title: 'Reduced Platform Fee', description: '8% fee instead of 10%' },
    { icon: Crown, title: 'Pro Seller Badge', description: 'Build trust with buyers' },
    { icon: TrendingUp, title: 'Priority Listing', description: 'Get featured in search results' },
    { icon: Zap, title: 'Analytics Pro', description: 'Advanced sales insights' },
    { icon: MessageCircle, title: 'Dedicated Support', description: 'Priority seller support' },
];

export default function ProPage() {
    const router = useRouter();
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
    const [processing, setProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const pricing = {
        monthly: 29,
        annual: 249,
    };

    const handleSubscribe = async () => {
        setProcessing(true);
        setError(null);

        const result = await initProSubscription(billingCycle);

        if (result.success && result.authorizationUrl) {
            // Redirect to Paystack payment page
            window.location.href = result.authorizationUrl;
        } else {
            setError(result.error || 'Payment initialization failed');
            setProcessing(false);
        }
    };

    return (
        <div className={styles.container}>
            <button onClick={() => router.back()} className={styles.backLink}>
                <ArrowLeft size={16} />
                Go Back
            </button>

            {/* Hero Section */}
            <div className={styles.hero}>
                <div className={styles.heroIcon}>
                    <Crown size={40} />
                </div>
                <h1 className={styles.title}>Upgrade to dwom Pro</h1>
                <p className={styles.subtitle}>
                    Get exclusive benefits, save money on every purchase, and unlock the full power of dwom.
                </p>
            </div>

            {/* Pricing Toggle */}
            <div className={styles.pricingToggle}>
                <button
                    className={`${styles.toggleBtn} ${billingCycle === 'monthly' ? styles.active : ''}`}
                    onClick={() => setBillingCycle('monthly')}
                >
                    Monthly
                </button>
                <button
                    className={`${styles.toggleBtn} ${billingCycle === 'annual' ? styles.active : ''}`}
                    onClick={() => setBillingCycle('annual')}
                >
                    Annual
                    <span className={styles.saveBadge}>Save 28%</span>
                </button>
            </div>

            {/* Price Card */}
            <div className={styles.priceCard}>
                <div className={styles.priceHeader}>
                    <span className={styles.priceCurrency}>GH₵</span>
                    <span className={styles.priceAmount}>{pricing[billingCycle]}</span>
                    <span className={styles.pricePeriod}>/{billingCycle === 'monthly' ? 'month' : 'year'}</span>
                </div>
                {billingCycle === 'annual' && (
                    <p className={styles.priceNote}>That's just GH₵20.75/month</p>
                )}
                <button
                    className={styles.subscribeBtn}
                    onClick={handleSubscribe}
                    disabled={processing}
                >
                    {processing ? 'Redirecting to payment...' : 'Subscribe Now'}
                </button>
                {error && (
                    <p className={styles.errorText}>{error}</p>
                )}
            </div>

            {/* Benefits Sections */}
            <div className={styles.benefitsSection}>
                <h2 className={styles.sectionTitle}>
                    <Shield size={24} />
                    Buyer Benefits
                </h2>
                <div className={styles.benefitsGrid}>
                    {buyerBenefits.map((benefit, idx) => (
                        <div key={idx} className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>
                                <benefit.icon size={22} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                            <Check size={18} className={styles.checkIcon} />
                        </div>
                    ))}
                </div>
            </div>

            <div className={styles.benefitsSection}>
                <h2 className={styles.sectionTitle}>
                    <TrendingUp size={24} />
                    Seller Benefits
                </h2>
                <div className={styles.benefitsGrid}>
                    {sellerBenefits.map((benefit, idx) => (
                        <div key={idx} className={styles.benefitCard}>
                            <div className={styles.benefitIcon}>
                                <benefit.icon size={22} />
                            </div>
                            <div className={styles.benefitContent}>
                                <h3>{benefit.title}</h3>
                                <p>{benefit.description}</p>
                            </div>
                            <Check size={18} className={styles.checkIcon} />
                        </div>
                    ))}
                </div>
            </div>

            {/* FAQ */}
            <div className={styles.faqSection}>
                <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                <div className={styles.faqList}>
                    <div className={styles.faqItem}>
                        <h4>Can I cancel anytime?</h4>
                        <p>Yes! You can cancel your Pro subscription at any time. You'll continue to have access until your billing period ends.</p>
                    </div>
                    <div className={styles.faqItem}>
                        <h4>How does the discount work?</h4>
                        <p>Your 5% discount is automatically applied at checkout on all purchases while you're a Pro member.</p>
                    </div>
                    <div className={styles.faqItem}>
                        <h4>What payment methods do you accept?</h4>
                        <p>We accept MTN MoMo, Vodafone Cash, and bank transfers.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
