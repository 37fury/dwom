import Link from 'next/link';
import { redirect } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import styles from './sell.module.css';

import { createClient } from '@/utils/supabase/server';

export default async function SellPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        redirect('/dashboard/seller');
    }

    return (
        <main className={styles.darkTheme}>
            <Navbar user={user} />

            {/* Hero Section */}
            <section className={styles.hero}>
                <div className="container">
                    <div className={styles.heroContent}>
                        <h1 className={styles.title}>
                            Powering the next generation of <br />
                            <span className={styles.gradientText}>African entrepreneurs.</span>
                        </h1>
                        <p className={styles.subtitle}>
                            dwom provides the tools you need to sell access to your community, software, or content.
                            Get paid in Cedis, Naira, or Crypto.
                        </p>
                        <div className={styles.actions}>
                            <Link href="/login" className={styles.btnPrimary}>Start Selling for Free</Link>
                            <Link href="#" className={styles.btnSecondary}>View Pricing</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className={styles.features}>
                <div className="container">
                    <h2 className={styles.sectionTitle}>Everything you need to scale</h2>
                    <div className={styles.grid}>
                        <div className={styles.card}>
                            <h3>Mobile Money Payouts</h3>
                            <p>Receive funds directly to your MTN Momo, Vodafone Cash, or Bank account.</p>
                        </div>
                        <div className={styles.card}>
                            <h3>Community Access</h3>
                            <p>Automate invites to your Telegram group or Discord server instantly.</p>
                        </div>
                        <div className={styles.card}>
                            <h3>Crypto Friendly</h3>
                            <p>Accept USDT and BTC payments alongside local currencies.</p>
                        </div>
                        <div className={styles.card}>
                            <h3>Host Courses</h3>
                            <p>Upload video content and sell access to your masterclass.</p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
