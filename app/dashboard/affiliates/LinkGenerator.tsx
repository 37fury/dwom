'use client';

import { useState } from 'react';
import styles from './affiliates.module.css';

export default function LinkGenerator() {
    const [copied, setCopied] = useState(false);
    const referralLink = 'dwom.com/ref/deezy';

    const copyLink = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.card}>
            <h3 className={styles.cardTitle}>Your Referral Link</h3>
            <div className={styles.linkBox}>
                <input type="text" value={referralLink} readOnly className={styles.linkInput} />
                <button className={styles.btnCopy} onClick={copyLink}>
                    {copied ? 'Copied!' : 'Copy Link'}
                </button>
            </div>
        </div>
    );
}
