'use client';

import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import styles from './PWAInstallPrompt.module.css';

interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const [isIOS, setIsIOS] = useState(false);
    const [showIOSInstructions, setShowIOSInstructions] = useState(false);

    useEffect(() => {
        // Check if already installed
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        // Check if dismissed recently
        const dismissed = localStorage.getItem('pwa-prompt-dismissed');
        if (dismissed) {
            const dismissedTime = parseInt(dismissed);
            const daysSinceDismissed = (Date.now() - dismissedTime) / (1000 * 60 * 60 * 24);
            if (daysSinceDismissed < 7) return; // Don't show for 7 days after dismissal
        }

        // Detect iOS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOSDevice = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);
        setIsIOS(isIOSDevice);

        // For iOS, show prompt after a delay
        if (isIOSDevice && !(navigator as any).standalone) {
            setTimeout(() => setShowPrompt(true), 5000);
        }

        // For Android/Chrome, listen for beforeinstallprompt
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e as BeforeInstallPromptEvent);
            setTimeout(() => setShowPrompt(true), 3000);
        };

        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    const handleInstall = async () => {
        if (isIOS) {
            setShowIOSInstructions(true);
            return;
        }

        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setShowPrompt(false);
        }
        setDeferredPrompt(null);
    };

    const handleDismiss = () => {
        setShowPrompt(false);
        setShowIOSInstructions(false);
        localStorage.setItem('pwa-prompt-dismissed', Date.now().toString());
    };

    if (!showPrompt) return null;

    return (
        <>
            <div className={styles.overlay} onClick={handleDismiss} />
            <div className={styles.prompt}>
                <button className={styles.closeBtn} onClick={handleDismiss}>
                    <X size={20} />
                </button>

                {showIOSInstructions ? (
                    <div className={styles.iosInstructions}>
                        <div className={styles.iconWrapper}>
                            <Smartphone size={32} />
                        </div>
                        <h3>Install dwom on iOS</h3>
                        <ol className={styles.steps}>
                            <li>Tap the <strong>Share</strong> button <span className={styles.shareIcon}>↑</span></li>
                            <li>Scroll down and tap <strong>"Add to Home Screen"</strong></li>
                            <li>Tap <strong>"Add"</strong> to install</li>
                        </ol>
                        <button className={styles.gotItBtn} onClick={handleDismiss}>
                            Got it!
                        </button>
                    </div>
                ) : (
                    <>
                        <div className={styles.iconWrapper}>
                            <span className={styles.logoText}>dwom</span>
                        </div>
                        <div className={styles.content}>
                            <h3>Install dwom</h3>
                            <p>#1 Digital Marketplace in Africa. Add to your home screen for quick access.</p>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.installBtn} onClick={handleInstall}>
                                <Download size={18} />
                                Install App
                            </button>
                            <button className={styles.laterBtn} onClick={handleDismiss}>
                                Maybe Later
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}
