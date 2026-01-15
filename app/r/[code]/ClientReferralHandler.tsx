'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ClientReferralHandler({ code }: { code: string }) {
    const router = useRouter();

    useEffect(() => {
        if (code) {
            // Set cookie for 30 days
            const d = new Date();
            d.setTime(d.getTime() + (30 * 24 * 60 * 60 * 1000));
            document.cookie = `dwom_ref=${code};expires=${d.toUTCString()};path=/`;
        }
        // Redirect to home
        router.replace('/');
    }, [code, router]);

    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'white' }}>
            <p style={{ color: '#64748b' }}>Applying referral code...</p>
        </div>
    );
}
