'use client';

import { useState, useEffect } from 'react';
import { X, Gift, ArrowRight } from 'lucide-react';
import styles from './ExitIntent.module.css';

export default function ExitIntent() {
    const [isVisible, setIsVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        // Check if already shown this session
        const alreadyShown = sessionStorage.getItem('exitIntentShown');
        if (alreadyShown) return;

        const handleMouseLeave = (e: MouseEvent) => {
            // Only trigger when mouse leaves through top of viewport
            if (e.clientY <= 0 && !hasTriggered) {
                setIsVisible(true);
                setHasTriggered(true);
                sessionStorage.setItem('exitIntentShown', 'true');
            }
        };

        // Also trigger after 30 seconds of inactivity (fallback for mobile)
        let inactivityTimer: NodeJS.Timeout;
        const resetTimer = () => {
            clearTimeout(inactivityTimer);
            inactivityTimer = setTimeout(() => {
                if (!hasTriggered) {
                    setIsVisible(true);
                    setHasTriggered(true);
                    sessionStorage.setItem('exitIntentShown', 'true');
                }
            }, 30000);
        };

        document.addEventListener('mouseleave', handleMouseLeave);
        document.addEventListener('mousemove', resetTimer);
        resetTimer();

        return () => {
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('mousemove', resetTimer);
            clearTimeout(inactivityTimer);
        };
    }, [hasTriggered]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you'd send email to backend/email service
        console.log('Exit intent email:', email);
        alert('🎉 Check your email for your 10% discount code!');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={styles.overlay} onClick={() => setIsVisible(false)}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={() => setIsVisible(false)}>
                    <X size={20} />
                </button>

                <div className={styles.iconWrapper}>
                    <Gift size={40} />
                </div>

                <h2 className={styles.title}>Wait! Before you go...</h2>
                <p className={styles.subtitle}>
                    Get <span className={styles.highlight}>10% OFF</span> your first purchase!
                </p>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className={styles.input}
                    />
                    <button type="submit" className={styles.submitBtn}>
                        Get My Discount <ArrowRight size={18} />
                    </button>
                </form>

                <p className={styles.disclaimer}>
                    No spam, ever. Unsubscribe anytime.
                </p>

                <button className={styles.noThanks} onClick={() => setIsVisible(false)}>
                    No thanks, I'll pay full price
                </button>
            </div>
        </div>
    );
}
