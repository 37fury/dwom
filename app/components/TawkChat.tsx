'use client';

import { useEffect } from 'react';

// Tawk.to Live Chat Widget
// Replace TAWK_PROPERTY_ID and TAWK_WIDGET_ID with your actual IDs from tawk.to dashboard
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID || 'YOUR_PROPERTY_ID';
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID || 'YOUR_WIDGET_ID';

declare global {
    interface Window {
        Tawk_API?: any;
        Tawk_LoadStart?: Date;
    }
}

export default function TawkChat() {
    useEffect(() => {
        // Skip if IDs not configured
        if (TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID') {
            console.log('Tawk.to: Configure NEXT_PUBLIC_TAWK_PROPERTY_ID and NEXT_PUBLIC_TAWK_WIDGET_ID');
            return;
        }

        // Initialize Tawk.to
        window.Tawk_API = window.Tawk_API || {};
        window.Tawk_LoadStart = new Date();

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`;
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');

        document.head.appendChild(script);

        return () => {
            // Cleanup on unmount
            const tawkScript = document.querySelector(`script[src*="embed.tawk.to"]`);
            if (tawkScript) {
                tawkScript.remove();
            }
        };
    }, []);

    return null; // This component doesn't render anything
}
